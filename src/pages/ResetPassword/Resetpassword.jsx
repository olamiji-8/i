import React, {useEffect, useState} from 'react'
import { Grid } from '@mui/material'
import InputField from '../../components/InputField/InputField'
import "../SignUp/SignUp.css"
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PrimaryBtn from '../../components/Buttons/PrimaryBtn'
import {useNavigate, useLocation} from 'react-router-dom'
import SuccessPopup from '../../components/SuccessPopup'
import ErrorPopup from '../../components/SuccessPopup/ErrorPopup'
import Union from '../../assets/Union.svg'
import Logowhite from "../../assets/Logowhite.png";
import { useResetPass } from '../../api/useResetPass';
import { ClipLoader } from 'react-spinners';



function Resetpassword() {

    useEffect(() => {
        window.scrollTo(0,0)
      }, [])
      
    let navigate = useNavigate()
    let location = useLocation();
    const [submitting, setsubmitting] = useState(false)

    const [username, setusername] = useState('');
    const [email, setemail] = useState('');

    const [isLoginError, setisLoginError] = useState(false);
    const [isLoginSuccess, setisLoginSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isRegSuccess, setisRegSuccess] = useState(false)
    
    const schema = yup.object().shape({
        email: yup
        .string()
        .matches(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/, "Valid email is required")
        .required("Valid email is required"),
        password: yup.string().required("Password is required"),
        password_confirmation: yup
        .string()
        .oneOf([yup.ref("password"), null], "Password mismatch!")
        .required("Required"),
    });

    const {
    getValues,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  

  const onSuccess = (data) => {
    setisLoginSuccess(true);
    navigate('/login')
  };

  const onError = (error) => {
    setErrorMessage(error?.response?.data?.message);
    setisLoginError(true);
  };

  const handleCloseError = () => {
    setisLoginError(false);
  };

  const handleClose = ()=>{
    setisRegSuccess(false)
}

 

  const { mutate: Confirmpassword, isLoading } = useResetPass(onSuccess, onError);


  const handleLogin = async (data) => {
        Confirmpassword(data);
    }

    return (
       <div>
           <div className='signup_container'>
            <div className="signup_left">
                <img className='object_logo' src={Logowhite}/>
                <div className="signup_textCont">
                    <h1>Celebrate the life of loved ones.</h1>
                </div>
                <object className='object_svg' data={Union} type="image/svg+xml"/>
            </div>
            <div className="signup_right">
                <div className="signup_right_container">
                    <div className="signup_head" style={{marginBottom:'50px'}}>
                        <h1>Set your new password</h1>
                        {/* <p>An OTP as been sent to email  </p> */}
                    </div>
                   
                    <div className='signup_form_container' style={{marginTop:'60px'}}>
                        <form autoComplete='none' onSubmit={handleSubmit(handleLogin)}>
                            <Grid container spacing={6}>
                                <Grid item xs={12}>
                                    <Controller
                                        name="email"
                                        control={control}
                                        defaultValue={location?.state?.email}
                                        render={({ field }) => (
                                            <InputField
                                                {...field}
                                                defaultValue={location?.state?.email}
                                                error={errors?.email}
                                                type="text"
                                                id="email"
                                                label="Email"
                                                readOnly={true}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="password"
                                        control={control}
                                        // defaultValue={location?.state?.email}
                                        render={({ field }) => (
                                            <InputField
                                                {...field}
                                                // defaultValue={location?.state?.email}
                                                error={errors?.password}
                                                type="password"
                                                id="password"
                                                label="Password"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="password_confirmation"
                                        control={control}
                                        // defaultValue={location?.state?.email}
                                        render={({ field }) => (
                                            <InputField
                                                {...field}
                                                // defaultValue={location?.state?.email}
                                                error={errors?.password_confirmation}
                                                type="password"
                                                id="password_confirmation"
                                                label="Confirm Password"
                                            />
                                        )}
                                    />
                                </Grid>
                                
                                <Grid item xs={12}>
                                    <PrimaryBtn
                                        type="submit"
                                        txtColor="White"
                                        pd="11px"
                                        br="10px"
                                        w="100%"
                                        bg="var(--main)"
                                        hoverBG="var(--main)"
                                        txt={isLoading ? <ClipLoader color="white" loading={isLoading} speedMultiplier={1} size={20}/> : "Save"}
                                        fw="700"
                                        fs="17px"
                                    />
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </div>

            </div>
        </div>
       
    <SuccessPopup 
            open={isRegSuccess} 
            close={handleClose} 
            title="Success"
            message="Registration successfully"
        />

    <ErrorPopup
        open={isLoginError}
        close={handleCloseError}
        tryAgain={() => console.log("try aggain")}
        title="Error"
        message={`Oppz! ${errorMessage}`}
      />
       </div>
    )
}

export default Resetpassword