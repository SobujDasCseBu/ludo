import React, { useState } from 'react'
import Cards from './Cards'
import '../assets/css/main.css'
import Dice from '../components/Dice'
import { getRollDice } from '../functions/utilities'
function Main() {
  const [turn, set_turn] = useState(1)
  const [playerName, set_playerName] = useState('Player 1')
  const [diceLength, set_diceLength] = useState(1)
  const [diceDisabled, set_diceDisabled] = useState(false)
  // const [turnDisabled, set_turnDisabled] = useState(true)
  const [willCross, set_willCross] = useState(0)
  const [six, set_six] = useState(0)
  const [eatIndex, set_eatIndex] = useState(-1)
  const [runningPawns, set_runningPawns] = useState([

    
    // { id: 19, player_number: 3 },
    // { id: 19, player_number: 3 },
    // { id: 66, player_number: 0 },
    // { id: 52, player_number: 1 },
    // { id: 5, player_number: 0 },
    // { id: 5, player_number: 3 },
    //--------------------------
    // { id: 1, player_number: 0 },
    { id: 47, player_number: 1 },
    { id: 14, player_number: 2 },
    { id: 0, player_number: 2 },
  ])
  const [pawns, set_pawns] = useState({
    p0: 2,
    p1: 3,
    p2: 4,
    p3: 1,
  })
  const [readyPawns, set_readyPawns] = useState({
    // p0: [0,3],
    // p1: [1],
    // p2: [0],
    // p3: [3,3],
    p0: [],
    p1: [],
    p2: [],
    p3: [],
  })

  const mainPath = [0, 1, 2, 5, 8, 11, 14, 17, 36, 37, 38, 39, 40, 41, 47, 53, 52, 51, 50, 49, 48, 56, 59, 62, 65, 68, 71, 70, 69, 66, 63, 60, 57, 54, 35, 34, 33, 32, 31, 24, 18, 19, 20, 21, 22, 23, 15, 12, 9, 6, 3]
  const starPath = [5, 39, 52, 65, 32, 66, 19, 6]
  const startPath = [5, 52, 66, 19]
  const startPathObj = {p0: 5, p1: 52, p2: 66, p3: 19}
  const lastPathObj = {
    p0: 1,
    p1: 47,
    p2: 70,
    p3: 24
  }
  const ripePath = {
    p0: [4, 7, 10, 13, 16],
    p1: [46, 45, 44, 43, 4],
    p2: [67, 64, 61, 58, 55],
    p3: [25, 26, 27, 28, 29]
  }

  React.useEffect(() => {
    console.log('runningPawns: ', runningPawns)
  }, runningPawns)

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

    // set_turnDisabled(false)
    set_diceDisabled(true)

    // if (1) {

    // set_turn((turn + 1) % 4)
    // set_playerName('Player ' + (turn + 1) % 4)
    // }
  }

  const handleBoxClick = (clickIndex, p_number) => {
    console.log('clickIndex: ', clickIndex)
    // console.log('turnDisabled: ', turnDisabled)
    console.log('p_number, turn: ', p_number, turn)
    if (!diceDisabled) return
    if (p_number !== turn) return

    const mainPathLength = mainPath.length
    const isPawnInMainPath = runningPawns.find((item) => item.id === clickIndex && p_number === turn)
    
    console.log('isPawnInMainPath: ', isPawnInMainPath)
    if (isPawnInMainPath) {
      let _dLength = 6 || diceLength
      let pawnIndex = mainPath.findIndex((item) => item === clickIndex)
      
      removeFromReadyPawns(clickIndex)

      let divertTo = null
      
      const mainPathInterval = setInterval(() => {
        --_dLength
        ++pawnIndex
        if (pawnIndex === mainPathLength) pawnIndex = 0
        let _divertTo = checkIfExceededlastIndex(pawnIndex)
        console.log('_divertTo: ', _divertTo)
        let mainPathIndex = mainPath[pawnIndex]
        if (divertTo) {
          if (pawnIndex === ripePath[divertTo].length) {
            // // remove pawn from board
            // console.log('pawnIndex,ripePath[divertTo].length: ', pawnIndex, ripePath[divertTo].length)
            // console.log('runningPawns: ', runningPawns)
            const indexForRemove = runningPawns.findIndex((item) => item.id === ripePath[divertTo][pawnIndex - 1])
            console.log('indexForRemove: ', ripePath[divertTo][pawnIndex - 1])
            console.log('ripePath[divertTo][pawnIndex - 1]: ', ripePath[divertTo][pawnIndex - 1])
            set_runningPawns(runningPawns.filter((item, index) => index !== indexForRemove))
            // // clearInterval
            set_diceDisabled(false)
            clearInterval(mainPathInterval)
            return
          }  
          mainPathIndex = ripePath[divertTo][pawnIndex]
        } else if (_divertTo) {
          divertTo = _divertTo
          pawnIndex = 0
          mainPathIndex = ripePath[divertTo][pawnIndex]
        }
        console.log('pawnIndex: ', pawnIndex)
        const indexForRemove = runningPawns.findIndex((item) => item.id === clickIndex && item.player_number === p_number)
        set_runningPawns([
          ...runningPawns.filter((item, index) => index !== indexForRemove),
          { ...isPawnInMainPath, id: mainPathIndex }
        ])
        if (!_dLength) {
          console.log('diceDisabled: ', diceDisabled)
          set_turn((turn + 1) % 4)
          set_playerName('Player ' + (turn + 1) % 4)
          set_diceDisabled(false)
          clearInterval(mainPathInterval)
        }
      }, 300)
    }

    

    // console.log('pawnIndex: ', pawnIndex)
    // console.log('value of index: ', mainPath[pawnIndex])
  }

  const checkIfExceededlastIndex = (pawnIndex) => {
    if (turn === 0 && mainPath[pawnIndex] === 2) return 'p0'
    else if (turn === 1 && mainPath[pawnIndex] === 53) return 'p1'
    else if (turn === 2 && mainPath[pawnIndex] === 69) return 'p2'
    else if (turn === 3 && mainPath[pawnIndex] === 18) return 'p3'
    else return null
  }

  const removeFromReadyPawns = (pawnIndex) => {
    console.log('pawnIndex: ', pawnIndex)
    const p_index =
      pawnIndex === 5 ? 0
        : pawnIndex === 52 ? 1
          : pawnIndex === 66 ? 2
            : pawnIndex === 19 ? 3
              : -1
    if (p_index === -1) return
    const _index = readyPawns['p' + p_index].findIndex((item) => item === p_index)
    const filtered = readyPawns['p' + p_index].filter((item, index) => index !== _index)
    console.log('filtered: ', filtered)
    set_readyPawns({
      ...readyPawns,
      ['p' + p_index]: [...filtered]
    })
    
  }

  const setPawnToReady = (p_number) => {
    if (!diceDisabled) return
    if (diceLength === 6 && turn === p_number) {
      set_pawns({ ...pawns, [`p${p_number}`]: pawns[`p${p_number}`] - 1 })
      set_readyPawns({ ...readyPawns, [`p${p_number}`]: [...readyPawns[`p${p_number}`], p_number] })
      set_runningPawns([...runningPawns, {id: startPathObj[`p${p_number}`], player_number: p_number}])
      set_diceDisabled(false)
    }
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
