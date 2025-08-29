// App.js
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MovieCard from "./MovieCard";
import "./App.css";

// Use HTTPS for the API to avoid CORS issues
const API_URL = "https://www.omdbapi.com/?i=tt3896198&apikey=635edd23";

const genres = [
  "Action", "Adventure", "Animation", "Biography", "Comedy", 
  "Crime", "Documentary", "Drama", "Family", "Fantasy", 
  "History", "Horror", "Music", "Mystery",
  "Sci-Fi", "Sport", "Thriller", "War", "Western"
];

// Fallback icons in case react-icons fails to load
const FallbackSearchIcon = () => (
  <svg width="35" height="35" viewBox="0 0 24 24" fill="none">
    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FallbackMenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>

);
const FallbackCloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FallbackSunIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 2V4M12 20V22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 12H4M20 12H22M6.34 17.66L4.93 19.07M19.07 4.93L17.66 6.34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FallbackMoonIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M20.3542 15.3542C19.3176 15.7708 18.1856 16 17 16C12.0294 16 8 11.9706 8 7.00001C8 5.81441 8.22916 4.68241 8.64579 3.64585C5.33648 4.97555 3 8.21506 3 12C3 16.9706 7.02944 21 12 21C15.785 21 19.0245 18.6635 20.3542 15.3542Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [iconsLoaded, setIconsLoaded] = useState(false);

  useEffect(() => {
    searchMovies("SpiderMan");
    // Check user's preferred color scheme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      setDarkMode(false);
    }
    
    // Try to dynamically import react-icons to avoid errors if not installed
    import('react-icons/md').then(() => {
      setIconsLoaded(true);
    }).catch(() => {
      console.log("React Icons not available, using fallback icons");
      setIconsLoaded(false);
    });
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
  }, [darkMode]);

  const searchMovies = async (title) => {
    if (!title) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
      setMovies(data.Search || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenreSearch = (genre) => {
    setSearchTerm(genre);
    searchMovies(genre);
    setSidebarOpen(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchMovies(searchTerm);
    }
  };

  const iconColor = darkMode ? '#f9d3b4' : '#333333';
  const searchIconColor = darkMode ? '#a1a1a1' : '#555555';

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <button 
        className="theme-toggle"
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle dark mode"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={darkMode ? 'sun' : 'moon'}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3 }}
          >
            {iconsLoaded ? (
              darkMode ? 
                <span style={{color: '#f9d3b4', fontSize: '24px'}}>☀️</span> : 
                <span style={{color: '#333333', fontSize: '24px'}}>🌙</span>
            ) : (
              darkMode ? <FallbackSunIcon /> : <FallbackMoonIcon />
            )}
          </motion.div>
        </AnimatePresence>
      </button>

      <button 
        className="menu-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle menu"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={sidebarOpen ? 'close' : 'menu'}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3 }}
          >
            {sidebarOpen ? 
              (iconsLoaded ? 
                <span style={{color: iconColor, fontSize: '24px'}}>✕</span> : 
                <FallbackCloseIcon />
              ) : 
              (iconsLoaded ? 
                <span style={{color: iconColor, fontSize: '24px'}}>☰</span> : 
                <FallbackMenuIcon />
              )
            }
          </motion.div>
        </AnimatePresence>
      </button>

      <motion.div 
        className={`sidebar ${sidebarOpen ? 'open' : ''}`}
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ type: "spring", damping: 25 }}
      >
        <h3>Browse by Genre</h3>
        <ul>
          {genres.map(genre => (
            <li key={genre}>
              <button onClick={() => handleGenreSearch(genre)}>
                {genre}
              </button>
            </li>
          ))}
        </ul>
      </motion.div>

      <div className={`overlay ${sidebarOpen ? 'active' : ''}`} 
           onClick={() => setSidebarOpen(false)}></div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        MovieLand
      </motion.h1>

      <motion.div 
        className="search"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search for movies"
        />
        <motion.button
          onClick={() => searchMovies(searchTerm)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Search for movies"
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}
        >
          {iconsLoaded ? 
            <span style={{color: searchIconColor, fontSize: '24px'}}>🔍</span> : 
            <FallbackSearchIcon style={{color: searchIconColor}} />
          }
        </motion.button>
      </motion.div>

      {isLoading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Searching movies...</p>
        </div>
      ) : movies?.length > 0 ? (
        <motion.div 
          className="container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <AnimatePresence>
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div 
          className="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2>No movies found</h2>
          <p>Try searching for something else</p>
        </motion.div>
      )}
    </div>
  );
};

export default App;
