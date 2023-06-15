import { yupResolver } from "@hookform/resolvers/yup";
import React, { useRef, useCallback, useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import * as yup from "yup";
import PrimaryBtn from "../Buttons/PrimaryBtn";

import "./style.css";
import { Axios } from "../../utils/Axios";
import Swal from "sweetalert2";
// import reCAPTCHA, { ReCAPTCHA } from "react-google-recaptcha"
import ReCAPTCHA from "react-google-recaptcha";

const ContactForm = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function onChange(value) {
    // console.log("Captcha value:", value);
    setDisableSubmit(false);
  }

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .min(2, "Can't be lesser than 2 digits")
      .max(75, "Can't exceed 75 digits")
      .matches(/^[aA-zZ\s]+$/, "Can't contain number or special character"),
    email: yup
      .string()
      .matches(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/,
        "Valid email is required"
      )
      .required("Valid email is required"),
    message: yup
      .string()
      .required("Message is required")
      .min(3, "Can't be lesser than 3 digits")
      .max(250, "Can't exceed 250 digits"),
  });

  const [isLoading, setisLoading] = useState(false);
  const [phoneErr, setphoneErr] = useState(false);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const send_mesaage = (data) => {
    // Token to be send to backend for validation
    const token = captchaRef.current.getValue();
    // Reset Recapcha back after first attempt
    captchaRef.current.reset();
    // console.log(token, "token")
    if (data.phone.length < 10) {
      setphoneErr(true);
    } else {
      setisLoading(true);
      setphoneErr(false);
      Axios.post(`contact`, data)
        .then((res) => {
          Swal.fire({
            icon: "success",
            iconColor: "var(--main)",
            text: `Message sent`,
            confirmButtonColor: "var(--main)",
            timer: 3000,
          }).then(() => {
            resetField("name");
            resetField("email");
            resetField("phone");
            resetField("message");
            window.scrollTo(0, 0);
          });
        })
        .catch((err) => {})
        .finally(() => {
          setisLoading(false);
        });
    }
  };

  const captchaRef = useRef(null);

  const [disableSubmit, setDisableSubmit] = useState(true);

  return (
    <div className="contact_form">
      <form style={{ width: "100%" }} onSubmit={handleSubmit(send_mesaage)}>
        <div className="contact_input">
          <label htmlFor="name">Name</label>
          <input {...register("name")} type="text" />
          <span className="error_labelv2">{errors?.name?.message}</span>
        </div>
        <div className="contact_input">
          <label htmlFor="name">Phone number</label>
          <input {...register("phone")} type="text" />
          {phoneErr ? (
            <span className="error_labelv2">Invalid phone number</span>
          ) : null}
        </div>
        <div className="contact_input">
          <label htmlFor="name">Email address</label>
          <input {...register("email")} type="text" />
          <span className="error_labelv2">{errors?.email?.message}</span>
        </div>
        <div className="contact_input">
          <label htmlFor="name">Message</label>
          <textarea {...register("message")} cols="30" rows="7"></textarea>
          <span className="error_labelv2">{errors?.message?.message}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "20px",
          }}
        >
          {/* Test Key But we repalce when we are live to use Main Key associated with the right domain */}

          {/* <ReCAPTCHA
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            //   onChange={useCallback(() => setDisableSubmit(false))}
            onChange={onChange}
            // data-theme="dark"
            theme="white"
            type="image"
            ref={captchaRef}
          /> */}

            <ReCAPTCHA
            sitekey="6LcclmMUAAAAALuch_wUoXh0i58WEbBtxaa3Vz-e"
            //   onChange={useCallback(() => setDisableSubmit(false))}
            onChange={onChange}
            // data-theme="dark"
            theme="light"
            type="image"
            ref={captchaRef}
          />

        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {!disableSubmit && (
            <PrimaryBtn
              w="150px"
              type="submit"
              pd="10px 0"
              fs="18px"
              fw="600"
              disabled={disableSubmit}
              txt={
                isLoading ? (
                  <ClipLoader
                    color="white"
                    loading={isLoading}
                    speedMultiplier={1}
                    size={20}
                  />
                ) : (
                  "Send"
                )
              }
              hoverBG="var(--main)"
              bg="var(--main)"
              txtColor="white"
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
