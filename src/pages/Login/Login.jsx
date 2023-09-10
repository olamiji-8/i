import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiFillEyeInvisible } from "react-icons/ai";
import { MdVisibility } from "react-icons/md";
import GoogleBtn from "../../components/Buttons/GoogleBtn";
import IconButton from "@mui/material/IconButton";
import { useForm, Controller } from "react-hook-form";
import "./Login.css";
import PrimaryBtn from "../../components/Buttons/PrimaryBtn";
import { useNavigate } from "react-router-dom";
import Union from "../../assets/Union2.svg";
import Logowhite from "../../assets/Logowhite.png";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoginUser } from "../../api/useLogin";
import ErrorPopup from "../../components/SuccessPopup/ErrorPopup";
import { Link } from "react-router-dom";
import { Local_storage } from "../../utils/LocalStorageConfig";
import { ClipLoader } from "react-spinners";
import TextFielded from "../../components/InputField/TextField";
import Ctblogo from "../../assets/Ctblogo.png";
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
// import FacebookLogin from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import axios from "axios";
import { Axios } from '../../utils/Axios'
import Swal from "sweetalert2";
import Loading from "../../components/Loading";


function Login() {




  useEffect(() => {
    window.scrollTo(0, 0)
    setValue('email', Local_storage().get("rem_me") !== '' ?
      JSON.parse(Local_storage().get("rem_me"))?.username
      :
      "")

    setValue('password', Local_storage().get("rem_me") !== '' ?
      JSON.parse(Local_storage().get("rem_me"))?.password
      :
      "")

    setchecked(Local_storage().get("rem_me") !== '')

  }, [])

  const [showPassword, setshowPassword] = useState(false);
  const [checked, setchecked] = useState(false)

  const schema = yup.object().shape({
    email: yup
      .string()
      .matches(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/, "Valid email is required")
      .required("Valid email is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const [isLoginError, setisLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSuccess = (item) => {
    if (checked) {
      Local_storage().set("rem_me",
        JSON.stringify({
          username: getValues(['email'])[0],
          password: getValues(['password'])[0]
        }))
    }
    else {
      Local_storage().remove('rem_me')
    }
    Local_storage().set("_utk", item?.data?.data?.token)
    Local_storage().set("_eml", item?.data?.data?.user?.email)

    Local_storage().set("_count", item?.data?.data?.user?.country)
    Local_storage().get('provider') === "google" || Local_storage().get('provider') === "facebook" ? navigate('/googlefacebook') : navigate('/dashboard')
  };

  const onError = (error) => {
    setErrorMessage(error?.response?.data?.message);
    setisLoginError(true);
  };

  const handleCloseError = () => {
    setisLoginError(false);
  };

  const onRememberMe = (e) => {
    setchecked(e.target.checked)
  }

  const { mutate: LoginUser, isLoading } = useLoginUser(onSuccess, onError);

  const handleLogin = async (data) => {
    LoginUser(data);
  };

  const responseFacebook = async (response) => {
    // console.log(response)
    await axios.get(`https://graph.facebook.com/me?fields=first_name,last_name,email&access_token=${response.accessToken}`
      // headers : {
      //   "Authorization" : `${codeResponse.token_type} ${codeResponse.access_token}`
      // }
    )
      .then((res) => console.log("response"), Local_storage().set("provider", "facebook"))
      .catch((err) => console.log('error'))
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

    Axios.post('/user/oauth/login', {
      "provider": "google",
      "google_id": response?.sub,
      "email": response?.email
    }).then((res) => {
      Local_storage().set("_utk", res?.data?.data?.token)
      Local_storage().set("_eml", res?.data?.data?.user?.email)
      Local_storage().set("_count", "Nigeria")
      Local_storage().set("provider", "google")

      // Local_storage().set("_count", item?.data?.data?.user?.country)
      Local_storage().get('provider') === "google" || Local_storage().get('provider') === "facebook" ? navigate('/googlefacebook') : navigate('/dashboard')
    })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          iconColor: 'var(--main)',
          text: `User does not exist`,
          confirmButtonColor: "var(--main)",
          timer: 3000
        })
      })
      .finally(() => {
        setsocialLogining(false)
      })
  }

  return (
    <div className="login_container">



      {
        socialLogining &&
        <Loading />
      }
      <div className="login_left">
        <img alt="logo_img" onClick={() => {
          navigate('/')
        }} className="object_logo" src={Logowhite} />
        <div className="textCont">
          <h1>Create beautiful memories.</h1>
        </div>
        <object className="object_svg2" data={Union} type="image/svg+xml" />
      </div>
      <div className="login_right">
        <div className="right_container">
          <div onClick={() => navigate('/')} className="showMobile">
            <img src={Ctblogo} alt="logo" className="mobilelogo" />
          </div>
          <div className="login_head">
            <h1>Sign in</h1>
            <p>
              Don’t have an account?{" "}
              <span onClick={() => navigate("/sign-up")}>Sign Up</span>{" "}
            </p>
          </div>
          {/* <div> */}

          {/* </div> */}
          <div className="form_container">
            <form
              style={{ width: "100%" }}
              onSubmit={handleSubmit(handleLogin)}
            >
              <div style={{ marginBottom: '70px' }}>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <GoogleBtn
                      icon="google"
                      txt="Continue With Google"
                      onClick={() => login()}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FacebookLogin
                     appId={process.env.REACT_APP_FACEBOOK_AUTH_CLIENT_ID}
                      // autoLoad
                      callback={responseFacebook}
                      render={renderProps => (
                        <GoogleBtn
                          icon="fb"
                          txt="Continue With Facebook"
                          onClick={renderProps.onClick}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </div>
              <Grid container spacing={7}>
                <Grid item xs={12}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextFielded
                        {...field}
                        error={errors.email}
                        type="text"
                        id="email"
                        label="Email"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <TextFielded
                        {...field}

                        error={errors.password}
                        type={showPassword ? "text" : "password"}
                        id="password"
                        label="Password"
                        endIcon={
                          <IconButton
                            onClick={() => setshowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <AiFillEyeInvisible size={20} />
                            ) : (
                              <MdVisibility size={20} />
                            )}
                          </IconButton>
                        }
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <div style={{
                    display: "flex", justifyContent: "space-between", flexWrap: "wrap"
                  }} className="remember-forgetpassword">
                    <div className="remember">
                      <span className="lgCheckBoxCon">
                        <input type="checkbox" className="lgcheckBox"
                          onClick={onRememberMe}
                          checked={checked}
                        ></input>
                        <span style={{ marginLeft: "10px" }}>Remember?</span>
                      </span>
                    </div>

                    <div className="forgotpass">
                      <span>
                        <Link to="/forgetpass">
                          <span style={{ color: "var(--main)" }}>
                            Forgot password?{" "}
                          </span>
                        </Link>
                      </span>
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12}>
                  <PrimaryBtn
                    txtColor="White"
                    pd="11px"
                    br="10px"
                    w="100%"
                    bg="var(--main)"
                    hoverBG="var(--main)"
                    txt={isLoading ? <ClipLoader color="white" loading={isLoading} speedMultiplier={1} size={22} /> : "SIGN IN"}
                    fw="700"
                    fs="17px"
                    type="submit"
                  />
                </Grid>
              </Grid>
            </form>
          </div>
        </div>
      </div>

      <ErrorPopup
        open={isLoginError}
        close={handleCloseError}
        tryAgain={handleCloseError}
        title="Error"
        message={`Oppz! ${errorMessage}`}
      />
    </div>
  );
}
export default Login;
