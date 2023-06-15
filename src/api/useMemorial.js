import axios from 'axios';
import { useContext } from 'react';
import { useInfiniteQuery, useQuery } from 'react-query';
import { IPContext } from '../contexts/GetIPAddress/NewIp';
// import { IPContext } from '../contexts/GetIPAddress/NewIp';
import { useMemorialContext } from '../contexts/MemorialContext/MemorialContext';
import { useUserSingleMemorialContext } from '../contexts/MemorialContext/UserSingleMemorialContext';
import AuthAxios from '../utils/AuthAxios';
import { Axios } from '../utils/Axios';

const fetchMemorials = ({ pageParam = 1 }) => {
  return Axios.get(`/memorials?page=${pageParam}`)
}

export const useMemorial = () => {



  // const { memorial, setMemorial} = useMemorialContext();

  return useInfiniteQuery(['fetch memorials'], fetchMemorials, {
    getNextPageParam: (lastPage, pages) => {
      return pages.length + 1
    },
    onSuccess: (data) => {
      // update context data
      // console.log(data)
      // for (let i = 0 ; i < data.pages.length ; i++){
      //   data.pages[i].data.data = data?.pages[i].data?.data?.reverse()
      //   setMemorial([...memorial, ...data.pages[i].data.data])
      // }
    },
    // onError,
    refetchOnWindowFocus: false
  })
}

// export const useMemorial = (page) =>{

//   return useQuery(['fetch memorials', page], () => fetchMemorials(page), {
//     keepPreviousData : true,
//     onSuccess : (data)=>{
//       // update context data
//       data.data.data = data?.data?.data?.reverse()
//     },
//     // onError,
//     refetchOnWindowFocus: false
//   })
// }

const fetchSingleMemorial = (slug, ip) => {
  return Axios.get(`/memorial/${slug}?${ip}`)

}
export const useViewMemorial = (onSuccess, onError, slug, ip) => {
  return useQuery('fetch memorial', () => fetchSingleMemorial(slug, ip), {
    onSuccess,
    onError,
    refetchOnWindowFocus: false
  })
}

const fetchUserMemo = () => {
  return AuthAxios.get(`/user/memorials`)
}
export const useUserMemo = () => {
  return useQuery('fetch user all memorial', fetchUserMemo, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      data.data.data = data?.data?.data?.reverse()
    }
  })
}



// const GetIPData = () =>{
//   return axios.get('https://geolocation-db.com/json/')
// }


// export const useGetIPData = () =>{

// const { getallips,
//   setallips} =  useContext(IPContext)

//   return useQuery('fetch ip data',GetIPData, {
//     refetchOnWindowFocus: false,
//     onSuccess : (data)=>{
//       // data.data.data = data?.data?.data?.reverse()
//       console.log(data, 'dataaaaaaaa')
//       setallips(data)
//     }
//   })
// }







const fetchUserSingleMemo = (slug) => {
  return AuthAxios.get(`/memorial/${slug}`)
}
export const useUserSingleMemo = (slug) => {
  return useQuery('fetch user single memorial', () => fetchUserSingleMemo(slug), {
    refetchOnWindowFocus: false,
  })
}


const mostViewMemorial = () => {
  return Axios.get(`/memorial/views/most`)
}
export const useMostViewMemorial = (onSuccess, onError) => {
  return useQuery('fetch most memorial', mostViewMemorial, {
    onSuccess,
    onError,
    refetchOnWindowFocus: false

  })
}