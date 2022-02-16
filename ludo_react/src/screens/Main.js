import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cards from './Cards'
import '../assets/css/main.css'
import Dice from '../components/Dice'
import { getRollDice } from '../functions/utilities'
import { validateUser } from '../functions/config'
import axios from '../functions/axios'
function Main() {
  const navigate = useNavigate()
  const [turn, set_turn] = useState(0)
  const [players, set_players] = useState(['Sabuj', 'Mumu', 'Sujan', 'Avijit'])
  const [diceLength, set_diceLength] = useState(1)
  const [diceDisabled, set_diceDisabled] = useState(false)
  const [hintMessage, set_hintMessage] = useState('Click the dice')
  const [willCross, set_willCross] = useState(0)
  const [six, set_six] = useState(0)
  const [eatIndex, set_eatIndex] = useState(-1)
  const [check_player,set_check_player] = useState(0)
  const [runningPawns, set_runningPawns] = useState([
    
    
    //{ id: 35, player_number: 3 },
    //{ id: 19, player_number: 3 },
    //{ id: 66, player_number: 0 },
    //{ id: 50, player_number: 1 },
    //{ id: 0, player_number: 3 },
    // { id: 47, player_number: 1 },
    // { id: 4, player_number: 0 },
    //--------------------------

    //{ id: 1, player_number: 0 },
    //{ id: 47, player_number: 1 },
    //{ id: 14, player_number: 2 },
    //{ id: 30, player_number: 2 },


  ])
  const [pawns, set_pawns] = useState({
    p0: 4,
    p1: 4,
    p2: 4,
    p3: 4,
  })
  const [readyPawns, set_readyPawns] = useState({
    p0: [],
    p1: [],
    p2: [],
    p3: [],
  })

  const mainPath = [0, 1, 2, 5, 8, 11, 14, 17, 36, 37, 38, 39, 40, 41, 47, 53, 52, 51, 50, 49, 48, 56, 59, 62, 65, 68, 71, 70, 69, 66, 63, 60, 57, 54, 35, 34, 33, 32, 31,30, 24, 18, 19, 20, 21, 22, 23, 15, 12, 9, 6, 3]
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

  useEffect(() => {
    checkValidation()
  }, [])

  const checkValidation = async () => {
    const isValidated = await validateUser()
    // console.log('isValidated: ', isValidated)
    if (!isValidated) {
      navigate('/login')
    }
  }
  
  const handleDiceClick = () => {
    if (diceDisabled) return
    const diceNumber = getRollDice()
    set_diceLength(diceNumber)
    if (diceNumber === 6) {
      if (six === 2) {
        set_six(0)
        // set_turn((turn + 1) % 4)
        set_diceDisabled(true)
        set_hintMessage('Click the pawns')
      } else {
        set_six(() => six + 1)
        set_willCross(6)
        set_diceDisabled(true)
        set_hintMessage('Click the pawns')
      }
    } else {
      if(!runningPawns.find((item) => item.player_number===turn && diceNumber !==6)) {
        set_turn((turn + 1) % 4)
      } else {
        set_willCross(diceNumber)
        set_diceDisabled(true)
        set_hintMessage('Click the pawns')
      }
      
    }
  
  }
  
 

  const handleBoxClick = (clickIndex, p_number) => {
    console.log('clickIndex: ', clickIndex)
    // console.log('turnDisabled: ', turnDisabled)
    console.log('p_number, turn: ', p_number, turn)
    // return
    if (!diceDisabled) return
    if (p_number !== turn) return

    const mainPathLength = mainPath.length
    const isPawnInMainPath = mainPath.find((item) => item === clickIndex)
    
    console.log('sm isPawnInMainPath: ', isPawnInMainPath)
    if (isPawnInMainPath) {
      let _dLength = diceLength
      let pawnIndex = mainPath.findIndex((item) => item === clickIndex)
      
      // handleReadyPawns(clickIndex, 'remove')

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
            const indexForRemove = runningPawns.findIndex((item) => item.id === ripePath[divertTo][pawnIndex - 1] && item.player_number === turn)
            console.log('indexForRemove: ', ripePath[divertTo][pawnIndex - 1])
            console.log('ripePath[divertTo][pawnIndex - 1]: ', ripePath[divertTo][pawnIndex - 1])
            set_runningPawns(runningPawns.filter((item, index) => index !== indexForRemove))
            // // clearInterval
            set_diceDisabled(false)
            set_hintMessage('Click the dice')
            clearInterval(mainPathInterval)
            return
          }  
          mainPathIndex = ripePath[divertTo][pawnIndex]
        } else if (_divertTo) {
          divertTo = _divertTo
          pawnIndex = 0
          mainPathIndex = ripePath[divertTo][pawnIndex]
        }
        console.log('sm runningPawns: ', runningPawns)
        const indexForRemove = runningPawns.findIndex((item) => item.id === clickIndex && item.player_number === p_number)
        // console.log('sm itemForRemove: ', indexForRemove)
        set_runningPawns([
          ...runningPawns.filter((item, index) => index !== indexForRemove),
          { player_number: turn, id: mainPathIndex }
        ])
        
        
        
        addToReadyPawns(mainPathIndex)
        removeFromReadyPawns(mainPathIndex)
        
        if (!_dLength) {
          // console.log('diceDisabled: ', diceDisabled)
          set_turn((turn + 1) % 4)
          set_hintMessage('Click the dice')
          set_diceDisabled(false)
          clearInterval(mainPathInterval)
         // console.log("add")
        }
      }, 300)
    } else {
      const ripePathIndex = ripePath['p' + turn].findIndex((item) => item === clickIndex)
      console.log('sm ripePathIndex: ', ripePathIndex)
      const _dLength = diceLength
      console.log('sm ripePath[\'p\' + turn].length - ripePathIndex - 1: ', ripePath['p' + turn].length - ripePathIndex - 1)
      console.log('sm _dLength: ', _dLength)
      
      // set_turn((turn + 1) % 4)
      // set_hintMessage('Click the dice')
      // set_diceDisabled(false)
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


  const addToReadyPawns = (mainPathIndex) => {
    const p_index =
      mainPathIndex === 5 ? 0
        : mainPathIndex === 52 ? 1
          : mainPathIndex === 66 ? 2
            : mainPathIndex === 19 ? 3
              : -1
    if (p_index === -1) return
    set_readyPawns({
      ...readyPawns,
      ['p' + p_index]: [...readyPawns['p' + p_index], turn]
    })
  }

  const removeFromReadyPawns = (mainPathIndex) => {
    const p_index =
      mainPathIndex === 8 ? 0
        : mainPathIndex === 51 ? 1
          : mainPathIndex === 63 ? 2
            : mainPathIndex === 20 ? 3
              : -1
    
    // console.log('sm removeFromReadyPawns p_index: ', p_index)
    if (p_index === -1) return
    const _index = readyPawns['p' + p_index].findIndex((item) => item === turn)
    // console.log('sm removeFromReadyPawns _index: ', _index)
    const filtered = readyPawns['p' + p_index].filter((item, index) => index !== _index)
    // console.log('sm removeFromReadyPawns filtered: ', filtered)
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
      set_hintMessage('Click the dice')
    }
  }

  return (
    <div className="container-outer">
      <div className="hint" style={{ textAlign: 'center' }}><p>{ hintMessage }</p></div>
      <div className="player-turn">
        <strong>{players[turn]}'s turn</strong>
        <Dice player_number={turn} handleDiceClick={handleDiceClick} diceLength={diceLength} />
      </div>
      <div className='container ludo-container'>
        <Cards
          boxClick={handleBoxClick}
          runningPawns={runningPawns}
          pawns={pawns}
          readyPawns={readyPawns}
          setPawnToReady={setPawnToReady}
          startPath={startPath}
          players={players}
        />

      </div>
    </div>
  )
}

export default Main
