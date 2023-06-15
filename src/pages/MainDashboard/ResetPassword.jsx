import React, {useEffect, useState } from "react";
import "./Profileform.css";

import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Aside from "../../components/Aside";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useForm } from "react-hook-form";
import { Grid } from "@mui/material";
import AuthAxios from "../../utils/AuthAxios";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

function ResetPassword() {

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  const [isActive, setActive] = useState(false);
  const Toggle = () => {
    setActive(!isActive);
  };

  const [saving, setsaving] = useState(false)

   let navigate = useNavigate();

  const schema = yup.object().shape({
    current_password: yup.string().required("Password is required"),
    new_password: yup.string().required("Password is required"),
    new_password_confirmation: yup
      .string()
      .oneOf([yup.ref("new_password"), null], "Password mismatch!")
      .required("Required"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm(
    {
      mode: 'all',
      resolver: yupResolver(schema),
    }
  );

  const onSubmit = (data) => {
    setsaving(true)
    AuthAxios.post('/password/change', data)
    .then((res)=>{
      Swal.fire({
        icon: "success",
        iconColor: 'var(--main)',
        text: `Password changed successfully`,
        confirmButtonColor: "var(--main)",
        // timer: 3000
      }).then((res)=>{
     navigate('/dashboard')
      })
    })
    .catch((err)=>{
      Swal.fire({
        icon: "error",
        text: `${err?.response?.data?.message}`,
        confirmButtonColor: "var(--main)",
        timer: 4000
      })
    })
    .finally(()=>{
      setsaving(false)
    })
  }

    return (
        <div className="grid-container">
        <div className="menu-icon" onClick={Toggle}>
        <AiOutlineMenu className="header__menu" />
      </div>

      <aside  className={` sidenav ${isActive ? " active" : null}`}>
      <div onClick={Toggle}  className="sidenav__close-icon-" >
      <AiOutlineCloseCircle />
    </div>

        <Aside onClick={Toggle} />
    </aside>

<section style={{
        //  background: "lime",
         height: "100vh"
     }}  className="main">
<div className="main_name_edit">
             <div>Reset password</div>
             </div>

<div className="profile-body">
      <div className="form-inputs">
        <form onSubmit={handleSubmit(onSubmit)} style={{width:'100%'}}>
              <Grid container rowSpacing={{xs: 5, md: 8}} columnSpacing={{xs: 2, md: 3}}>
                <Grid item xs={12} md={7}>
                  <div className="first_namediv">
                    <div>
                      <label className="labelfirstname">Current password</label>
                    </div>
                    <div>
                      <input
                        {...register("current_password")}
                        type="password"
                        className="inputfirst"
                        id="current_password"
                      />
                      {errors?.current_password?.message && <div className='error_label' style={{color:'red'}}>{errors?.current_password?.message}</div>}
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={7}>
                  <div className="form-content">
                    <div className="first_namediv">
                      <div>
                        {" "}
                        <label className="labelfirstname">New password</label>
                      </div>
                      <div>
                        {" "}
                        <input
                          {...register("new_password")}
                          type="password"
                          className="lastnameirst"
                          id="new_password"
                        />
                        {errors?.new_password?.message && <div className='error_label' style={{color:'red'}}>{errors?.new_password?.message}</div>}
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={7}>
                  <div className="form-content">
                    <div className="first_namediv">
                      <div>
                        {" "}
                        <label className="labelfirstname">Confirm new password</label>
                      </div>
                      <div>
                        <input
                          {...register("new_password_confirmation")}
                          type="password"
                          className="emailfirst"
                          id="new_password_confirmation"
                        />
                        {errors?.new_password_confirmation?.message && <div className='error_label' style={{color:'red'}}>{errors?.new_password_confirmation?.message}</div>}

                      </div>
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} md={12}>
                <div className="save-btn">
                    <button type="submit" disabled={saving}>
                      {
                        saving ?  <ClipLoader color="white" loading={saving} speedMultiplier={1} size={20}/>
                        :
                        'Save'
                      }
                      </button>
                </div>
                </Grid>
              </Grid>


        </form>
      </div>
    </div>
    </section>
    </div>
  );
}

export default ResetPassword;
