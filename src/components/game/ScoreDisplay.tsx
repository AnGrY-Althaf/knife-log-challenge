import React from 'react';

interface ScoreDisplayProps {
  score: number;
}

const ScoreDisplay = ({ score }: ScoreDisplayProps) => {
  return (
    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-4xl font-bold text-white">
      {score}
    </div>
  );
};

export default ScoreDisplay;