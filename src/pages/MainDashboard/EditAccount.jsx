import React, { useState, useEffect } from "react";
import "./Editacct.css";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useGetCountryList } from "../../api/useGetPlan";
import { useDashboardContext } from "../../contexts/DashboardContext/Dashboard";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { parsePhoneNumber, isValidPhoneNumber } from 'react-phone-number-input'

import { useForm } from "react-hook-form";
import { Grid } from "@mui/material";
import Swal from "sweetalert2";
import AuthAxios from "../../utils/AuthAxios";
import { ClipLoader } from "react-spinners";
import { useGetDashboard } from "../../api/useDashboard";
import { Local_storage } from "../../utils/LocalStorageConfig";

function EditAccount({ setStateBack }) {

  const navigate = useNavigate()
  const [saving, setsaving] = useState(false)

  const { data } = useGetCountryList()

  const { dashdata } = useDashboardContext();

  const { refetch } = useGetDashboard()

  const [country, setCountry] = useState("Nigeria")


  const [phoneNo, setphoneNo] = useState('')

  const onSubmit = (data) => {
    data.country = country
    if (phoneNo === undefined || !isValidPhoneNumber(phoneNo)) {
      Swal.fire({
        icon: "info",
        text: `Invalid phone number`,
        confirmButtonColor: "var(--main)",
        timer: 4000
      })
    }
    else {
      setsaving(true)
      data.phone = phoneNo
      AuthAxios.post('/profile/update', data)
        .then((res) => {
          Swal.fire({
            icon: "success",
            iconColor: 'var(--main)',
            text: `Profile updated successfully`,
            confirmButtonColor: "var(--main)",
            timer: 3000
          })
            .then(() => {
              navigate('/dashboard')
              // refetch()
              setStateBack()
            })
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            text: `${err?.response?.data?.message}`,
            confirmButtonColor: "var(--main)",
            timer: 4000
          })
        })
        .finally(() => {
          setsaving(false)
        })
    }
  }


  useEffect(() => {
    if (dashdata !== undefined) {
      setValue("first_name", dashdata?.data?.user_details?.first_name)
      setValue("last_name", dashdata?.data?.user_details?.last_name)
      setValue("email", dashdata?.data?.user_details?.email)
      setValue("country", dashdata?.data?.user_details?.country)
      setphoneNo(dashdata?.data?.user_details?.phone)
    }
  }, [dashdata])

  const schema = yup.object().shape({
    first_name: yup.string().required("Firstname is required").matches(/^[aA-zZ\s]+$/, "Can't contain number or special character"),
    last_name: yup.string().required("Lastname is required").matches(/^[aA-zZ\s]+$/, "Can't contain number or special character"),
    email: yup
      .string()
      .matches(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/, "Valid email is required")
      .required("Email is required"),
  });

  const { register, setValue, handleSubmit, formState: { errors } } = useForm(
    {
      mode: 'all',
      resolver: yupResolver(schema),
    }
  );


  return (
    <div className="profile-body">
      <div className="form-inputs">
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          {/* <div className="formgeneralcontent">
            <div className="form-content"> */}
          <Grid container rowSpacing={{ xs: 5, md: 8 }} columnSpacing={{ xs: 2, md: 3 }}>
            <Grid item xs={12} md={6}>
              <div className="first_namediv">
                <div>
                  <label className="labelfirstname">First Name</label>
                </div>
                <div>
                  <input
                    {...register("first_name")}
                    type="text"
                    className="inputfirst"
                    id="firstname"
                  />
                  {errors?.first_name?.message && <div className='error_label' style={{ color: 'red' }}>{errors?.first_name?.message}</div>}
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="form-content">
                <div className="first_namediv">
                  <div>
                    {" "}
                    <label className="labelfirstname">Last Name</label>
                  </div>
                  <div>
                    {" "}
                    <input
                      {...register("last_name")}
                      type="text"
                      className="lastnameirst"
                      id="lastname"
                    />
                    {errors?.last_name?.message && <div className='error_label' style={{ color: 'red' }}>{errors?.last_name?.message}</div>}
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="form-content">
                <div className="first_namediv">
                  <div>
                    {" "}
                    <label className="labelfirstname">Email</label>
                  </div>
                  <div>
                    <input
                      {...register("email")}
                      type="email"
                      className="emailfirst"
                      id="emailtext"
                      disabled
                    />
                    {errors?.email?.message && <div className='error_label' style={{ color: 'red' }}>{errors?.email?.message}</div>}

                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="form-content">
                <div className="first_namediv">
                  <div>
                    {" "}
                    <label className="labelfirstname">Select Country</label>
                  </div>
                  <div>
                    <select
                      name="country"
                      id="country"
                      className="selectcountries"
                      {...register("country")}
                    // disabled
                    >
                      {data?.map((option) => (
                        <option
                          className="optionselect"
                          key={option.id}
                          // value={option.name}
                          value={country}
                          disabled={Local_storage().get('provider') === "google" || Local_storage().get('provider') === "facebook" ? false : true}
                          onChange={() => setCountry(option.name)}
                        >
                          {option.name}
                        </option>
                      ))}
                    </select>

                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="form-content">
                <div className="first_namediv">
                  <div>
                    {" "}
                    <label className="labelfirstname">Phone Number</label>
                  </div>
                  <div>
                    <div className="inputcountry">
                      <PhoneInput
                        international
                        placeholder="Enter phone number"
                        value={phoneNo}
                        onChange={setphoneNo}
                        disabled={Local_storage().get('provider') === "google" || Local_storage().get('provider') === "facebook" ? false : true}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={12}>
              <div className="savechangesbtnacct">
                <button type="submit" disabled={saving}>
                  {
                    saving ? <ClipLoader color="white" loading={saving} speedMultiplier={1} size={20} />
                      :
                      "Save Changes"
                  }
                </button>
              </div>
            </Grid>
          </Grid>


        </form>
      </div>
    </div>
  );
}

export default EditAccount;
