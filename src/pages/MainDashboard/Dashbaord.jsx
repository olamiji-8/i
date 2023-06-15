import React, { useContext, useEffect, useState } from "react";
import "./Dashboard.css";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import MemorialBtn from "./MemorialBtn";
import MemorialComponent from "./MemorialComponent";
import EmptyMemorial from "./EmptyMemorial";
import ExistingMemorials from "./ExistingMemorials";
import { useNavigate } from "react-router-dom";
import Aside from "../../components/Aside";
import { Capitalizer } from "../../utils/Capitalizer";
import { useGetDashboard } from "../../api/useDashboard";
import { useDashboardContext } from "../../contexts/DashboardContext/Dashboard";
import BackDrop from "../../components/BackDrop";


function Dashbaord() {

  const { isLoading, data, error, isError } = useGetDashboard()

  const { dashdata } = useDashboardContext();

  const [search, setSearch] = useState('')

  const handelSearch = (e) => {
    setSearch(e.target.value)
  }

  let navigate = useNavigate();
  const [isActive, setActive] = useState(false);

  const Toggle = () => {
    setActive(!isActive);
  };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (isLoading) {
    return (
      <BackDrop open={isLoading} />
    )
  }

  return (
    <div className="grid-container">
      <div className="menu-icon" onClick={Toggle}>
        <AiOutlineMenu className="header__menu" />
      </div>

      <aside className={` sidenav ${isActive ? " active" : null}`}>
        <div onClick={Toggle} className="sidenav__close-icon-" >
          <AiOutlineCloseCircle size={28} />
        </div>

        <Aside onClick={Toggle} />

      </aside>

      <section className="main">
        <div className="main__header">
          <section className="main__name__btn">

            <div className="main__tag">
              <h1 className="main_name">Hello {Capitalizer(`${dashdata?.data?.user_details?.first_name}`)}</h1>
            </div>

            <div className="main_memorial">
              <MemorialBtn
                className="memorialbtn"
                icon="+"
                text="Create Memorial"
                OnClick={() => navigate("/create-memorial")}
              />
            </div>


          </section>
        </div>

        <div className="memorial__cards">
          <MemorialComponent />
        </div>

        <div className="memorials__title">
          <div className="memorial_main_tag">
            <p className="memorial_tag">Memorials</p>
            <span className="memorial_text">
              Here are memorials you have created
            </span>
          </div>
        </div>
        {data?.data?.user_memorials?.length <= 0 ?
          <EmptyMemorial /> :
          <ExistingMemorials data={dashdata?.data?.user_memorials} />
        }
      </section>
    </div>
  );
}

export default Dashbaord;
