import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/home.css'
function Home() {
    return (
        <div className='container_home'>
            <div className='get_start'>
            <Link to="/main" >
                <button className='start_button'>Get Start</button>
                </Link>
            </div>
        </div>
    )
}

export default Home
