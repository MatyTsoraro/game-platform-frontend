import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import "./App.css";

// Modal component
function UploadModal({ open, onClose }) {
 if (!open) return null;
 return (
  <div className="modal-overlay" onClick={onClose}>
   <div className="modal-box" onClick={(e) => e.stopPropagation()}>
    <h2>Upload Game</h2>
    <form>
     <label>
      Game Title:
      <input type="text" name="title" />
     </label>
     <label>
      Description:
      <textarea name="description" rows="3" />
     </label>
     <label>
      Game File / URL:
      <input type="text" name="url" />
     </label>
     <label>
      Image (optional):
      <input type="file" name="image" accept="image/*" />
     </label>
     <button type="submit" className="upload-btn" style={{ marginTop: 20 }}>
      <FaCloudUploadAlt
       style={{ marginRight: 9, fontSize: "1.1em", verticalAlign: "middle" }}
      />
      Upload
     </button>
    </form>
    <button className="close-btn" onClick={onClose}>
     Close
    </button>
   </div>
  </div>
 );
}

// HERO SECTION משודרג
function Home({ onUploadClick }) {
 return (
  <div className="hero-section">
   <h1 className="hero-title">
    <span className="hero-glow">Game Platform</span>
   </h1>
   <div className="hero-subtext">
    Your place to upload and play <span className="highlight">awesome</span>{" "}
    games! <br />
    <span className="hero-mission">
     Developers, <span className="highlight">upload</span> and share your games.
     <br />
     Players, <span className="highlight">discover</span> new indie hits every
     day!
    </span>
   </div>
   <button className="upload-btn" onClick={onUploadClick}>
    <FaCloudUploadAlt
     style={{ marginRight: 9, fontSize: "1.3em", verticalAlign: "middle" }}
    />
    Upload Game
   </button>
  </div>
 );
}

// גלריית קלפים לפי קטגוריות
function Games() {
 const [games, setGames] = useState([]);
 useEffect(() => {
  fetch("http://localhost:8080/games")
   .then((res) => res.json())
   .then((data) => setGames(data))
   .catch((err) => console.error("Error:", err));
 }, []);
 // ייצור קטגוריות ייחודיות
 const categories = Array.from(
  new Set(games.map((game) => game.category || "Other"))
 );
 return (
  <div className="games-container">
   <h2 className="games-title">Games Gallery</h2>
   {categories.map((category) => (
    <div key={category}>
     <h3 className="category-title">{category}</h3>
     <div className="games-grid">
      {games
       .filter((game) => (game.category || "Other") === category)
       .map((game) => (
        <div className="game-card" key={game.id}>
         <div className="game-img-demo">
          <span role="img" aria-label="game" className="emoji-demo">
           🎲
          </span>
         </div>
         <div className="game-details">
          <div className="game-title">{game.title}</div>
          {game.category && <div className="game-cat">{game.category}</div>}
         </div>
        </div>
       ))}
     </div>
    </div>
   ))}
  </div>
 );
}

function App() {
 const [isModalOpen, setModalOpen] = useState(false);
 return (
  <Router>
   <nav className="main-nav">
    <div className="nav-left">
     <span className="logo">🎮 GameWorld</span>
     <Link to="/">Home</Link>
     <Link to="/games">Games</Link>
     <a href="https://armorgames.com" target="_blank" rel="noopener noreferrer">
      Armor Games
     </a>
    </div>
    <div className="nav-right">
     <button className="nav-btn login-btn">Login</button>
     <button className="nav-btn signup-btn">Sign Up</button>
    </div>
   </nav>
   <Routes>
    <Route
     path="/"
     element={<Home onUploadClick={() => setModalOpen(true)} />}
    />
    <Route path="/games" element={<Games />} />
   </Routes>
   <UploadModal open={isModalOpen} onClose={() => setModalOpen(false)} />
  </Router>
 );
}

export default App;
