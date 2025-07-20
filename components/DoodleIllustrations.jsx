import React from 'react';

// Knight doodle component
export const KnightDoodle = ({ className = "", size = 80 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 80 80" 
    className={`doodle doodle-knight ${className}`}
  >
    {/* Helmet */}
    <path d="M25 20 L55 20 L55 35 L50 40 L30 40 L25 35 Z" />
    {/* Visor */}
    <path d="M30 25 L50 25 L50 30 L30 30 Z" />
    {/* Body armor */}
    <path d="M30 40 L50 40 L50 65 L30 65 Z" />
    {/* Arms */}
    <path d="M20 45 L30 45 M50 45 L60 45" />
    {/* Sword */}
    <path d="M15 35 L25 35 M20 30 L20 40" />
    {/* Shield */}
    <circle cx="65" cy="50" r="8" />
    <path d="M65 42 L65 58" />
  </svg>
);

// Dragon doodle component
export const DragonDoodle = ({ className = "", size = 100 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 80" 
    className={`doodle doodle-dragon ${className}`}
  >
    {/* Body */}
    <path d="M20 40 Q40 30 60 40 Q80 50 90 40" />
    {/* Head */}
    <circle cx="15" cy="40" r="8" />
    {/* Wings */}
    <path d="M30 35 Q25 25 35 30 Q45 25 40 35" />
    <path d="M50 35 Q45 25 55 30 Q65 25 60 35" />
    {/* Tail */}
    <path d="M90 40 Q95 35 100 40 Q95 45 90 40" />
    {/* Legs */}
    <path d="M25 48 L25 55 M35 48 L35 55 M55 48 L55 55 M75 48 L75 55" />
  </svg>
);

// Cat doodle component
export const CatDoodle = ({ className = "", size = 70 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 70 60" 
    className={`doodle doodle-cat ${className}`}
  >
    {/* Head */}
    <circle cx="35" cy="25" r="15" />
    {/* Ears */}
    <path d="M25 15 L30 25 L20 25 Z M50 25 L45 25 L55 15 Z" />
    {/* Body */}
    <ellipse cx="35" cy="45" rx="12" ry="8" />
    {/* Tail */}
    <path d="M47 45 Q55 40 60 50 Q55 55 50 50" />
    {/* Legs */}
    <path d="M28 53 L28 58 M32 53 L32 58 M38 53 L38 58 M42 53 L42 58" />
    {/* Whiskers */}
    <path d="M15 25 L25 25 M45 25 L55 25" />
  </svg>
);

// Progress bar component
export const ProgressBar = ({ progress = 50, className = "" }) => {
  const totalBlocks = 10;
  const filledBlocks = Math.round((progress / 100) * totalBlocks);
  
  return (
    <div className={`progress-bar ${className}`}>
      {Array.from({ length: totalBlocks }, (_, i) => (
        <div 
          key={i} 
          className={`progress-block ${i < filledBlocks ? 'filled' : 'empty'}`}
        />
      ))}
    </div>
  );
}; 