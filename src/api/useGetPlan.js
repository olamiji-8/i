import { useQuery } from 'react-query';
import { Axios } from '../utils/Axios';

const fetchPlan = async (currency) => {
  const response = await Axios.get(`/plans/${currency}`)
  const data = response.data.data
  return data
}

const fetchCountries = async () => {
  const response = await Axios.get(`/country/list`)
  const data = response.data.data
  return data
}

export const useGetPlanNGN = (currency) =>{

  return useQuery('fetch ngn plan', ()=>fetchPlan(currency), {
    refetchOnWindowFocus: false ,
  })
}
 
export const useGetPlanAUD = (currency) =>{

    return useQuery('fetch aud plan', ()=>fetchPlan(currency), {
      refetchOnWindowFocus: false,
    })
  
  }

export const useGetCountryList = () =>{

    return useQuery('fetch countries', fetchCountries, {
      refetchOnWindowFocus: false,
    })
  
  }
