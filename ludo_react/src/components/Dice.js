import React from 'react'
import '../assets/css/dice.css'


const Dice = ({player_number, hancleDiceClick, diceLength}) => {
  React.useEffect(() => {
      // console.log(getRollDice())
    
  }, [])
  return (
    <div className={`dice-outer clicked dice-length-${diceLength} player-${player_number}`} onClick={hancleDiceClick}>
      <div className="dice-inner">
      {
        Array.from({ length: diceLength }).map((item, index) => (
          <div key={index + 1} className={`dice-item dice-item-${index + 1}`}></div>
        ))
        }
      </div>
    </div>
  )
}

export default Dice
