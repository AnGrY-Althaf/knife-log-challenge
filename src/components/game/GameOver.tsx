import React from 'react';
import { Button } from '@/components/ui/button';

interface GameOverProps {
  score: number;
  onRestart: () => void;
}

const GameOver = ({ score, onRestart }: GameOverProps) => {
  return (
    <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center">
      <div className="text-4xl font-bold text-white mb-4">Game Over!</div>
      <div className="text-2xl text-white mb-8">Score: {score}</div>
      <Button onClick={onRestart}>Play Again</Button>
    </div>
  );
};

export default GameOver;