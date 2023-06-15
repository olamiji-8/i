import React from "react";
import { Link } from "react-router-dom";
import NavbarHome from "../../components/Navbar/NavbarHome";
import "./Notfound.css";
import fourofour from "../../assets/fourofour.svg";
import { useNavigate } from "react-router-dom";
import NotFoundNavBar from "../../components/Navbar/NotFoundNavBar";

function Notfound() {
  let navigate = useNavigate();
  return (
    <div>
      {/* <NavbarHome /> */}
      <NotFoundNavBar/>
      <div className="fourofour_container">
        <div className="fourofourname">
        <div className="toflex">
        <div className="left_logo">
            <img src={fourofour} alt="fourofourimage" />
          </div>

          <div className="right_content">
            <div className="top_bottom">
              <div className="fourofour_text">
                <p className="fourofourtext">404</p>
              </div>

              <div className="bottomtext_btn">
                <div className="bottomtext">
                  <p className="fourtext">
                    Sorry. the content you’re looking for doesn’t exist. Either
                    it was removed, or you mistyped the link.
                  </p>
                </div>

                <div className="twobtns">
                  <button onClick={()=> navigate('/')} className="homebtn">Go to homepage</button>

                  <button onClick={()=> navigate('/contact-us')} className="contactbtn">Contact us</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Notfound;
