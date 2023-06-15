import { useQuery } from 'react-query';
import { usePaymentContext } from '../contexts/PaymentContext/PaymentContext';
import { useTributeContext } from '../contexts/TributeContext/TributeContext';
import  AuthAxios  from '../utils/AuthAxios';


  const fetchPayment = async ()=>{
    const response = await AuthAxios.get(`/user/payment/log`)
    const data = response.data
    return data
  }

  export const useGetPaymentLog = () =>{
    const { setpaymentLog } = usePaymentContext();

    return useQuery('fetch payment logs', fetchPayment, {
      refetchOnWindowFocus: false,
      onSuccess : (data)=>{
        setpaymentLog(data)
        // console.log(data, "context updated")
      }
    })
  }