import React from 'react';
import '../assets/css/pawn.css'

const Pawn = ({color, size}) => {
  return <div className={`pawn ${color} ${size}`}></div>;
};

export default Pawn;
