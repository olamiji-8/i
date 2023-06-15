import React from "react";
import "./EmptyMemorial.css";
import EmptyMemoriali from "../../assets/EmptyMemorial.svg";
import MemorialBtn from "./MemorialBtn";
import { useNavigate } from "react-router-dom";

function EmptyMemorial() {
  let navigate = useNavigate();
  return (
    <div className="empty_memorial">
      <div className="empty__memorial_main">
        <div className="empty__memorial__icon">
          <img
            src={EmptyMemoriali}
            alt="EmptyMemorial"
            className="empty_memorial__img"
          />
        </div>

        <div className="empty_memorial_text">
          <p className="empty__memorial__title">
            Looks like you have not created any memorial
          </p>
        </div>

        <div className="empty__memorial__btn">
          <MemorialBtn
            className="memorialbtn"
            icon="+"
            text="Create Memorial"
            OnClick={()=> navigate("/create-memorial")}
          />
        </div>
      </div>
    </div>
  );
}

export default EmptyMemorial;
