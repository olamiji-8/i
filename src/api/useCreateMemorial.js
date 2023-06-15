import { useMutation } from 'react-query';
import AuthAxios from '../utils/AuthAxios';
import { Axios } from '../utils/Axios';

const create_payment = (data) => {
  return AuthAxios.post(`payment/create/${data.currency}`, {
    "plan_id": data.id
  })
}

const create_memorial = (memorial) => {

  return AuthAxios.post(`memorial`, memorial)
}

export const useCreateMemorial = (onSuccess, onError) => {
  return useMutation(create_memorial, {
    onError: onError,
    onSuccess: onSuccess
  })
}

export const useCreatePayment = (onSuccess, onError) => {
  return useMutation(create_payment, {
    onError: onError,
    onSuccess: onSuccess
  })
}