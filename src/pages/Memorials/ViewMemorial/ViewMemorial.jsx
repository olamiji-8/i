import React, { useContext, useEffect, useState } from "react";
import { useViewMemorial } from "../../../api/useMemorial";
import Navbar from "../../../components/Navbar/Navbar";
import ViewBody from "../../../components/ViewBody/ViewBody";
import ViewHeader from "../../../components/ViewHeader/ViewHeader";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Local_storage } from "../../../utils/LocalStorageConfig";
import SignedInNavbar from "../../../components/Navbar/SignedInNavbar";
import SignedInBack from "../../../components/Navbar/SignedInBack";
import BackDrop from "../../../components/BackDrop";
import { useLocation } from "react-router-dom";
import { useGetIPContext } from "../../../contexts/GetIPAddress/GetIP";
import { useGetIP } from "../../../api/useGetIP";
import axios from "axios";
import OverLayHeader from "../../../components/OverLayHeader/OverLayHeader";
import { Helmet } from "react-helmet";
import { Axios } from "../../../utils/Axios";
// import { IPContext } from '../../../contexts/GetIPAddress/NewIp'
// import { useGetIP } from '../../../api/useGetIP'

function ViewMemorial() {
  let location = useLocation();

  const Retrived = Local_storage()?.get("nodi");
  const [state, setState] = useState();
  var retrievedObject = localStorage.getItem("testObject");
  const [ip, setIp] = useState();
  const [calling, setcalling] = useState(true);
  const { uuid } = useParams();

  const [activeTab, setactiveTab] = useState("About");
  const [memorial, setMemorial] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setcalling(true);

    // var requestOptions = {
    //   method: "GET",
    //   redirect: "follow",
    // };

    // var myHeaders = new Headers();
    // myHeaders.append("", "");

    var requestOptions = {
      method: 'GET',
      // headers: myHeaders,
      redirect: 'follow'
    };

    // var FormData = require('form-data');
    // var data = new FormData();

    // var config = {
    //   method: 'get',
    //   url: 'https://api.createtribute.com/api/memorial/abraham-babalola-borishade-232?ip_address=62.173.42.74',
    //   headers: {
    //     'Api-Token': '1|EUyBmMBNkcUmjqo2C0WVDQiMaDz0sUzPaXY',
    //     'Accept': 'application/json',
    //     ...data.getHeaders()
    //   },
    //   data: data
    // };


    fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.REACT_APP_IPLOCATIONAPI}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setcalling(true);
        // console.log(result, "resultttttt");
        if (result?.ip !== "") {
          // console.log(result?.ip, 'result?.IPv4, ipp')
          // axios.get(`/memorial/${uuid}?${result?.ip}`)
          axios.get(`https://api.createtribute.com/api/memorial/${uuid}?ip_address=${result?.ip}`)
            .then((res) => {
              if (res.status === 200) {
                // console.log(res, "resssss");
                setMemorial(res?.data?.data);
                setcalling(false);
              }
            })
            .catch((error) => console.log("error", error),);
        }
      })
      .catch((error) => console.log("error", error),);
  }, [uuid]);

  if (calling) {
    return <BackDrop open={calling} />;
  }

  return (
    <div>
      {calling ? (
        <BackDrop open={calling} />
      ) : (
        <>
          {/* <OverLayHeader title="Tribute Page" /> */}
          {console.log(memorial, "memorial")}
          <Helmet>
            <title>{memorial?.fullname} - Create Tribute</title>
          </Helmet>
          {Local_storage().get("_utk") === "" ? (
            <Navbar mobilebgColor="white" bgColor="white" iconColor="#76797F" />
          ) : (
            <SignedInBack />
          )}
          <div>
            {/* { console.log(getallips, 'ipdataaaaaaa')} */}

            {Local_storage().get("_utk") === "" ? (
              <div style={{ height: "70px" }}></div>
            ) : null}
            <ViewHeader
              image={memorial?.image}
              name={memorial?.fullname}
              date={
                moment(memorial?.date_of_birth).format("DD/MM/YYYY") +
                " - " +
                moment(memorial?.date_of_death).format("DD/MM/YYYY")
              }
              activeTab={activeTab}
              setactiveTab={setactiveTab}
            />
            <ViewBody memorial={memorial} activeTab={activeTab} />
          </div>
        </>
      )}
    </div>
  );
}

export default ViewMemorial;
