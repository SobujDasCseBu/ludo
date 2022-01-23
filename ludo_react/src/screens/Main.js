import React, { useState } from 'react'
import Cards from './Cards'
import '../assets/css/main.css'
import Dice from '../components/Dice'
import { getRollDice } from '../functions/utilities'
function Main() {
  const [turn, set_turn] = useState(1)
  const [playerName, set_playerName] = useState('Player 0')
  const [diceLength, set_diceLength] = useState(1)
  const [diceDisabled, set_diceDisabled] = useState(false)
  const [turnDisabled, set_turnDisabled] = useState(true)
  const [willCross, set_willCross] = useState(0)
  const [six, set_six] = useState(0)
  const [eatIndex, set_eatIndex] = useState(-1)
  const [runningPawns, set_runningPawns] = useState([

    
    { id: 19, player_number: 3 },
    { id: 19, player_number: 3 },
    { id: 66, player_number: 0 },
    { id: 52, player_number: 1 },
    { id: 5, player_number: 0 },
    { id: 5, player_number: 3 },
    //--------------------------
    { id: 24, player_number: 0 },
    { id: 1, player_number: 1 },
    { id: 14, player_number: 2 },
  ])
  const [pawns, set_pawns] = useState({
    p0: 2,
    p1: 3,
    p2: 4,
    p3: 1,
  })
  const [readyPawns, set_readyPawns] = useState({
    p0: [0,3],
    p1: [1],
    p2: [0],
    p3: [3,3],
  })

  const mainPath = [1, 2, 5, 8, 11, 14, 17, 36, 37, 38, 39, 40, 41, 47, 53, 52, 51, 50, 49, 48, 56, 59, 62, 65, 68, 71, 70, 69, 66, 63, 60, 57, 54, 35, 34, 33, 32, 31, 24, 18, 19, 20, 21, 22, 23, 15, 12, 9, 6, 3, 0]
  const starPath = [5, 39, 52, 65, 32, 66, 19, 6]
  const startPath = [5, 52, 66, 19]
  const lastPath = {
    p0: 1,
    p1: 47,
    p2: 70,
    p3: 24
  }
  const ripePath = {
    p0: [4, 7, 10, 13, 16],
    p1: [42, 43, 44, 45, 46],
    p2: [55, 58, 61, 64, 67],
    p3: [25, 26, 27, 28, 29]
  }

  const hancleDiceClick = () => {
    if (diceDisabled) return
    const diceNumber = getRollDice()
    set_diceLength(diceNumber)
    if (diceNumber === 6) {
      if (six === 2) {
        set_six(0)
        set_turn((turn + 1) % 4)
        set_playerName('Player ' + (turn + 1) % 4)
      } else {
        set_six(() => six + 1)
        set_willCross(6)
      }
    } else {
      set_willCross(diceNumber)
    }

    set_turnDisabled(false)
    set_diceDisabled(true)

    // if (1) {

    // set_turn((turn + 1) % 4)
    // set_playerName('Player ' + (turn + 1) % 4)
    // }
  }

  const handleBoxClick = (clickIndex, p_number) => {
    console.log('clickIndex: ', clickIndex)
    if (turnDisabled) return
    console.log('turn, p_number: ', turn, p_number)
    // console.log('item === clickIndex: ', item, clickIndex)
    const isPawnInMainPath = runningPawns.find((item) => {
      console.log('item clickIndex: ', item, clickIndex)
      return item === clickIndex && p_number === turn
    })
    handlePawnSpeed(clickIndex)
    console.log('isPawnInMainPath: ', isPawnInMainPath)
    if (!isPawnInMainPath) return;
  }

  const setPawnToReady = (p_number) => {
    if (turnDisabled) return
    if (diceLength === 6 && turn === p_number) {
      set_pawns({ ...pawns, [`p${p_number}`]: pawns[`p${p_number}`] - 1 })
      set_readyPawns({ ...readyPawns, [`p${p_number}`]: [...readyPawns[`p${p_number}`], p_number] })
      set_diceDisabled(false)
    }
  }

  const handlePawnSpeed = (initPos) => {
    const initIndex = mainPath.find((item, index) => item === initPos)
    console.log('initIndex: ', initIndex)
  }

  return (
    <div className="container-outer">
      <div className="player-turn">
        <strong>{playerName}</strong>
        <Dice player_number={turn} hancleDiceClick={hancleDiceClick} diceLength={diceLength} />
      </div>
      <div className='container ludo-container'>
        <Cards
          boxClick={handleBoxClick}
          runningPawns={runningPawns}
          pawns={pawns}
          readyPawns={readyPawns}
          setPawnToReady={setPawnToReady}
          startPath={startPath}
        />

      </div>
    </div>
  )
}

export default Main
