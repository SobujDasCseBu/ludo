import React from 'react'
import CardItem from './CardItem'
import '../assets/css/cards.css'
import Line_one from './Line_one'
import Line_two from './Line_two'
import Line_three from './Line_three'
import Line_four from './Line_four'
function Cards() {
  return (
    <div className='cards'>
    <div>
      <CardItem
              first_section='firstblog'
              third_section='thirdblog'
              
            />
        </div>
        <div>
          <Line_one />
          </div>
        <div>
         <CardItem
              first_section='fourthtblog'
              third_section='fifthdblog'
              
            />
        </div>
        <div>
          <Line_three/>
        </div>
        <div >
        
        </div>
        <div>
          <Line_four/>
        </div>
        <div>
         <CardItem
              first_section='sixthblog'
              third_section='sevenblog'
              
            />
        </div>
          <div>
          <Line_two />
          </div>
        <div>
         <CardItem
              first_section='eightlog'
              third_section='nineblog'
              
            />
         </div>
       
           
    </div>
  )
}

export default Cards
