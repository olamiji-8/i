import React from 'react'

function MemorialBtn({text, icon, OnClick, className}) {
  return (
    <div onClick={OnClick} >
<button className={className}>
  <div className='memorial__icon'>  {icon} </div>
    <div className='memorial__text' >{text}</div>
</button>
    </div>
  )
}

export default MemorialBtn