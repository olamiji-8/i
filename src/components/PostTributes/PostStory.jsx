import React, { useState } from 'react'
import { BiLink } from 'react-icons/bi'
import { ClipLoader } from 'react-spinners'
import Swal from 'sweetalert2'
import AuthAxios from '../../utils/AuthAxios'
import PrimaryBtn from '../Buttons/PrimaryBtn'
import ShadowCard from '../ViewBody/ShadowCard'
import './styles.css'

const PostStory = ({ memo_id }) => {

  const [story, setstory] = useState('')
  const [story_image, setstory_image] = useState([])
  const [isLoading, setisLoading] = useState(false)

  const postTribute = (e) => {
    e.preventDefault()

    setisLoading(true)
    var formdata = new FormData();

    formdata.append("story[text]", story);
    formdata.append("story[image]", story_image.length === 0 ? '' : story_image[0]);

    AuthAxios.post(`/story/add/${memo_id}`, formdata)
      .then((res) => {
        Swal.fire({
          icon: "success",
          iconColor: 'var(--main)',
          text: `Story created successfully`,
          confirmButtonColor: "var(--main)",
          timer: 3000
        }).then(() => {
          window.location.reload()
        })
      }).catch((err) => {
        Swal.fire({
          icon: "error",
          iconColor: 'var(--main)',
          text: `${err?.response?.data?.message}`,
          confirmButtonColor: "var(--main)",
          timer: 5000
        })
      }).finally(() => {
        setisLoading(false)
      })

    // console.log(memo_id)

  }

  return (
    <form onSubmit={postTribute} style={{ width: "100%", display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'flex-end' }}>
      <ShadowCard>
        <div className="edit_card_submit">
          <textarea value={story} onChange={(e) => setstory(e.target.value)} name="story_area" placeholder='Tell a story |' id="story_area" rows="5"></textarea>
          <div className="space_between">
            <input
              // value={story_image}
              onChange={(e) => setstory_image(e.target.files)}
              type="file" name="attach_image"
              id="attach_image" style={{ display: 'none' }}
              accept=".jpg, .jpeg, .png"
            />
            <label className="icon_text" style={{ color: 'var(--main)' }} htmlFor="attach_image">
              <BiLink size={24} />
              <span>Attach image || {story_image[0]?.name}</span>
            </label>
          </div>
        </div>
      </ShadowCard>
      <PrimaryBtn w='80px' type='submit'
        txt={isLoading ? <ClipLoader color="white" loading={isLoading} speedMultiplier={1} size={20} /> : "Post"}
        bg="var(--main)" hoverBG="var(--main)" txtColor="white" />
    </form>
  )
}

export default PostStory