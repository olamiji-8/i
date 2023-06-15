import { useMutation } from 'react-query';
import { Axios } from '../utils/Axios';

const loginUser = (user) => {
  return Axios.post(`/user/login`, user)
}

export const useLoginUser = (onSuccess, onError) =>{
  return useMutation(loginUser, {
      onError: onError,
      onSuccess: onSuccess
  })
}
