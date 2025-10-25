import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Home() {
 return <h2>דף הבית</h2>;
}

function Games() {
 const [games, setGames] = useState([]);

 useEffect(() => {
  fetch("http://localhost:8080/games")
   .then((res) => res.json())
   .then((data) => setGames(data))
   .catch((err) => console.error("שגיאה:", err));
 }, []);

 return (
  <div>
   <h2>דף המשחקים</h2>
   <ul>
    {games.map((game) => (
     <li key={game.id}>{game.title}</li>
    ))}
   </ul>
  </div>
 );
}

function App() {
 return (
  <Router>
   <nav>
    <Link to="/">בית</Link> | <Link to="/games">משחקים</Link>
   </nav>
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/games" element={<Games />} />
   </Routes>
  </Router>
 );
}

export default App;
