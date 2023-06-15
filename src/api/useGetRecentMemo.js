import { useQuery } from 'react-query';
import { Axios } from '../utils/Axios';

const getRecent = async () => {
  const response = await Axios.get(`/memorial/recent`)
  const data = response.data
  return data.data
}

export const useGetRecentMemo = () =>{

  return useQuery('get recent memo', getRecent, {
    refetchOnWindowFocus: false ,
  })
}
 

