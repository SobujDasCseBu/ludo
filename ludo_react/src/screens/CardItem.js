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

        <div className='card-item'>
            <div className={first_section}>
                <div className='secondblog'>
                    <div className={third_section}>
                        {unriped > 0 && <Pawn {...pawnProps} />}
                    </div>
                    <div className={third_section}>

                    {unriped > 1 && <Pawn {...pawnProps} />}
                    </div>
                    <div className={third_section}>
                        {unriped > 2 && <Pawn {...pawnProps} />}
                    </div>
                    <div className={third_section}>
                        {unriped > 3 && <Pawn {...pawnProps} />}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CardItem
