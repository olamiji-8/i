import { useQuery } from 'react-query';
import { useTributeContext } from '../contexts/TributeContext/TributeContext';
import  AuthAxios  from '../utils/AuthAxios';


  const fetchDashboarddata = async ()=>{
    const response = await AuthAxios.get(`/user/tributes`)
    const data = response.data
    return data
  }

  export const useGetTribute = () =>{
    const { settributes } = useTributeContext();

    return useQuery('fetch tributes', fetchDashboarddata, {
      refetchOnWindowFocus: false,
      onSuccess : (data)=>{
        settributes(data)
      }
    })
  }