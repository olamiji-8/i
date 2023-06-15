import React, { useEffect, useState } from "react";
import "./SideMenu.css";
import { useDashboardContext } from "../contexts/DashboardContext/Dashboard";
import { useNavigate } from "react-router-dom";
import Dashboardicon from "../assets/Dashboardicon.png"
import Memorialsicon from "../assets/Memorialsicon.png";
import Managememorial from "../assets/Managememorial.svg";
import tributeicon from "../assets/tributeicon.svg";
import Managestoriesicon from "../assets/Managestoriesicon.svg";
import Paymenticon from "../assets/Paymenticon.svg";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import Avatar from "../assets/Avatar.svg";
import Avatar2 from "../assets/Avatar2.svg";

const SideMenu = ({arrowclick, setarrowclick}) => {

  const navigate = useNavigate()

  const SideData = [
    {
      Title: "Dashboard",
      number: "",
      path: "/dashboard",
      icon: Dashboardicon,
    },
    {
      Title: "Memorials",
      number: "",
      path: "/memorials",
      // path: "/user/memorials",
      icon: Memorialsicon,
    },
    {
      Title: "Manage Memorials",
      number: '0',
      arrowup: <MdKeyboardArrowUp />,
      arrowdown: <MdKeyboardArrowDown />,
      icon: Managememorial,
    },
    {
      Title: "Manage Tributes",
      number: "",
      icon: tributeicon,
      path: "/manage-tributes",
    },
    {
      Title: "Manage Stories",
      number: "",
      icon: Managestoriesicon,
      path: "/manage-stories",
    },
    {
      Title: "Payment",
      number: "",
      icon: Paymenticon,
      path: "/payment",
    },
  ];

  const { dashdata } = useDashboardContext();

  const handleArrowClick = () => {
    setarrowclick(!arrowclick)
  }

  return (
    <div className="sidebar__body">
      {SideData?.map((x, i) => {
        return (
          <div className = {x.Title === 'Manage Memorials'? "sidebar__main_manage":""}>
          <div onClick={()=> x.path !== undefined ? navigate(`${x?.path}`) : handleArrowClick()} key={i} className = "sidebar__main">
            <div className="sidebar__icon"   >
              <img src={x?.icon} alt={x?.Title} className="sidebar__icons" />
            </div>

            <div className="sidebar__title_and__sub__title">
              <div className="sidebar__titles">
                <div className="sidebar__title">
                  <p className="sidebar__title__main">{x.Title}</p>
                </div>

                <div className="sidebar__arrow">
                  <p className="sidebar__arrowup__main">{arrowclick ? x.arrowup : x.arrowdown}</p>
                </div>

                <div className="sidebar__count">
                  <p className={`${x.number !== "" ? "sidebar__count__main" : "sidebar__count__empty"}  `}>
                    { x.number !== ""  ? dashdata?.data?.user_memorials?.length : ""}
                  </p>
                </div>
              </div>
            </div>
            
          </div>
          <div className="sub__titless">
                {
                  arrowclick && x?.arrowup && dashdata?.data?.user_memorials?.length !== 0 ?
                    <div >

                      {
                        dashdata?.data?.user_memorials?.map((x, i) => {
                          return (
                            <div key={i} className="submenu__details" onClick={()=> window.open(`/edit-memorial/${x?.slug}`, "_blank",   localStorage.setItem('testObject', JSON.stringify(x)))}>
                              {/* <img  src={x?.image} alt="Avatar" /> */}
                              <div className="submenu__avatar"><img className="image_tribute" src={x?.image} alt="Avatar" /></div>
                              <div className="submenu__name">{x?.fullname}</div>

                            </div>
                          )
                        })
                      }

                    </div>

                    : null
                }

              </div>
          </div>
        );
      })}
    </div>
  );
};

export default SideMenu;
