import { useMutation } from 'react-query';
import { Axios } from '../utils/Axios';

const addUser = (user) => {
  return Axios.post(`/user/register`, user)
}

const verify = (user) => {
  return Axios.post(`/user/otp/verify`, user)
}

export const useRegisterUser = (onSuccess, onError) => {
  return useMutation(addUser, {
    onError: onError,
    onSuccess: onSuccess
  })
}

export const useVerifyOTP = (onSuccess, onError) => {
  return useMutation(verify, {
    onError: onError,
    onSuccess: onSuccess
  })
}

