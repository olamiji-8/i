import React, { useEffect } from "react";
import "./Navbar.css";
import Ctblogo from "../../assets/Ctblogo.png";
import PrimaryBtn from "../Buttons/PrimaryBtn";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Local_storage } from "../../utils/LocalStorageConfig";

function Navbar({ bgColor, mobilebgColor, iconColor }) {
  let navigate = useNavigate();
  const location = useLocation()

  return (
    <div>
      <div className="showDesktop">
        <div id="navbar_container" className="navbar_container floatingNav">
          <header style={{ background: bgColor }}>
            <div className="header-section">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  onClick={() => navigate("/")}
                  src={Ctblogo}
                  alt="logos"
                  className="logo"
                />
              </div>
              <nav className="navigation">
                <Link
                  to="/"
                  className="navigation--item"
                >
                  Home
                </Link>
                <Link to="/" className="navigation--item">
                  How It Works
                </Link>
                <Link to="/" className="navigation--item">
                  Pricing
                </Link>
                <Link to="/" className="navigation--item">
                  FAQ
                </Link>
                <Link to="/memorials" className={location.pathname === '/memorials' ? "navigation--item  navigation--item__active" : "navigation--item"}>
                  Memorials
                </Link>
                <Link to="/about-us" className={location.pathname === '/about-us' ? "navigation--item  navigation--item__active" : "navigation--item"}>
                  About Us
                </Link>
                <Link to="/contact-us" className={location.pathname === '/contact-us' ? "navigation--item  navigation--item__active" : "navigation--item"}>
                  Contact Us
                </Link>
              </nav>

              <div className="showDesktop">
                {
                  Local_storage().get("_utk") !== "" ?
                    <div className="navigation--button">
                      <PrimaryBtn
                        txt="Dashboard"
                        onClick={() => navigate("/dashboard")}
                        bg="var(--main)"
                        txtColor="#FFFFF"
                        hoverBG="var(--sub-main)"
                      />
                    </div>
                    :
                    <div className="navigation--button">

                      <PrimaryBtn
                        onClick={() => navigate("/login")}
                        txt="Login"
                        bg="var(--sub-main)"
                        txtColor="var(--main)"
                        hoverBG="#FFEFE0"
                      />
                      <PrimaryBtn
                        txt="Sign up"
                        onClick={() => navigate("/sign-up")}
                        bg="var(--main)"
                        txtColor="#FFFFF"
                        // hoverBG="var(--sub-main)"
                          hoverBG="var(--main)"
                      />
                    </div>
                }

              </div>
              <div className="showMobile">
                {
                  Local_storage().get("_utk") !== "" ?
                    <div className="navigation--button">

                      <PrimaryBtn
                        fs="12px"
                        pd="5px"
                        fw="500"
                        txt="Dashboard"
                        onClick={() => navigate("/dashboard")}
                        bg="var(--main)"
                        txtColor="#FFFFF"
                        hoverBG="var(--main)"
                      />
                    </div>
                    :
                    <div className="navigation--button">
                      <PrimaryBtn
                        fs="12px"
                        pd="5px"
                        fw="500"
                        onClick={() => navigate("/login")}
                        txt="Login"
                        bg="var(--sub-main)"
                        txtColor="var(--main)"
                        hoverBG="#FFEFE0"
                      />
                      <PrimaryBtn
                        fs="12px"
                        pd="5px"
                        fw="500"
                        txt="Sign up"
                        onClick={() => navigate("/sign-up")}
                        bg="var(--main)"
                        txtColor="#FFFFF"
                        hoverBG="var(--main)"
                      />
                    </div>
                }

              </div>
            </div>
          </header>
        </div>
      </div>

      <div className="showMobile">
        <div className="navbar_container">
          <header style={{ background: mobilebgColor }}>
            <div className="header-section">
            <div style={{ display: 'flex', alignItems: 'center' }}>

              <div className="hambugerr">
                <Sidebar iconColor={iconColor} />
              </div>
              <img
                onClick={() => navigate("/")}
                src={Ctblogo}
                alt="logo"
                className="logo"
              />
              </div>
              <nav className="navigation">
                <Link
                  to="/"
                  className="navigation--item  navigation--item__active "
                >
                  Home
                </Link>
                <Link to="/" className="navigation--item">
                  How It Works
                </Link>
                <Link to="/" className="navigation--item">
                  Pricing
                </Link>
                <Link to="/" className="navigation--item">
                  FAQ
                </Link>
                <Link to="/memorials" className="navigation--item">
                  Memorials
                </Link>
                <Link to="/about-us" className="navigation--item">
                  About Us
                </Link>
                <Link to="/contact-us" className="navigation--item">
                  Contact Us
                </Link>
              </nav>

              <div className="showDesktop">
                {
                  Local_storage().get("_utk") !== "" ?
                    <div className="navigation--button">
                      <PrimaryBtn
                        txt="Dashboard"
                        onClick={() => navigate("/dashboard")}
                        bg="var(--main)"
                        txtColor="#FFFFF"
                        hoverBG="var(--sub-main)"
                        hoverColor="var(--main)"
                      />
                    </div>
                    :
                    <div className="navigation--button">
                      <PrimaryBtn
                        onClick={() => navigate("/login")}
                        txt="Login"
                        bg="var(--sub-main)"
                        txtColor="var(--main)"
                        hoverBG="#FFEFE0"
                      />
                      <PrimaryBtn
                        txt="Sign up"
                        onClick={() => navigate("/sign-up")}
                        bg="var(--main)"
                        txtColor="#FFFFF"
                        hoverBG="var(--sub-main)"
                        hoverColor="var(--main)"
                      />
                    </div>
                }
              </div>
              <div className="showMobile">
                {
                  Local_storage().get("_utk") !== "" ?
                    <div className="navigation--button">
                      <PrimaryBtn
                        fs="12px" pd="5px" bg="var(--main)" txtColor="#FFFFF" hoverBG="var(--main)" fw="500" txt="Dashboard"
                        onClick={() => navigate("/dashboard")}
                      />
                    </div>
                    :
                    <div className="navigation--button">
                      <PrimaryBtn
                        txt="Login" bg="var(--sub-main)" txtColor="var(--main)" hoverBG="#FFEFE0" fs="12px" pd="5px" fw="500"
                        onClick={() => navigate("/login")}
                      />
                      <PrimaryBtn
                        fs="12px" pd="5px" fw="500" txt="Sign up" bg="var(--main)" txtColor="#FFFFF" hoverBG="var(--main)"
                        onClick={() => navigate("/sign-up")}
                      />
                    </div>
                }
              </div>
            </div>
          </header>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
