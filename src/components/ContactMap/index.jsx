import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { MdLocationOn } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import map from "../../assets/map.png";

export default function ContactMap() {

const SendMail = ()=>{
   window.location.assign("mailto:support@createtribute.com");

}

const PhoneCall = ()=>{
  window.location.assign("tel:+234 815 785 3156");
}


  const Icontext = ({ icon, text1, text2 }) => (
    <div
      style={{
        display: "grid",
        gridGap: "15px",
        gridTemplateColumns: "25px 1fr",
        cursor: "pointer",
        width: "100%",
        alignItems: "center",
        marginBottom: "30px",
      }}
    >
      <span>{icon}</span>
      <div>
        <div
          style={{
            color: "var(--light-black)",
            lineHeight: "30px",
            cursor: "pointer",
          }}
        >
          <a
            style={{
              textDecoration: "none",
            }}
            href={text1?.startsWith("+") ? `tel:${text1}` : text1?.includes('@') ? `mailto:${text1}` : null  }
          >
            {" "}
            {text1}
          </a>
        </div>
        <div
          style={{
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
           <a
            style={{
              textDecoration: "none",
            }}
            href={text2?.startsWith("+") ? `tel:${text2}` : text2?.includes('@') ? `mailto:${text2}` : null  }
          >
            {" "}
            {text2}
          </a>
        </div>
      </div>
    </div>
  );
  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardMedia component="img" alt="map" height="300" image={map} />
      <CardContent style={{ padding: "50px 20px" }}>
        <Icontext
          icon={<MdLocationOn color="var(--main)" size={32} />}
          text1="13/147 Bill Ferguson Circuit Bonner ACT 2914 Australia"
        />
        <Icontext
          icon={<IoCall onClick={PhoneCall} color="var(--main)" size={32} />}
          text1="+234 815 785 3156"
          text2="+61 491 043 431"
        />

        <Icontext
          icon={<IoMdMail onClick={SendMail} color="var(--main)" size={32} />}
          text1="info@createtribute.com"
          text2="support@createtribute.com"
        />
      </CardContent>
    </Card>
  );
}
