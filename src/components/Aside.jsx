import React, { useState } from "react";
import Role from "../pages/MainDashboard/Role";
import SideMenu from "../pages/SideMenu";

import { useDashboardContext } from "../contexts/DashboardContext/Dashboard";
import dashboardlogo from "../assets/dashboardlogo.svg";
import { useNavigate } from "react-router-dom";
import Logout from "../assets/Logout.svg";

import "./Aside.css";
import { Local_storage } from "../utils/LocalStorageConfig";
import { Capitalizer } from "../utils/Capitalizer";
import RoleV2 from "../pages/MainDashboard/RoleV2";
import { useGetDashboard } from "../api/useDashboard";
import DialogClickout from "./DialogClickout";
import AuthAxios from "../utils/AuthAxios";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";

function Aside() {
  useGetDashboard();

  const [showlogout, setShowLogout] = useState(false);

  const { dashdata } = useDashboardContext();

  const [isActive, setActive] = useState(false);

  const Toggle = () => {
    setActive(!isActive);
  };
  const [logingOut, setlogingOut] = useState(false);

  const logMeOut = async () => {
    setlogingOut(true);

    await AuthAxios.get(`/user/logout`).finally(() => {
      setlogingOut(false);
      navigate("/");
      Local_storage().remove("_utk");
      Local_storage().remove("_count");
      localStorage.clear()
    });
  };

  let navigate = useNavigate();

  const [arrowclick, setarrowclick] = useState(false);

  const FireLogout = () => {


    Swal.fire({
      // title: 'Are you sure?',
      text: "Are you sure you want to logout?",
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FF7900',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes'
    }).then((result) => {
      // logMeOut()

      <ClipLoader
        color="white"
        loading={logingOut}
        speedMultiplier={1}
        size={16}
      />
      if (result.isConfirmed) {


        logMeOut();
      }
    })


    // Swal.fire({
    //   title: "Are you sure you want to logout?",
    //   showDenyButton: true,
    //   confirmButtonText: `${
    //     logingOut ? (
    //       <ClipLoader
    //         color="white"
    //         loading={logingOut}
    //         speedMultiplier={1}
    //         size={16}
    //       />
    //     ) : (
    //       "Yes"
    //     )
    //   }`,
    //   denyButtonText: `No`,
    // }).then((result) => {

    //   if (result.isConfirmed) {

    //     console.log(result);
    //     logMeOut();
    //   } else if (result.isDenied) {

    //     console.log(result);
    //   }
    // });

  };

  // if(logingOut) {
  //   return (
  //   <BackDrop open={logingOut}/>
  //   )
  // }

  return (
    <>
      <div>
        <div className="sidenav__logo">
          <img
            src={dashboardlogo}
            alt="dashboardlogo"
            className="sidenav__top__logo"
            onClick={() => navigate("/")}
          />
        </div>

        <Role
          className="role__main__name"
          initial={
            `${dashdata?.data?.user_details?.first_name
              ?.charAt(0)
              .toUpperCase()}` +
            `${dashdata?.data?.user_details?.last_name
              ?.charAt(0)
              .toUpperCase()}`
          }
          name={
            `${Capitalizer(dashdata?.data?.user_details?.first_name)}` +
            " " +
            `${dashdata?.data?.user_details?.last_name}`
          }
          role={`${Capitalizer(dashdata?.data?.user_details?.role)}`}
          onClick={() => navigate("/profile")}
          edit
        />
        <SideMenu arrowclick={arrowclick} setarrowclick={setarrowclick} />
        <RoleV2
          className="role__main__name"
          initial="+"
          role="Create memorial"
          onClick={() => navigate("/create-memorial")}
        />
        <div
          onClick={
            // () => {
            // setShowLogout(true)
            //   }
            FireLogout
          }
          className="role__logout"
          style={{ position: arrowclick ? "static" : "" }}
        >
          <div className="role__logout_icon">
            <img src={Logout} alt="Logout" className="role__icon" />
          </div>

          <div className="role__logout__text">
            <p className="logout__text">Logout</p>
          </div>
        </div>
      </div>

      <DialogClickout
      // open={showlogout}
      // handleClose={() => setShowLogout(false)}
      >
        {/* <div style={{ width: '100%', padding: "30px 30px 20px 30px" }}>
          <div style={{ width: '100%', marginBottom: "30px", fontSize: '13px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span>Are you sure you want to logout?</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
            <div className="disBtn" style={{ width: '50px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}
              onClick={() => setShowLogout(false)} >
              No
            </div>
            <div className="ediBtn" style={{ width: '50px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', color: 'white', backgroundColor: '#808080', border: '1px solid #808080' }}
              onClick={()=>{
                logMeOut()
              }}>
                {
                  logingOut ?
                  <ClipLoader color="white" loading={logingOut} speedMultiplier={1} size={16} />
                  :
                  <>Yes</>
                }

            </div>
          </div>
          </div>  */}
      </DialogClickout>
    </>
  );
}

export default Aside;
