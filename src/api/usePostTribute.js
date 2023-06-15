import { useMutation } from 'react-query';
import AuthAxios from '../utils/AuthAxios';


const postTribute = (post) => {
  return AuthAxios.post(`/tribute/create/${post.memorial_id}`, {
    "tribute" : post.tribute
  })
}

export const usePostTribute = (onSuccess, onError) =>{
  return useMutation(postTribute, {
      onError: onError,
      onSuccess: onSuccess
  })
}
