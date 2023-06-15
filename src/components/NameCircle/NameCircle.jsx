import moment from 'moment'
import React from 'react'
import './NameCircle.css'
function NameCircle({name, role, date}) {
  return (
    <div className="name_circle_card_title">
      <div className="name_circle_circle_title">{name?.split(" ")[0]?.charAt(0)?.toUpperCase()+ name?.split(" ")[1]?.charAt(0)?.toUpperCase()}</div>
      <div className="name_circle_username_">
        <h3>{name}</h3>
        <p>{role?.charAt(0).toUpperCase() + role?.slice(1).toLowerCase()}  {moment(date).format("DD MMM YYYY") }</p>
      </div>
    </div>
  )
}

export default NameCircle
