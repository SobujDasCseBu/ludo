import React from 'react'
import { Gi3DGlasses } from 'react-icons/gi'

import './Firstpage.css'
function Firstpage() {
  return (
    <div className='container'>
      <div className='menubar'>
        <div className='menu_logo'>
          <Gi3DGlasses />
        </div>
        <h3>home</h3>
      </div>

      <div className='body'>
        <h3>body</h3>
      </div>

      <div className='froter'>
        <h3>froter</h3>
      </div>
    </div>
  )
}

export default Firstpage
