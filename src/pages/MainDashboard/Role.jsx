import React from "react";
import "./Role.css";
import { useLocation } from "react-router-dom";

function Role({ name, role, initial, onClick, memorial, edit }) {

const location = useLocation()

  return (
    // <div onClick={()=> UpdateMenuClicked(x.Title)}
    
   <div  className={`${ edit  ? "role__body__edit" : "role__body"  }  `   }  onClick={onClick} >
        <div 
          className={location.pathname === '/profile' ? 'rolewhite' : 'role'}>
      <div className="role__initial">
      
        <p className={`${memorial ? "role__initial__memorial " : "role__initial__name "  }`}  onClick={onClick} >{initial}</p>
      </div>

      <div className="role__name">
        <p className="role__main__name">{name}</p> 
        <span className={location.pathname === '/profile' ? "role__role_edit":'role_role'}>{role}</span> 
      </div>
    </div>
   </div>
  );
}

export default Role;
