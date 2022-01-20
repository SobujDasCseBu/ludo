import React from 'react'
import '../assets/css/dice.css'
import { getRollDice } from '../functions/utilities'


const Dice = () => {
  const [diceLength, set_diceLength] = React.useState(6);
  React.useEffect(() => {
      // console.log(getRollDice())
    
  }, [])
  return (
    <div className={`dice-outer clicked dice-length-${diceLength}`} onClick={() => set_diceLength(getRollDice())}>
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
