import axios from 'axios'
import { useQuery } from 'react-query';
import { usePlanContext } from '../contexts/PlanContext/PlanContext';
import { Axios } from '../utils/Axios';

const fetchCountry = () => {
  return axios.get('https://restcountries.com/v3.1/all')
}

export const useGetCountry = (onSuccess, onError) => {
  return useQuery('get countries', fetchCountry, {
    onSuccess,
    onError,
  })

}



const fetchPlan = async (currency) => {
  const response = await Axios.get(`/plans/${currency}`)
  const data = response.data.data
  return data
}


export const useGetPlanNGN = (currency) => {

  const { NGNPlan, setNGNPlan } = usePlanContext()

  const in_context = NGNPlan.length === 0

  return useQuery('fetch ngn plan', () => fetchPlan(currency), {
    onSuccess: (data) => {
      setNGNPlan(data)
    },
    onError: () => {
      // console.log("fetch NGN plan error");
    },
    refetchOnWindowFocus: false,
    enabled: in_context
  })
}

export const useGetPlanAUD = (currency) => {

  const { AUDPlan, setAUDPlan } = usePlanContext()

  const in_context = AUDPlan.length === 0;

  return useQuery('fetch aud plan', () => fetchPlan(currency), {
    onSuccess: (data) => {
      setAUDPlan(data)
    },
    onError: () => {
      // console.log("fetch AUD plan error");
    },
    refetchOnWindowFocus: false,
    enabled: in_context
  })

}


