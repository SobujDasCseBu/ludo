import React from 'react'
import '../assets/css/line_one.css'
import Pawn from '../components/Pawn'
function LineOne({
  player_number,
  layout,
  boxClick,
  runningPawns,
  startPath
}) {

  return (
    <div className={`line_containner ${layout}`}>
      {Array.from({ length: 18 }).map((item, index) => {
        const boxIndex = player_number * 18 + index
        const isPawnFound = runningPawns.find((item) => item.id === boxIndex)
        const isPawnInStart = startPath.find((item) => item === isPawnFound?.id)
        return (
          <div
            key={index}
            className={`box-${boxIndex}`}
          >
            {isPawnFound && !isPawnInStart &&
              <Pawn
                index={boxIndex}
                boxClick={boxClick}
                player_number={isPawnFound.player_number}
                color={`player-${isPawnFound.player_number}`}
              />
            }
            
            {/* {boxIndex} */}
          </div>
        )
      })}
    </div>
  )
}

export default LineOne
