import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';

import PrimaryBtn from '../Buttons/PrimaryBtn';
import { IoMdClose } from 'react-icons/io';

const SignedInBack = () => {
  let navigate = useNavigate();
  return (
    <AppBar style={{
      backgroundColor: "#ffffff",
      color: 'black'
    }} position="static">
      <Container maxWidth="xl" sx={{
        padding : "15px 20px",
        display: "flex",
        justifyContent:'space-between',
        alignItems:'center'
      }}>
        <PrimaryBtn pd="3px 15px" br="10px" txt="Back to dashboard" onClick={() => navigate("/dashboard")} bg="var(--main)" txtColor="#FFFFF" hoverBG="var(--main)" />

        <IoMdClose size={24} onClick={() => navigate("/dashboard")}/>
      </Container>
    </AppBar>
  );
};
export default SignedInBack;
