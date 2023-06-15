import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import GoogleBtn from '../../components/Buttons/GoogleBtn'
import InputField from '../../components/InputField/InputField'
import CountrySelector from '../../components/InputField/CountrySelector'
import "./SignUp.css"
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { MdVisibility } from "react-icons/md";
import { AiFillEyeInvisible } from "react-icons/ai"
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PrimaryBtn from '../../components/Buttons/PrimaryBtn'
import { useNavigate } from 'react-router-dom'
import { useRegisterUser } from '../../api/useRegisterUser'
import PhoneInput from 'react-phone-number-input'
import SuccessPopup from '../../components/SuccessPopup'
import ErrorPopup from '../../components/SuccessPopup/ErrorPopup'
import Union from '../../assets/Union.svg'
import Logowhite from "../../assets/Logowhite.png";
import { parsePhoneNumber, isValidPhoneNumber } from 'react-phone-number-input'
import { ClipLoader } from 'react-spinners'
import Ctblogo from "../../assets/Ctblogo.png";
import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios";
import { Axios } from '../../utils/Axios'
import Swal from "sweetalert2";
import Loading from "../../components/Loading";
import { Local_storage } from "../../utils/LocalStorageConfig";
import { FacebookProvider, LoginButton } from 'react-facebook';


function SignUp() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    let navigate = useNavigate()
    const [showPassword, setshowPassword] = useState(false)
    const [showCPassword, setshowCPassword] = useState(false)
    const [country, setCountry] = useState("")
    const [value, setValue] = useState();
    const [isRegError, setisRegError] = useState(false)
    const [isRegSuccess, setisRegSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [countryErr, setcountryErr] = useState(false)
    const [phoneErr, setphoneErr] = useState(false)

    const schema = yup.object().shape({
        first_name: yup.string().required("Firstname is required").matches(/^[aA-zZ\s]+$/, "Can't contain number or special character"),
        last_name: yup.string().required("Lastname is required").matches(/^[aA-zZ\s]+$/, "Can't contain number or special character"),
        email: yup
            .string()
            .matches(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/, "Valid email is required")
            .required("Email is required"),
        password: yup.string().required("Password is required"),
        password_confirmation: yup
            .string()
            .oneOf([yup.ref("password"), null], "Password mismatch!")
            .required("Required"),
    });

    const { control, getValues, handleSubmit, formState: { errors } } = useForm({
        mode: 'all',
        resolver: yupResolver(schema),
    });

    const handleCloseError = () => {
        setisRegError(false)
    }
    const handleClose = () => {
        setisRegSuccess(false)
        navigate('/verify-account', {
            state: {
                email: getValues('email'),
                from: "fromsignup"
            }
        }
        )
    }

    const onSuccess = () => {
        setisRegSuccess(true)
    }

    const onError = (error) => {
        setErrorMessage(error.response.data.message)
        setisRegError(true)
    }

    const { mutate: RegisterUser, isLoading } = useRegisterUser(onSuccess, onError)

    const handleSignUp = async (data) => {

        if (country === "") {
            setcountryErr(true)
        }
        else if (value === undefined || !isValidPhoneNumber(value)) {
            setphoneErr(true)
        }
        else {
            setphoneErr(false)
            data.country = country
            data.phone = value
            RegisterUser(data)
        }
        console.log(data)
    }


    const login = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            await new Promise(resolve => {
              const xhr = new XMLHttpRequest();
      
              xhr.open('GET', `https://www.googleapis.com/oauth2/v3/userinfo`);
              xhr.setRequestHeader('Authorization', `Bearer ${codeResponse.access_token}`)
              xhr.onload = function () {
                if (this.status >= 200 && this.status < 300)
                  resolve(JSON.parse(this.responseText));
                else resolve({ err: '404' });
              };
              xhr.send();
            })
              .then((res) => {
                proceedToLogin(res)
              })
              .catch((err) => console.log(err, 'error'))
          },
    });

    const [socialLogining, setsocialLogining] = useState(false)

    const proceedToLogin = (response) => {
        setsocialLogining(true)

        Axios.post('/user/oauth/register', {
            "provider": "google",
            "google_id": response?.sub,
            "email": response?.email,
            "name": response?.name,
        }).then((res) => {
            Local_storage().set("_utk", res?.data?.data?.token)
            Local_storage().set("_eml", res?.data?.data?.user?.email)
            Local_storage().set("_count", "Nigeria")
            navigate('/dashboard')
        })
            .catch((err) => {
                console.log(err.response.data.message)
                if(
                    err?.response?.data?.message.includes("The email has already been taken.")
                    ||
                    err?.response?.data?.message.includes("The google id has already been taken")
                    ||
                    err?.response?.data?.message.includes("The facebook id has already been taken")
                )
                {
                    Swal.fire({
                        icon: "error",
                        iconColor: 'var(--main)',
                        text: `User already exist proceed to login`,
                        confirmButtonColor: "var(--main)",
                    }).then(() => {
                        navigate('/login')
                    })
                }
                
               
            })
            .finally(() => {
                setsocialLogining(false)
            })
    }

    function handleSuccess(response) {
        console.log(response.status);
      }
    
      function handleError(error) {
        console.log(error);
      }
    


    return (
        <div>
            <div className='signup_container'>
                {
                    socialLogining &&
                    <Loading />
                }
                <div className="signup_left">
                    <img className='object_logo' src={Logowhite} />
                    <div className="signup_textCont">
                        <h1>Celebrate the life of loved ones.</h1>
                    </div>
                    <object className='object_svg' data={Union} type="image/svg+xml" />
                </div>
                <div className="signup_right">

                    <div className="signup_right_container">
                    <div onClick={()=> navigate('/')} className="showMobile">
                        <img src={Ctblogo} alt="logo" className="mobilelogo" />
                    </div>
                        <div className="signup_head">
                            <h1>Sign up</h1>
                            <p>Already have an account? <span onClick={() => navigate('/login')}>Sign In</span> </p>
                        </div>
                        
                        <div className='signup_form_container'>
                            <form autoComplete='off' onSubmit={handleSubmit(handleSignUp)}>
                            <div className='addMarginMobile' style={{marginBottom:'30px'}}>
                            <Grid container spacing={2}>
                                <Grid item xs={5}>
                                    <GoogleBtn
                                        icon="google"
                                        txt="Continue With Google"
                                        onClick={() => login()}
                                    />
                                </Grid>
                                <Grid item xs={7}>
                                <FacebookProvider appId="617435849969522">
                                 
                                    <LoginButton
                                     scope="email"
                                     onError={handleError}
                                     onSuccess={handleSuccess}
                                     style={{border:"transparent", with:"100%", backgroundColor:"transparent"}}
                                    
                                    >
                                    <GoogleBtn
                                        icon="fb"
                                        txt="Continue With Facebook"
                                        
                                    />

                                    </LoginButton>
                                        </FacebookProvider>

                                </Grid>
                            </Grid>
                        </div>
                                <Grid container spacing={4}>
                                    <Grid item xs={12}>
                                        <Controller
                                            name="first_name"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <InputField
                                                    {...field}
                                                    error={errors.first_name}
                                                    type="text"
                                                    id="first_name"
                                                    label="First Name"
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Controller
                                            name="last_name"
                                            defaultValue=""
                                            control={control}
                                            render={({ field }) => (
                                                <InputField
                                                    {...field}
                                                    error={errors.last_name}
                                                    type="text"
                                                    id="last_name"
                                                    label="Last Name"
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Controller
                                            name="email"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <InputField
                                                    {...field}
                                                    error={errors.email}
                                                    type="email"
                                                    id="email"
                                                    label="Email"
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Controller
                                            name="country"
                                            defaultValue=""
                                            control={control}
                                            render={({ field }) => (
                                                <CountrySelector
                                                    {...field}
                                                    error={countryErr}
                                                    id="country"
                                                    label="Select country"
                                                    onChange={(e) => { setCountry(e.target.value); setcountryErr(false) }}
                                                    value={country}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        {/* <div className="inputcountry"> */}
                                        <PhoneInput
                                            international
                                            placeholder="Enter phone number"
                                            value={value}
                                            defaultCountry="NG"
                                            onChange={setValue}
                                        />
                                        {
                                            phoneErr ?
                                                <label className='error_label'>Valid phone number required</label>
                                                :
                                                null
                                        }

                                        {/* </div> */}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Controller
                                            name="password"
                                            defaultValue=""
                                            control={control}
                                            render={({ field }) => (
                                                <InputField
                                                    {...field}
                                                    error={errors.password}
                                                    type={showPassword ? "text" : "password"}
                                                    id="password"
                                                    label="Password"
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton onClick={() => setshowPassword(!showPassword)}>
                                                                {
                                                                    showPassword ?
                                                                        <AiFillEyeInvisible size={20} />
                                                                        :
                                                                        <MdVisibility size={20} />
                                                                }
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                />
                                            )}
                                        />
                                    </Grid>


                                    <Grid item xs={12}>
                                        <Controller
                                            name="password_confirmation"
                                            defaultValue=""
                                            control={control}
                                            render={({ field }) => (
                                                <InputField
                                                    {...field}
                                                    error={errors.password_confirmation}
                                                    type={showCPassword ? "text" : "password"}
                                                    id="password_confirmation"
                                                    label="Confirm Password"
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton onClick={() => setshowCPassword(!showCPassword)}>
                                                                {
                                                                    showCPassword ?
                                                                        <AiFillEyeInvisible size={20} />
                                                                        :
                                                                        <MdVisibility size={20} />
                                                                }
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
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
                                            txt={isLoading ? <ClipLoader color="white" loading={isLoading} speedMultiplier={1} size={20} /> : "SIGN UP"}
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
                open={isRegError}
                close={handleCloseError}
                tryAgain={() => console.log('try aggain')}
                title="Error"
                message={`Oppz! ${errorMessage}`}
            />
        </div>
    )
}

export default SignUp