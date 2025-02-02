'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const thoughts = [
  "Hi! I'm here to help organize your notes!",
  "Create new vaults for your ideas",
  "Never lose an important thought again",
  "Organization is key to productivity",
  "Your personal knowledge assistant",
  "Save and structure your ideas efficiently",
  "Quick access to all your notes",
  "Keep your thoughts organized and searchable",
  "Build your second brain with me",
  "Transform ideas into structured knowledge",
  "Secure storage for your valuable insights",
  "Let's make note-taking enjoyable",
  "Your ideas deserve a good home",
  "Capture thoughts whenever inspiration strikes",
  "Smart organization, better productivity"
];

const positions = [
  { top: '20px', left: '384px' },    // top-left
  { top: '20px', right: '384px' },   // top-right
  { top: '20px', left: '50%' },      // top-center
  { top: '100px', left: '384px' },   // middle-left
  { top: '100px', right: '384px' },  // middle-right
];

export function ThoughtBubble() {
  const [currentThought, setCurrentThought] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(positions[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentThought((prev) => (prev + 1) % thoughts.length);
      setCurrentPosition(positions[Math.floor(Math.random() * positions.length)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'absolute',
      ...currentPosition,
      zIndex: 10,
      transform: currentPosition.left === '50%' ? 'translateX(-50%)' : 'none'
    }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentThought}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          transition={{ 
            duration: 0.5,
            ease: "easeInOut"
          }}
        >
          <p className="text-sm">{thoughts[currentThought]}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 