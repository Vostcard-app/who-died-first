export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Celebrity {
  id: string;
  name: string;
  imageUrl?: string;
  deathDate: string; // ISO string (YYYY-MM-DD preferred)
  funFact?: string;
  sourceUrl?: string;
  difficulty?: Difficulty;
  createdAt: string;
  updatedAt: string;
}


