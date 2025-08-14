import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';

function Home() {
  const navigate = useNavigate();
  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: 20 }}>
      <h1>Welcome to Who Died First</h1>
      <p>A game to help us remember celebrities who have passed away.</p>
      <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
        <button onClick={() => navigate('/setup?mode=single')}>Single Player</button>
        <button onClick={() => navigate('/setup?mode=teams')}>Teams</button>
      </div>
      <div style={{ marginTop: 16 }}>
        <label>
          Difficulty:
          <select defaultValue="easy" onChange={(e) => navigate(`/setup?mode=single&difficulty=${e.target.value}`)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
      </div>
      <div style={{ marginTop: 24 }}>
        <button onClick={() => navigate('/game')}>Start</button>
      </div>
      <div style={{ marginTop: 24 }}>
        <Link to="/admin">Admin</Link>
      </div>
    </div>
  );
}

function Setup() {
  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: 20 }}>
      <h2>Setup</h2>
      <p>Choose mode and difficulty, then start.</p>
      <Link to="/game">Start Game</Link>
    </div>
  );
}

function Game() {
  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: 20 }}>
      <h2>Game</h2>
      <p>Two celebrity photos will appear here with names; pick who died first.</p>
      <Link to="/results">Finish Round</Link>
    </div>
  );
}

function Results() {
  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: 20 }}>
      <h2>Results</h2>
      <Link to="/">Play Again</Link>
    </div>
  );
}

function Admin() {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: 20 }}>
      <h2>Admin</h2>
      <p>Login required to add celebrities. Next step: add form and Wikipedia scrape.</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/game" element={<Game />} />
        <Route path="/results" element={<Results />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
