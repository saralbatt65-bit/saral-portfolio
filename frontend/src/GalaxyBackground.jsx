import React, { useState, useEffect } from 'react';
import './Galaxy.css';

const GalaxyBackground = () => {
  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);

  useEffect(() => {
    // Generate static twinkling stars
    const newStars = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 2, // Sizes between 2px and 5px
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDuration: Math.random() * 3 + 2,
      animationDelay: Math.random() * 5,
    }));
    setStars(newStars);

    // Generate shooting stars
    const newShootingStars = Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      top: Math.random() * 50, // Keep them mostly in top half
      left: Math.random() * 100,
      animationDuration: Math.random() * 5 + 5, // 5s to 10s loop
      animationDelay: Math.random() * 10,
    }));
    setShootingStars(newShootingStars);
  }, []);

  return (
    <div className="galaxy-container">
      {/* Starfield */}
      <div className="stars-wrapper">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDuration: `${star.animationDuration}s`,
              animationDelay: `${star.animationDelay}s`
            }}
          ></div>
        ))}
        {shootingStars.map((star) => (
          <div
            key={`shoot-${star.id}`}
            className="shooting-star"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              animationDuration: `${star.animationDuration}s`,
              animationDelay: `${star.animationDelay}s`
            }}
          ></div>
        ))}
      </div>

      {/* Solar System Animation */}
      <div className="solar-system">
        <div className="sun"></div>
        <div className="orbit orbit-1">
          <div className="planet planet-1"></div>
        </div>
        <div className="orbit orbit-2">
          <div className="planet planet-2"></div>
        </div>
        <div className="orbit orbit-3">
          <div className="planet planet-3">
            <div className="moon-orbit">
              <div className="moon"></div>
            </div>
          </div>
        </div>
        <div className="orbit orbit-4">
          <div className="planet planet-4"></div>
        </div>
        <div className="orbit orbit-5">
          <div className="planet planet-5"></div>
        </div>
      </div>
    </div>
  );
};

export default GalaxyBackground;
