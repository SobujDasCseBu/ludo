import React, {useState} from 'react'
import Cards from './Cards'
import '../assets/css/main.css'
import Dice from '../components/Dice'
import { getRollDice } from '../functions/utilities'
function Main() {
    const [turn, set_turn] = useState(1)
    const [playerName, set_playerName] = useState('Player 0')
    const [diceLength, set_diceLength] = useState(1)
    const [willCross, set_willCross] = useState(0)
    const [six, set_six] = useState(0)
    const [eatIndex, set_eatIndex] = useState(-1)
    const [pawnInfows, set_pawnInfows] = useState([
        { id: 24, player_number: 0 },
        { id: 11, player_number: 2 },
        { id: 53, player_number: 1 },
        { id: 35, player_number: 1 },
        { id: 71, player_number: 3 },
        { id: 68, player_number: 0 },
        { id: 1, player_number: 3 },
    ])
    
    const mainPath = ['1','2','5','8','11','14','17','36','37','38','39','40', '41','47','53','52','51','50','49','48','56','59','62','65','68','71','70','69','66','63','60','57','54','35','34','33','32','31','24','18','19','20','21','22','23','15','12','9','6','3','0'],
        ripePathP0= ['4','7','10','13','16'],
        ripePathP1= ['42','43','44','45','46'],
        ripePathP2= ['55','58','61','64','67'],
        ripePathP3= ['25','26','27','28','29'],
        pathStar = ['5', '39', '52', '65', '32', '66', '19', '6']
    
    const hancleDiceClick = () => {
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

        // if (1) {
            
        // set_turn((turn + 1) % 4)
        // set_playerName('Player ' + (turn + 1) % 4)
        // }
    }

    const handleBoxClick = (clickIndex) => {
        console.log('clickIndex: ', clickIndex)
        const isPawnThere = pawnInfows.find((item) => item.id === clickIndex && item.player_number === turn) 
        if (!isPawnThere) return;
        console.log('isPawnThere: ', isPawnThere)
    }
    
    return (
        <div className="container-outer">
            <div className="player-turn">
                <strong>{playerName}</strong>
                <Dice player_number={turn} hancleDiceClick={hancleDiceClick} diceLength={diceLength}/>
            </div>
            <div className='container ludo-container'>
                <Cards
                    boxClick={handleBoxClick}
                    pawnInfows={pawnInfows}
                />

            </div>
        </div>
    )
}

export default Main
