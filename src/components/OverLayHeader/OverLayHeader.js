import React from 'react'
import HeaderBG from '../../assets/HeadBG.png'
import "./OverLayHeader.css"

function OverLayHeader({title}) {
  return (
    <div className='overLayHeader' style={{
        backgroundImage:`url(${HeaderBG})`,
        }}>
        <h1>{title}</h1>
        <div style={{position:'absolute', width:'100%', height:'100%', top:'0', left:'0', backgroundColor:'rgba(0,0,0,0.4)'}}></div>
        
    </div>
  )
}

export default OverLayHeader