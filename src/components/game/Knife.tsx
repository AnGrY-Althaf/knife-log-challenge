import React from 'react';

const Knife = () => {
  return (
    <div className="relative">
      {/* Knife blade with metallic effect */}
      <div className="w-2 h-12 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-t-sm shadow-lg" 
        style={{
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}
      />
      {/* Knife handle with wood texture effect */}
      <div className="w-4 h-3 bg-gradient-to-b from-[#4A312C] to-[#321911] rounded-sm -mt-1" />
      
      {/* Shine effect */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent to-white opacity-30 rounded-t-sm" />
    </div>
  );
};

export default Knife;