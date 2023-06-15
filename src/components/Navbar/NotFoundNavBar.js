import React, { useEffect, useState } from "react";
import "./Navbar.css";
import Ctblogo from "../../assets/Ctblogo.png";
import PrimaryBtn from "../Buttons/PrimaryBtn";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SidebarHome from "./SidebarHome";
import { Local_storage } from "../../utils/LocalStorageConfig";
import { Link as ScrollLink } from 'react-scroll'
import $ from 'jquery'
import NotfoundSidebar from "./NotfoundSidebar";

function NotFoundNavBar({ bgColor, iconColor }) {

  let navigate = useNavigate();

  useEffect(() => {
    $("head").append(`<script async src="https://www.googletagmanager.com/gtag/js?id=G-B627PYJWF2"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', 'G-B627PYJWF2');
    </script>`);
  }, [])
  

  return (
    <>
      <div id="navbar_container" className="navbar_container" style={{ background: bgColor }}>
        <div className="home_max_width">
          <header>
            <div className="header-section" >
              <div style={{display:'flex', alignItems:'center'}}>
                <div className="hambugerr">
                  {/* <SidebarHome iconColor={iconColor} /> */}
                  <NotfoundSidebar iconColor={iconColor} />
                </div>
                <img onClick={()=> navigate('/')}  src={Ctblogo} alt="logo" className="logo" />
              </div>

              <nav className="navigation">
                <Link
                  activeClass="navigation--item__active"
                  className="navigation--item"
                  spy
                
                  to="/">
                  Home
                </Link>
                {/* <Link to="/#containered">projects</Link> */}
                <Link
                  activeClass="navigation--item__active"
                  className="navigation--item"
                  spy
                  to="/">
                  How It Work 
                </Link>
                <Link
                  activeClass="navigation--item__active"
                  className="navigation--item"
                  spy
                  to="/">
                  Pricing 
                </Link>
                <Link
                  activeClass="navigation--item__active"
                  className="navigation--item"
                //   spy
                  to="/">
                  FAQ
                </Link>
                <Link to="/memorials" className="navigation--item">Memorials</Link>
                <Link to="/about-us" className="navigation--item">About Us</Link>
                <Link to="/contact-us" className="navigation--item">Contact Us</Link>
              </nav>
              <div className="showDesktop">
                {
                  Local_storage().get("_utk") !== "" ?
                    <div className="navigation--button">
                      <PrimaryBtn txt="Dashboard" onClick={() => navigate("/dashboard")} bg="var(--main)" txtColor="#FFFFF" hoverBG="var(--sub-main)" hoverColor="var(--main)"  />
                    </div>
                    :
                    <div className="navigation--button">
                      <PrimaryBtn onClick={() => navigate("/login")} txt="Login" bg="var(--sub-main)" txtColor="var(--main)" hoverBG="#FFEFE0" />
                      <PrimaryBtn txt="Sign up" onClick={() => navigate("/sign-up")} bg="var(--main)" txtColor="#FFFFF" hoverBG="var(--sub-main)" hoverColor="var(--main)" />
                    </div>
                }
              </div>
              <div className="showMobile">
                {
                  Local_storage().get("_utk") !== "" ?
                    <div className="navigation--button">
                      <PrimaryBtn fs="12px" pd="5px" fw="500" txt="Dashboard" onClick={() => navigate("/dashboard")} bg="var(--main)" txtColor="#FFFFF" hoverBG="var(--main)" />
                    </div>
                    :
                    <div className="navigation--button">
                      <PrimaryBtn className="loginbtn" fs="12px" pd="5px" fw="500" onClick={() => navigate("/login")} txt="Login" bg="var(--sub-main)" txtColor="var(--main)" hoverBG="#FFEFE0" />
                      <PrimaryBtn fs="12px" pd="5px" fw="500" txt="Sign up" onClick={() => navigate("/sign-up")} bg="var(--main)" txtColor="#FFFFF" hoverBG="var(--main)"/>
                    </div>
                }


              </div>
            </div>
          </header>
        </div>
      </div>



    </>
  );
}

export default NotFoundNavBar;
