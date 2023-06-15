import React from "react";
import "./HowItWorks.css";
import SetpsGroup from '../../assets/SetpsGroup.svg'
import FeatureIconwithcircle from '../../assets/FeatureIconwithcircle.svg'



function HowItWorks() {
  return (
    <div>
      <div className="howitworksweb" id="howitworks"  >
        <div className="howitworks-container">
          <div className="howitworksdiv">
            <div className="howitworks-title">
              <h1 className="how-works-tag">How It Works</h1>
            </div>

            <div className="howitworksparagraph">
              <p className="howitworksparagraph">
                Create an online memorial in few easy steps
              </p>
            </div>
          </div>

        </div>

        <div className="howitworksicon">

          <div className="howicon">
            <img src={SetpsGroup} alt="icon" />
          </div>


          <div className="memorial-content-story">

            <div className="memorial">
              <p className="memerialtag">By adding basic or detailed information about your love one's</p>
            </div>

            <div className="content">

              <p className="contenttag">Including photos, life history and memorial song, etc</p>

            </div>

            <div className="story">
              <p className="storytag">And allow friends and family members share stories, images, and tribute messages</p>
            </div>


          </div>




        </div>
      </div>


      <div className="howitworksmobile">
        <div className="howitworkinnermobile">
          <div className="howitworks-title">
            <h1 className="how-works-tag">How It Works</h1>
          </div>

          <div className="howitworksparagraph">
            <p className="howitworksparagraph">
              Create an online memorial in few easy steps
            </p>
          </div>


          <div className="memorialcontentstory_">

            <div className="memorialmobile">
              <div className="memorialimage">
                <img src={FeatureIconwithcircle} alt="FeatureIconwithcircle" className="iconimagemobile" />
              </div>
              <div className="memorialcontent">
                <h1 className="memorialmobiletag">Create A Memorial</h1>
                <p className="memorialpartag">By adding basic or detailed information about your love one's</p>
              </div>


            </div>



            <div className="memorialmobile">
              <div className="memorialimage">
                <img src={FeatureIconwithcircle} alt="FeatureIconwithcircle" className="iconimagemobile" />
              </div>
              <div className="memorialcontent">
                <h1 className="memorialmobiletag">Add Unlimited Content</h1>
                <p className="memorialpartag">Including photos, life history and memorial song, etc</p>
              </div>


            </div>




            <div className="memorialmobile">
              <div className="memorialimage">
                <img src={FeatureIconwithcircle} alt="FeatureIconwithcircle" className="iconimagemobile" />
              </div>
              <div className="memorialcontent">
                <h1 className="memorialmobiletag">Share Their Life Story</h1>
                <p className="memorialpartag">And allow friends and family members share stories, images, and tribute messages</p>
              </div>


            </div>


          </div>




        </div>

      </div>

    </div>
  );
}

export default HowItWorks;
