import React from 'react'
import '../assets/css/line_one.css' 
import Pawn from '../components/Pawn'
function LineOne({ player_number, layout, boxClick, pawnInfows }) {
    
    return (
        <div className={`line_containner ${layout}`}>
            {Array.from({ length: 18 }).map((item, index) => {
                const boxIndex = player_number * 18 + index
                const isPawnFound = pawnInfows.find((item) => item.id === boxIndex)
                return (
                    <div
                        className={`box-${boxIndex}`}
                        onClick={() => boxClick(boxIndex)}
                    >
                        {isPawnFound && isPawnFound.id && <Pawn color={`player-${isPawnFound.player_number}`} />}
                        {boxIndex}
                    </div>
                )
            })}
        </div>
    )
}

export default LineOne
