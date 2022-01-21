import React from 'react'
import '../assets/css/cardsitem.css'
import Pawn from '../components/Pawn'

function CardItem({ first_section, third_section, player }) {
  const { player_number, unriped } = player

  const pawnProps = {
    color:
      player_number === 0 ? 'player-0' :
        player_number === 1 ? 'player-1' :
          player_number === 2 ? 'player-2' : 'player-3'
  }

  return (
    <div className={`secondblog player-${player_number}`}>
      <div className="ready-pwans">
        <Pawn color='player-0' />
        <Pawn color='player-1' />
        <Pawn color='player-1' />
        <Pawn color='player-1' />
      </div>
      {unriped > 0 && <Pawn {...pawnProps} />}
      {unriped > 1 && <Pawn {...pawnProps} />}
      {unriped > 2 && <Pawn {...pawnProps} />}
      {unriped > 3 && <Pawn {...pawnProps} />}
    </div>
  )
}

export default CardItem
