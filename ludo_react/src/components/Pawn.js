import React from 'react';
import '../assets/css/pawn.css'

const Pawn = ({
  color,
  size,
  player_number,
  setPawnToReady,
  boxClick,
  index
}) => {
  return (
    <div
      className={`pawn ${color} ${size}`}
      onClick={() => {
        if (setPawnToReady) {
          setPawnToReady(player_number)
        } else if (boxClick) {
          boxClick(index, player_number)
        }
      }}
    >
    </div>
  );
};

export default Pawn;
