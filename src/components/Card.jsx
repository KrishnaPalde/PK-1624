import React from "react";

function Card() {
  return (
    <div className="group relative w-64 h-80 bg-white rounded-xl shadow-lg transition-transform transform-gpu hover:scale-105 hover:rotate-1 hover:shadow-2xl">
      <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-gray-800 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl group-hover:rotate-6 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform transform-gpu">
        3D Hover Card
      </div>
    </div>
  );
}

export default Card;
