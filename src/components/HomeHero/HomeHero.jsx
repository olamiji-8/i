import React from "react";
import './Home.css'
import Image from "../../assets/Image.svg";
import PrimaryBtn from "../Buttons/PrimaryBtn";
import BackgroundImage from '../../assets/BackgroundImage.png'
import { useNavigate } from "react-router-dom";
import { Local_storage } from "../../utils/LocalStorageConfig";

function HomeHero() {
  let navigate = useNavigate();
  return (
        <div className="containered" id="containered"  style={{ backgroundImage: `url(${BackgroundImage})` }}>
          <div className="home_max_width">
            
            <div className="hero_home_page">
              
              <div className="main--content"  >
                <h1 className="headline">Celebrate the life of loved ones</h1>
                <p className="description">
                  Create beautiful memories of your loved ones, share stories,
                  photos, send condolences and write tributes to preserve their
                  legacies.
                </p>

              <div className="showMobile">
              <PrimaryBtn 
                
                txt="Create A Memorial" 
                bg="var(--main)" 
                txtColor="#FFFFF" 
                w="180px"
                pd="6px" 
                fs="16px"
                fw="400"
                hoverBG="#ba5904" 
                onClick={()=>{
                  Local_storage().get("_utk") !== ""  ?
                  navigate('/create-memorial')
                  :
                  navigate('/sign-up')
                }}
              />
            </div>
            <div className="showDesktop">
              <PrimaryBtn 
                txt="Create A Memorial" 
                bg="var(--main)" 
                txtColor="#FFFFF" 
                w="220px"
                pd="12px" 
                fs="18px"
                fw="400"
                hoverBG="#ba5904" 
                onClick={()=>{
                  Local_storage().get("_utk") !== ""  ?
                  navigate('/create-memorial')
                  :
                  navigate('/sign-up')
                }}
              />
            </div>
               
              </div>

              <div className="main--img">
                <img alt="Img_tag" src={Image} className="hero_image" />
                {/* <img src="https://api.createtribute.com/storage/deceased/pictures/shettima-boko844.png" alt="" /> */}
              </div>
            </div>
          </div>
        </div>
  );
}

export default HomeHero;
