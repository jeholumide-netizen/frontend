import React from 'react'
import './Hero.css'
import exclusive_image from '../Assets/exclusive_image.png'

const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-left">
        <h2>NEW ARRIVALS ONLY</h2>
        <div>
            <div className="hero-hand-icon">
                <p>New</p>
               
            </div>
            <p>Collections</p>
            <p>for Everyone</p>
        </div>
        <div className="hero-latest-btn">
            <div>Latest Collections</div>
             
        </div>
      </div>
      <div className="hero-right">
       <img src={exclusive_image} alt="" />
      </div>
    </div>
  )
}

export default Hero 
