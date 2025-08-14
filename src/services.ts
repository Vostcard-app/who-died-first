import { db } from './firebase';
import { collection, addDoc, serverTimestamp, Timestamp, doc, setDoc } from 'firebase/firestore';
import type { Celebrity, Difficulty } from './types';

export const addCelebrity = async (input: Omit<Celebrity, 'id' | 'createdAt' | 'updatedAt'>) => {
  const col = collection(db, 'celebrities');
  const payload = {
    ...input,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  const ref = await addDoc(col, payload as any);
  return ref.id;
};

export const scrapeWikipedia = async (url: string): Promise<Partial<Celebrity>> => {
  // Simple client-side scrape via fetch + regex/DOM. In production, use a Netlify function to avoid CORS.
  const res = await fetch(url, { mode: 'cors' });
  const html = await res.text();

  // Attempt very light parsing; this is intentionally minimal.
  const nameMatch = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
  const name = nameMatch ? nameMatch[1].replace(/<[^>]+>/g, '').trim() : undefined;

  // Find date of death patterns (e.g., Died ... YYYY)
  const diedSection = html.match(/>Died<[^]*?<td[^>]*>([^<]+)<\/td>/i) || html.match(/Death[^<]*<[^>]*>([^<]+)</i);
  let deathDate: string | undefined = undefined;
  if (diedSection && diedSection[1]) {
    const raw = diedSection[1].replace(/\s+/g, ' ').trim();
    // Try to extract ISO-like
    const iso = raw.match(/(\d{4}-\d{2}-\d{2})/);
    const yearFirst = raw.match(/(\d{1,2} \w+ \d{4})/);
    deathDate = iso?.[1] || (yearFirst ? new Date(yearFirst[1]).toISOString().slice(0, 10) : undefined);
  }

  // Fun fact: grab the first paragraph text
  const para = html.match(/<p>(.*?)<\/p>/i);
  const funFact = para ? para[1].replace(/<[^>]+>/g, '').replace(/\[.*?\]/g, '').trim() : undefined;

  // Image: try main infobox image
  const imgMatch = html.match(/infobox[^]*?<img[^>]*src="(.*?)"/i);
  const imageUrl = imgMatch ? (imgMatch[1].startsWith('http') ? imgMatch[1] : `https:${imgMatch[1]}`) : undefined;

  return { name, deathDate, funFact, imageUrl, sourceUrl: url };
};


