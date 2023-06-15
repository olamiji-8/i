import React, { useState, useEffect, useContext, forwardRef, useRef, useImperativeHandle } from "react";
import { usePaystackPayment } from "react-paystack";
import { Local_storage } from "../utils/LocalStorageConfig";

const PaystackWidget = forwardRef((props, ref) => {

  const {
    amount,
    paymentMade,
    payment_ref,
  } = props

  const config = {
    reference: payment_ref,
    email: Local_storage().get('_eml'),
    amount: `${amount}00`,
    publicKey: process.env.REACT_APP_PAYSTACK_KEY,
  };

  useImperativeHandle(ref, () => ({
    paymentTriger() {
      initiate()
    }
  }));

  const onSuccess = (reference) => {
    paymentMade(reference)
  };

  // you can call this function anything
  const onClose = () => { };

  const initializePayment = usePaystackPayment(config);

  const initiate = () => initializePayment(onSuccess, onClose)

  return (
    <></>
  );
});

export default PaystackWidget;
