import { useQuery } from 'react-query';
import { useStoryContext } from '../contexts/StoryContext/StoryContext';
import  AuthAxios  from '../utils/AuthAxios';


  const fetchDashboarddata = async ()=>{
    const response = await AuthAxios.get(`/user/stories`)
    const data = response.data
    return data
  }

  export const useGetStories = () =>{
    const { setStories } = useStoryContext();

    return useQuery('fetch stories', fetchDashboarddata, {
      refetchOnWindowFocus: false,
      // refetchOnMount : false,
      onSuccess : (data)=>{
        setStories(data)
      }
    })
  }