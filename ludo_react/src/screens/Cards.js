import React from 'react'
import CardItem from './CardItem'
import '../assets/css/cards.css'
import LineOne from './LineOne'

function Cards({boxClick, pawnInfows}) {
  return (
    <div className='cards'>
        <CardItem
          player={{unriped: 4, player_number: 3}}
        />
        <LineOne
          player_number={0}
          layout='vertical'
          boxClick={boxClick}
          pawnInfows={pawnInfows}
        />
      <div>
        <CardItem
          player={{unriped: 3, player_number: 0}}
        />
      </div>
      <div>
        <LineOne
          player_number={1}
          layout='horizontal'
          boxClick={boxClick}
          pawnInfows={pawnInfows}
        />
      </div>
      <div >

      </div>
      <div>
        <LineOne
          player_number={2}
          layout='horizontal'
          boxClick={boxClick}
          pawnInfows={pawnInfows}
        />
      </div>
      <div>
        <CardItem
          player={{unriped: 2, player_number: 2}}
        />
      </div>
      <div>
        <LineOne
          player_number={3}
          layout='vertical'
          boxClick={boxClick}
          pawnInfows={pawnInfows}
        />
      </div>
      <div>
        <CardItem
          player={{unriped: 1, player_number: 1}}
        />
      </div>


    </div>
  )
}

export default Cards
