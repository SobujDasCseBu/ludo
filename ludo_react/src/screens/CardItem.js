import React from 'react'
import '../assets/css/cardsitem.css'
import Pawn from '../components/Pawn'

function CardItem({
  pawns,
  player_number,
  readyPawns,
  setPawnToReady,
  boxClick
}) {


  const [boxIndex, set_boxIndex] = React.useState(player_number === 0 ? 5
              : player_number === 1 ? 52
                : player_number === 2 ? 66
                  : 19) 

  return (
    <div className={`secondblog player-${player_number}`} 
    >
      {readyPawns.length > 0 && <div className="ready-pwans">
        {readyPawns.map((item, index) => (
          <Pawn
            key={index}
            index={boxIndex}
            color={`player-${item}`}
            player_number={item}
            boxClick={boxClick}
          />
        ))}
      </div>}
      {Array.from({ length: pawns })
        .map((item, index) => (
          <Pawn
            key={index}
            index={boxIndex}
            color={`player-${player_number}`}
            player_number={player_number}
            setPawnToReady={setPawnToReady}
          />
        ))}
    </div>
  )
}

export default CardItem
