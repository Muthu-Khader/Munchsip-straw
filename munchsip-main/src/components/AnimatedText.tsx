
import React, { useState, useEffect } from 'react';

interface AnimatedTextProps {
  phrases: string[];
  className?: string;
  interval?: number;
}

const AnimatedText = ({ phrases, className = "", interval = 3000 }: AnimatedTextProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      
      // Wait for exit animation, then change text
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        setIsAnimating(false);
      }, 500); // Half a second for fade out
    }, interval);

    return () => clearInterval(timer);
  }, [phrases, interval]);

  return (
    <span className={`inline-block relative ${className}`}>
      <span 
        className={`transition-all duration-500 ${isAnimating ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'}`}
      >
        {phrases[currentIndex]}
      </span>
    </span>
  );
};

export default AnimatedText;
