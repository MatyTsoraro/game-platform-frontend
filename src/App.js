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

// Hero Section for Home Page
function Home({ onUploadClick }) {
 return (
  <div className="hero-section">
   <h1>Game Platform</h1>
   <p>Your place to upload and play awesome games!</p>
   <p style={{ marginTop: "14px" }}>
    Developers, upload your game and share it with the world!
    <br />
    Players, discover new indie games every day!
   </p>
   <button className="upload-btn" onClick={onUploadClick}>
    <FaCloudUploadAlt
     style={{ marginRight: 9, fontSize: "1.3em", verticalAlign: "middle" }}
    />
    Upload Game
   </button>
  </div>
 );
}

function Games() {
 const [games, setGames] = useState([]);
 useEffect(() => {
  fetch("http://localhost:8080/games")
   .then((res) => res.json())
   .then((data) => setGames(data))
   .catch((err) => console.error("Error:", err));
 }, []);
 return (
  <div>
   <h2>Games Page</h2>
   <ul>
    {games.map((game) => (
     <li key={game.id}>{game.title}</li>
    ))}
   </ul>
  </div>
 );
}

function App() {
 const [isModalOpen, setModalOpen] = useState(false);
 return (
  <Router>
   <nav className="main-nav">
    <Link to="/">Home</Link>
    <span> | </span>
    <Link to="/games">Games</Link>
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
