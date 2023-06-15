import React, { useEffect, useState} from 'react'
import { Grid } from '@mui/material'
import InputField from '../../components/InputField/InputField'
import "./SignUp.css"
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PrimaryBtn from '../../components/Buttons/PrimaryBtn'
import {useNavigate, useLocation} from 'react-router-dom'
import { useVerifyOTP } from '../../api/useRegisterUser'
import SuccessPopup from '../../components/SuccessPopup'
import ErrorPopup from '../../components/SuccessPopup/ErrorPopup'
import Union from '../../assets/Union.svg'
import Logowhite from "../../assets/Logowhite.png";
import { ClipLoader } from 'react-spinners';
import Swal from 'sweetalert2';
import TextFielded from '../../components/InputField/TextField';

function VerifyOTP() {
    useEffect(() => {
        window.scrollTo(0,0)
      }, [])
    let navigate = useNavigate()
    let location = useLocation();

    const [isRegError, setisRegError] = useState(false)
    // const [isRegSuccess, setisRegSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleCloseError = ()=>{
        setisRegError(false)
    }
    // const handleClose = ()=>{
    //     setisRegSuccess(false)
    //     navigate('/login', {
    //         state : {
    //            email : location?.state?.email
    //            }
    //        }
    //    )
    // }

    const schema = yup.object().shape({
        // email: yup
        //   .string()
        //   .matches(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/, "Valid email is required")
        //   .required("Valid email is required"),
        otp: yup
        .string()
        .required("Enter OTP")
        .min(6, "Must be exactly 6 digits")
        .max(6, "Must be exactly 6 digits")
        .matches(/^[0-9]*$/, "OTP can't contain alphabet")
    });

    const { control, handleSubmit, formState: { errors } } = useForm({
        mode: 'all',
        resolver: yupResolver(schema),
    });

    const onSuccess = ()=>{
        // setisRegSuccess(true)
        Swal.fire({
            icon: "success",
            iconColor: 'var(--main)',
            text: `Account verified`,
            confirmButtonColor: "var(--main)",
            confirmButtonText:'Continue',
            timer: 3000
        }).then(() => {
            if(location?.state?.from === "resetpassword"){
                navigate('/reset',{
                    state : {
                    email : location?.state?.email
                    }
                })
            }
            if(location?.state?.from === "fromsignup"){
                navigate('/login', {
                    state : {
                    email : location?.state?.email
                    }
                })
            }
        })
    }

    const onError = (error)=>{
        setErrorMessage(error.response.data.message)
        setisRegError(true)
    }

    const {mutate : verifyUser, isLoading} = useVerifyOTP(onSuccess, onError )

    const handleSubmitOTP = async (data)=>{
        verifyUser(data)
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
                    <div className="signup_head">
                        <h1>Verify your account</h1>
                        <p>An OTP as been sent to email  </p>
                    </div>
                   
                    <div className='signup_form_container' style={{marginTop:'60px'}}>
                        <form autoComplete='none' onSubmit={handleSubmit(handleSubmitOTP)}>
                            <Grid container spacing={6}>
                                <Grid item xs={12} style={{display:'none'}}>
                                    <Controller
                                        name="email"
                                        control={control}
                                        defaultValue={location?.state?.email}
                                        render={({ field }) => (
                                            <TextFielded
                                                {...field}
                                                defaultValue={location?.state?.email}
                                                error={errors?.firstname}
                                                type="text"
                                                id="email"
                                                label="Email"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="otp"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => (
                                            <TextFielded
                                                {...field}
                                                error={errors.otp}
                                                type="text"
                                                id="otp"
                                                label="OTP"
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
                                        txt={isLoading ? <ClipLoader color="white" loading={isLoading} speedMultiplier={1} size={20}/> : "Verify"}
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
        {/* <SuccessPopup 
            open={isRegSuccess} 
            close={handleClose} 
            title="Success"
            message="Account verified"
        /> */}
         <ErrorPopup
            open={isRegError} 
            close={handleCloseError} 
            tryAgain={handleCloseError}
            title="Error"
            message={`Oppz! ${errorMessage}`}
        />
       </div>
    )
}

export default VerifyOTP