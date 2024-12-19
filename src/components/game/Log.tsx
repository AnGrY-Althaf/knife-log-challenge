import React from 'react';
import { motion } from 'framer-motion';

interface LogProps {
  rotationSpeed: number;
  knives: Array<{ angle: number; id: number; }>;
}

const Log = ({ rotationSpeed, knives }: LogProps) => {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full bg-yellow-800 border-4 border-yellow-900 transform -translate-x-1/2 -translate-y-1/2"
      animate={{ rotate: 360 }}
      transition={{
        duration: rotationSpeed,
        ease: "linear",
        repeat: Infinity,
      }}
    >
      {/* Wooden texture circles */}
      <div className="absolute inset-2 rounded-full border-2 border-yellow-700 opacity-50" />
      <div className="absolute inset-4 rounded-full border-2 border-yellow-600 opacity-50" />
      <div className="absolute inset-6 rounded-full border-2 border-yellow-700 opacity-50" />
      
      {/* Render stuck knives */}
      {knives.map(knife => (
        <div
          key={knife.id}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 origin-center"
          style={{
            rotate: `${knife.angle}deg`,
            height: '60px',
            width: '8px',
          }}
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">
            <div className="w-2 h-12 bg-gray-300" />
            <div className="w-4 h-2 bg-gray-400 -mt-1" />
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default Log;