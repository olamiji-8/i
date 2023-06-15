import React, { useContext, useEffect, useState } from "react";
import "./Dashboard.css";
import "./managetribute.css";
import DataTable from './DataTable.tsx'

import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Aside from "../../components/Aside";
import { usePaymentContext } from "../../contexts/PaymentContext/PaymentContext";
import { useGetPaymentLog } from "../../api/useGetPayment";
import BackDrop from "../../components/BackDrop";
import EmptyMemorial from "./EmptyMemorial";


function Payment() {

  useEffect(() => {
    window.scrollTo(0, 0)
    // console.log(paymentLog, "Paymentlog")
  }, [])

  const [isActive, setActive] = useState(false);
  const Toggle = () => {
    setActive(!isActive);
  };

  const { paymentLog } = usePaymentContext();

  const { isLoading, error, isError } = useGetPaymentLog()

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
          <AiOutlineCloseCircle />
        </div>

        <Aside onClick={Toggle} />
      </aside>

      <section style={{
        height: "100vh"
      }} className="main">
        <div className="body_body">

          <h1>Payment Log</h1>
          {
            paymentLog?.data?.length === 0 ?
              <div>
                <EmptyMemorial />
              </div>
              :
              <DataTable log={paymentLog} />
          }
        </div>

      </section>


    </div>
  )
}

export default Payment