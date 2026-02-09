// components/ui/AnimatedBackground.jsx
import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10
  }));

  return (
    <div className="animated-bg">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            background: 'rgba(59, 130, 246, 0.3)'
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            transition: {
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear"
            }
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;