// MovieCard.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const MovieCard = ({ movie: { imdbID, Year, Poster, Title, Type } }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
  };

  return (
    <motion.div 
      className="movie"
      layout
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="movie-year">
        <p>{Year}</p>
      </div>

      <div className="movie-poster">
        <img 
          src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/400"} 
          alt={Title} 
          onLoad={() => setImageLoaded(true)}
          style={{ opacity: imageLoaded ? 1 : 0.7 }}
        />
        {!imageLoaded && <div className="image-placeholder"></div>}
      </div>

      <div className="movie-info">
        <span>{Type}</span>
        <h3>{Title}</h3>
      </div>
    </motion.div>
  );
}

export default MovieCard;