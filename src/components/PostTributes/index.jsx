import React, { useState } from 'react'
import { ClipLoader } from 'react-spinners'
import Swal from 'sweetalert2'
import { usePostTribute } from '../../api/usePostTribute'
import PrimaryBtn from '../Buttons/PrimaryBtn'
import './styles.css'

const PostTributes = ({memo_id}) => {

  const [tribute, setTribute] = useState('')
    const onSuccess = (data) =>{
        Swal.fire({
          icon: "success",
          iconColor: 'var(--main)',
          text: `Tribute created successfully`,
          confirmButtonColor: "var(--main)",
          timer: 3000
        }).then(() => {
            window.location.reload()
        })  
    }
    const onError = (err) =>{
      Swal.fire({
        icon: "error",
        iconColor: 'var(--main)',
        text: `${err?.response?.data?.message}`,
        confirmButtonColor: "var(--main)",
        timer: 5000
      })
    }
    const {mutate, isLoading} = usePostTribute(onSuccess, onError)

    const postTribute = async (e) =>{
        e.preventDefault()
        mutate({
            "tribute" : tribute,
            "memorial_id" : memo_id
        })

    }

  return (
    <form onSubmit={postTribute}  style={{width:"100%", display:'flex', flexDirection:'column', gap:'15px', alignItems:'flex-end'}}>
      <textarea 
          value={tribute} 
          onChange={(e)=>setTribute(e.target.value)} 
          placeholder='Write a tribute...'  
          className="tribute_textares"/>
      <PrimaryBtn w='80px' type='submit' 
        txt={isLoading ? <ClipLoader color="white" loading={isLoading} speedMultiplier={1} size={20}/> : "Post"} 
        hoverBG='var(--main)' bg="var(--main)" txtColor="white" />
  </form>
  )
}

export default PostTributes