import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Local_storage } from '../../utils/LocalStorageConfig'
import PrimaryBtn from '../Buttons/PrimaryBtn'
import "./CreateMemory.css"

function CreateMemory() {

  const navigate = useNavigate()
  return (
    <div className='create_container'>
      <div className="home_max_width">
        <div className="create_body">
          <div className="create_head">
            <h1>Create A Memorial</h1>
            <p>Honor and remember those who have died, by creating an online memorial page, leave tributes, share stories, images and much more in few easy steps</p>
          </div>
          <PrimaryBtn 
            txtColor="var(--main)" 
            pd="8px" 
            br="12px" 
            w="200px" 
            bg="white" 
            hoverBG="whitesmoke" 
            txt="Create A Memorial" 
            fw="500" 
            onClick={()=>{
                Local_storage().get("_utk") !== ""  ?
                navigate('/create-memorial')
                :
                navigate('/sign-up')
            }}
          />
        </div>
      </div>
    </div>

  )
}

export default CreateMemory