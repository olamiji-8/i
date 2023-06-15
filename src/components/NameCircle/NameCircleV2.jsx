import React from 'react'
import { Capitalizer } from '../../utils/Capitalizer'
import './NameCircle.css'
function NameCircleV2({name}) {
  return (
    <div className="name_circle_card_title">
      <div className="name_circle_circle_title">{name?.split(" ")[0]?.charAt(0)?.toUpperCase()+ name?.split(" ")[1]?.charAt(0)?.toUpperCase()}</div>
      <div className="name_circle_username_">
        <p>From</p>
        <h4>{Capitalizer(name)}</h4>
      </div>
    </div>
  )
}

export default NameCircleV2
