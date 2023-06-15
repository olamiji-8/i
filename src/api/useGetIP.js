import axios from 'axios';
import { useQuery } from 'react-query';
import { useGetIPContext } from '../contexts/GetIPAddress/GetIP';


import { usePaymentContext } from '../contexts/PaymentContext/PaymentContext';
import { useTributeContext } from '../contexts/TributeContext/TributeContext';



const getIP = async () => {
  const response = await axios.get('https://geolocation-db.com/json/')
  const data = response.data

  return data
}



export const useGetIP = () => {
  // const { setIP } = GetIPContext();
  const { setIP } = useGetIPContext();
  return useQuery('fetchuser IP', getIP, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setIP(data)

    }
  })
}