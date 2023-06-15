import { useMutation } from 'react-query';
import  AuthAxios  from '../utils/AuthAxios';

const forgetPass = (user) => {
  return AuthAxios.post(`/user/otp/resend`, user)
}

export const useForgetPass = (onSuccess, onError) =>{
  return useMutation(forgetPass, {
      onError: onError,
      onSuccess: onSuccess
  })
}
