import React from 'react'
import CardItem from './CardItem'
import '../assets/css/cards.css'
import LineOne from './LineOne'

function Cards({
  boxClick,
  runningPawns,
  pawns,
  readyPawns,
  setPawnToReady,
  startPath
}) {
  return (
    <div className='cards'>
      
      <CardItem
        player_number={3}
        pawns={pawns.p3}
        readyPawns={readyPawns.p3}
        setPawnToReady={setPawnToReady}
        boxClick={boxClick}
      />
      <LineOne
        player_number={0}
        layout='vertical'
        boxClick={boxClick}
        runningPawns={runningPawns}
        startPath={startPath}
      />
      <div>
        <CardItem
          player_number={0}
          pawns={pawns.p0}
          readyPawns={readyPawns.p0}
          setPawnToReady={setPawnToReady}
          boxClick={boxClick}
        />
      </div>
      <div>
        <LineOne
          player_number={1}
          layout='horizontal'
          boxClick={boxClick}
          runningPawns={runningPawns}
          startPath={startPath}
        />
      </div>
      <div >

      </div>
      <div>
        <LineOne
          player_number={2}
          layout='horizontal'
          boxClick={boxClick}
          runningPawns={runningPawns}
          startPath={startPath}
        />
      </div>
      <div>
        <CardItem
          player_number={2}
          pawns={pawns.p2}
          readyPawns={readyPawns.p2}
          setPawnToReady={setPawnToReady}
          boxClick={boxClick}
        />
      </div>
      <div>
        <LineOne
          player_number={3}
          layout='vertical'
          boxClick={boxClick}
          runningPawns={runningPawns}
          startPath={startPath}
        />
      </div>
      <div>
        <CardItem
          player_number={1}
          pawns={pawns.p1}
          readyPawns={readyPawns.p1}
          setPawnToReady={setPawnToReady}
          boxClick={boxClick}
        />
      </div>
    </div>
  )
}

export default Cards
