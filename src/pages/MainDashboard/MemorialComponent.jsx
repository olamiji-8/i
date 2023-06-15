import React, { useEffect } from "react";
import "./MemorialComponent.css";
import Totalicon from "../../assets/Totalicon.svg";
import activeicon from "../../assets/activeicon.svg";
import Expiredicon from "../../assets/Expiredicon.svg";
import Dangericon from "../../assets/Dangericon.svg";
import { useDashboardContext } from "../../contexts/DashboardContext/Dashboard";

function MemorialComponent() {

  const { dashdata} = useDashboardContext();

  const data_ = [
    {
      title: "Total Memorials",
      number: dashdata?.data?.total_memorials,
      icon: <img src={Totalicon} alt="TotalIcon" />,
      total: 0,
    },
    {
      title: "Active Memorials",
      number: dashdata?.data?.active_memorials,
      icon: <img src={activeicon} alt="activeicon" />,
      active: 0,
    },

    {
      title: "Expiring Soon",
      number: dashdata?.data?.expiring_soon,
      icon: <img src={Dangericon} alt="expiringicon" />,
      expiring: 0,
    },
    {
      title: "Expired Memorials",
      number: dashdata?.data?.expired_memorials,
      icon: <img src={Expiredicon} alt="expiringicon" />,
      expired: 0,
    },
  ];

  return data_.map((x, i) => {
    return (
      <div key={i} className={`${ x.total ? "memorial_main_total" : "memorial_main_"  }`}>
        <div className="memorialcomponent">
          <div className="memorial__title">
            <p className="memorial_paragraph" >{x.title}</p>
          </div>
          <div className="memorial_count_icon">
            <div className={`${ x.title === "Total Memorials" ? "count__memorial_total" : x.active === 0 ? "count__memorial_active" :  x.expiring === 0 ? "count__memorial_expiring" : x.expired === 0 ? "count__memorial_expired"       : "count__memorial"  }`}    >{x.number}</div>
            <div className="icon__memorial">{x.icon}</div>
          </div>
        </div>
      </div>
    );
  });
}

export default MemorialComponent;
