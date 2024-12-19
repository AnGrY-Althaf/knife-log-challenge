import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import Log from './Log';
import Knife from './Knife';
import ScoreDisplay from './ScoreDisplay';
import GameOver from './GameOver';

interface KnifePosition {
  angle: number;
  id: number;
}

const GameBoard = () => {
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [knives, setKnives] = useState<KnifePosition[]>([]);
  const [canThrow, setCanThrow] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState(2); // seconds per rotation
  const boardRef = useRef<HTMLDivElement>(null);

  // Handle knife throw
  const handleThrow = () => {
    if (!canThrow || isGameOver) return;

    setCanThrow(false);
    const newKnife: KnifePosition = {
      angle: 0,
      id: Date.now(),
    };

    // Check for collisions
    const collision = knives.some(knife => {
      const angleDistance = Math.abs(knife.angle - newKnife.angle);
      return angleDistance < 30 || angleDistance > 330;
    });

    if (collision) {
      setIsGameOver(true);
      toast.error("Game Over! Knife collision detected!");
      return;
    }

    // Add new knife
    setKnives(prev => [...prev, newKnife]);
    setScore(prev => prev + 1);
    
    // Reset throw ability after animation
    setTimeout(() => {
      setCanThrow(true);
    }, 300);

    // Increase difficulty
    if (score > 0 && score % 5 === 0) {
      setRotationSpeed(prev => Math.max(prev * 0.8, 0.8));
    }
  };

  // Handle game restart
  const handleRestart = () => {
    setScore(0);
    setKnives([]);
    setIsGameOver(false);
    setRotationSpeed(2);
    setCanThrow(true);
  };

  // Handle click/tap events
  useEffect(() => {
    const handleClick = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      if (!isGameOver) handleThrow();
    };

    const board = boardRef.current;
    if (board) {
      board.addEventListener('click', handleClick);
      board.addEventListener('touchstart', handleClick);
    }

    return () => {
      if (board) {
        board.removeEventListener('click', handleClick);
        board.removeEventListener('touchstart', handleClick);
      }
    };
  }, [isGameOver, canThrow]);

  return (
    <div 
      ref={boardRef}
      className="relative h-screen w-full overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5)'
      }}
    >
      <ScoreDisplay score={score} />
      
      <div className="relative w-80 h-80">
        <Log rotationSpeed={rotationSpeed} knives={knives} />
        
        {canThrow && !isGameOver && (
          <motion.div
            initial={{ y: "100vh" }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="absolute bottom-[-100px] left-1/2 transform -translate-x-1/2"
          >
            <Knife />
          </motion.div>
        )}
      </div>

      {isGameOver && (
        <GameOver score={score} onRestart={handleRestart} />
      )}
    </div>
  );
};

export default GameBoard;