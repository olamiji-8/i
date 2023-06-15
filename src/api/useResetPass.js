import { useMutation } from 'react-query';
import { Axios } from '../utils/Axios';


const resetPass = (user) => {
  return Axios.post(`/user/password/reset`, user)
}

export const useResetPass = (onSuccess, onError) =>{
  return useMutation(resetPass, {
      onError: onError,
      onSuccess: onSuccess
  })
}
