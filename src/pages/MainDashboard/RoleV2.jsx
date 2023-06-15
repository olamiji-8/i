import React, { useContext, useEffect } from "react";
import "./Role.css";
import { DashboardContext } from "../../contexts/DashboardContext/Dashboard";
import { Menu } from "@mui/material";
import { useLocation } from "react-router-dom";

function RoleV2({ role, initial, onClick, className, }) {

  return (
   <div  className="role__body" onClick={onClick} >
        <div 
          className="role">
      <div className="role__initial">
        <p className="role__initial__name "  onClick={onClick} >{initial}</p>
      </div>
      <div style={{color:'white', fontSize:'12px'}}>
      {role}
      </div>
    </div>
   </div>
  );
}

export default RoleV2;
