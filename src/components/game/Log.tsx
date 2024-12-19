import React from 'react';
import { motion } from 'framer-motion';

interface LogProps {
  rotationSpeed: number;
  knives: Array<{ angle: number; id: number; }>;
}

const Log = ({ rotationSpeed, knives }: LogProps) => {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full transform -translate-x-1/2 -translate-y-1/2"
      style={{
        background: 'linear-gradient(135deg, #8B4513 0%, #654321 50%, #3E2723 100%)',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 2px 10px rgba(255, 255, 255, 0.2)'
      }}
      animate={{ rotate: 360 }}
      transition={{
        duration: rotationSpeed,
        ease: "linear",
        repeat: Infinity,
      }}
    >
      {/* Wood grain texture */}
      <div className="absolute inset-0 rounded-full opacity-40"
        style={{
          background: 'repeating-radial-gradient(circle at center, transparent 0, transparent 2px, rgba(0,0,0,0.1) 3px, transparent 4px)'
        }}
      />
      
      {/* Wood rings */}
      <div className="absolute inset-4 rounded-full border-2 border-[#5D4037] opacity-40" />
      <div className="absolute inset-8 rounded-full border-2 border-[#5D4037] opacity-30" />
      <div className="absolute inset-12 rounded-full border-2 border-[#5D4037] opacity-20" />
      
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
            {/* Knife blade */}
            <div className="w-2 h-12 bg-gradient-to-r from-gray-300 to-gray-400 rounded-t-sm shadow-lg" 
              style={{
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}
            />
            {/* Knife handle */}
            <div className="w-4 h-3 bg-gradient-to-b from-[#4A312C] to-[#321911] rounded-sm -mt-1" />
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default Log;