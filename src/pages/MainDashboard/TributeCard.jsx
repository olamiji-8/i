import React, { useEffect, useState } from "react";
import "./tributecard.css";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import moment from "moment";
import { Capitalizer } from "../../utils/Capitalizer";
import Dropdown from "../../components/Dropdown";
import AuthAxios from "../../utils/AuthAxios";
import Swal from "sweetalert2";
import { useGetStories } from "../../api/useGetStories";
import { useGetTribute } from "../../api/useGetTribute";
import { BiLink } from "react-icons/bi";
import PrimaryBtn from "../../components/Buttons/PrimaryBtn";
import { ClipLoader } from "react-spinners";

function TributeCard({
  trib_data,
  story_data,
  stories,
  seteditId,
  editId
}) {

  // let navigate = useNavigate();

  const { refetch } = useGetStories()

  const { refetch: refetchTribute } = useGetTribute()

  const [storyEditMode, setStoryEditMode] = useState(false)
  const [tributeEditMode, setTributeEditMode] = useState(false)

  const [initialValue, setInitialValue] = useState('')
  const [initialImage, setInitialImage] = useState()

  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    if (stories) {
      setInitialValue(story_data?.story)
      setInitialImage(story_data?.image)
    }
    else {
      setInitialValue(trib_data?.tribute)
    }
  }, [])

  const handleCancelEdit = (type) => {
    if (type === "Story") {
      setStoryEditMode(false)
      seteditId('')
    }
    else {
      setTributeEditMode(false)
      seteditId('')
    }
  }

  const handleEditClick = (id, type) => {
    if (type === "Story") {
      setStoryEditMode(true)
      seteditId(id)
    }
    else {
      setTributeEditMode(true)
      seteditId(id)
    }
    // console.log(id, type, 'idddd')
  }

  const UpdatePost = (id, type) => {
    const endpoint = type === "Story" ? `/story/update/${id}` : `/tribute/update/${id}`

    var data = {}

    var formdata = new FormData();
    if (type === 'Story') {
      formdata.append("story[text]", initialValue);
      formdata.append("story[image]", initialImage[0]?.name === undefined ? '' : initialImage[0]);

      data = formdata
    }
    else {
      data = { 'tribute': initialValue }
    }

    setUpdating(true)
    AuthAxios.post(endpoint, data).then((res) => {
      // console.log(res, 'res')
      Swal.fire({
        icon: "success",
        iconColor: 'var(--main)',
        text: `${type} updated successfully`,
        confirmButtonColor: "var(--main)",
        timer: 3000
      }).then(() => {
        seteditId('')
        if (type === 'Story') {
          refetch()
        }
        else {
          refetchTribute()
        }
      })
    })
      .catch((err) => {
        // console.log(err, 'error')
        Swal.fire({
          icon: "error",
          text: `${err?.response?.data?.message}`,
          confirmButtonColor: "var(--main)",
          timer: 4000
        })
      })
      .finally(() => {
        setUpdating(false)
      })
  }
  const handleDeleteClick = (id, type) => {
    const endpoint = type === "Story" ? `/story/remove/${id}` : `/tribute/remove/${id}`

    Swal.fire({
      icon: 'warning',
      text: ` Are you sure you want to delete this ${type.toLowerCase()}`,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: 'maroon'
    }).then((result) => {
      if (result.isConfirmed) {
        AuthAxios.get(endpoint).then((res) => {
          // console.log(res, 'res')
          Swal.fire({
            icon: "success",
            iconColor: 'var(--main)',
            text: `${type} successfully deleted`,
            confirmButtonColor: "var(--main)",
            timer: 3000
          }).then(() => {
            if (type === 'Story') {
              refetch()
            }
            else {
              refetchTribute()
            }
            // console.log('refecth')
          })
        })
          .catch((err) => {
            console.log(err, 'error')
            Swal.fire({
              icon: "error",
              text: `${err?.response?.data?.message}`,
              confirmButtonColor: "var(--main)",
              timer: 3000
            })
          })
          .finally(() => {

          })
      }
    })

  }
  const handleHideClick = (id, type) => {
    const endpoint = type === "Story" ? `/story/hide/${id}` : `/tribute/hide/${id}`

    AuthAxios.get(endpoint).then((res) => {
      // console.log(res, 'res')
      Swal.fire({
        icon: "success",
        iconColor: 'var(--main)',
        text: `${type} successfully hiden from public`,
        confirmButtonColor: "var(--main)",
        timer: 3000
      })
    })
      .catch((err) => {
        console.log(err, 'error')
        Swal.fire({
          icon: "error",
          text: `${err?.response?.data?.message}`,
          confirmButtonColor: "var(--main)",
          timer: 3000
        })
      })
      .finally(() => {

      })
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: "#181819",
        color: "#e9e9e9",
        fontSize: '15px'
      },
      children: `${name?.split(' ')[0][0]}${name?.split(' ')[1][0]}`,
    };
  }

  return (
    <div>
      {/* {console.log(story_data, 'datatatat')} */}
      <div className="tributememorialcard">
        <div className="inmemorial">
          <div className="inmemorytag">
            <div>
              {" "}
              <span className="textspan"> In memory of</span>{" "}
            </div>
            {
              stories ?
                <>
                  <div>
                    {" "}
                    <img className="icon-img" src={story_data?.memorial?.image} alt={story_data?.memorial?.fullname} />
                  </div>
                  <div>
                    {" "}
                    <span className="memorialnamemane">{story_data?.memorial?.fullname}</span>
                  </div>
                </>
                :
                <>
                  <div>
                    {" "}
                    <img className="icon-img" src={trib_data?.memorial?.image} alt={trib_data?.memorial?.fullname} />
                  </div>
                  <div>
                    {" "}
                    <span className="memorialnamemane">{trib_data?.memorial?.fullname}</span>
                  </div>
                </>
            }

          </div>
        </div>

        {stories ? (
          storyEditMode && editId === story_data.id ?
            <div className="edit_card_submit">
              <textarea value={initialValue}
                onChange={(e) => setInitialValue(e.target.value)}
                name="story_area" placeholder='Tell a story |' id="story_area" rows="5"></textarea>
              <div className="space_between">
                <input
                  // value={initialImage}
                  onChange={(e) => setInitialImage(e.target.files)}
                  type="file" name="attach_image"
                  id="attach_image" style={{ display: 'none' }}
                  accept=".jpg, .jpeg, .png"
                />
                <label className="icon_text" style={{ color: 'var(--main)' }} htmlFor="attach_image">
                  <BiLink size={24} />
                  <span>
                    {initialImage[0]?.name ? initialImage[0]?.name : "Attach image"}
                  </span>

                </label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <PrimaryBtn w='80px' type='submit'
                    txt="Cancel"
                    bg="maroon" hoverBG="maroon" txtColor="white" onClick={() => handleCancelEdit('Story')} />

                  <PrimaryBtn w='80px' type='submit'
                    txt={updating ? <ClipLoader color="white" loading={updating} speedMultiplier={1} size={20} /> : "Update"}
                    onClick={() => UpdatePost(story_data.id, 'Story')}
                    bg="var(--main)" hoverBG="var(--main)" txtColor="white" />
                </div>
              </div>
            </div>
            :
            <div className="storiesimageandnot">
              {story_data?.image?.includes("http") ?
                <div className="storyimgae" >
                  <img className="story-img" alt="story-img" src={story_data?.image} />
                </div>
                :
                null
              }
              <div className="storycontent">
                <div className="memorialtextandhead">
                  <div className="memorialhead">

                    <div className="left-head">
                      <Avatar {...stringAvatar(Capitalizer(story_data?.user_name))} />
                      <div className="initial-right">
                        <div className="topdate">
                          <div>
                            {" "}
                            <span className="from">From</span>
                          </div>
                          <div>
                            <span className="actualdate">{moment(story_data?.updated_at).format('MM ddd YYYY')}</span>
                          </div>
                        </div>

                        <div className="bottom-name">
                          <h1 className="bottomname">{Capitalizer(story_data?.user_name)}</h1>
                        </div>
                      </div>
                    </div>
                    <Dropdown
                      editClick={() => handleEditClick(story_data.id, 'Story')}
                      deleteClick={() => handleDeleteClick(story_data.id, 'Story')}
                      hideClick={() => handleHideClick(story_data.id, 'Story')}
                    />
                  </div>

                  <div className="memorial-bottommain">
                    <h1 className="maintext">{story_data?.story}</h1>
                  </div>
                </div>
              </div>
            </div>
        ) : (
          tributeEditMode && editId === trib_data.id ?
            <div className="edit_card_submit">
              <textarea value={initialValue} autoFocus
                onChange={(e) => setInitialValue(e.target.value)}
                name="story_area" id="story_area" rows="5"></textarea>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <PrimaryBtn w='80px' type='submit'
                  txt="Cancel"
                  bg="maroon" hoverBG="maroon" txtColor="white" onClick={() => handleCancelEdit('Tribute')} />

                <PrimaryBtn w='80px' type='submit'
                  txt={updating ? <ClipLoader color="white" loading={updating} speedMultiplier={1} size={20} /> : "Update"}
                  onClick={() => UpdatePost(trib_data.id, 'Tribute')}
                  bg="var(--main)" hoverBG="var(--main)" txtColor="white" />
              </div>
            </div>
            :
            <div className="memorialtextandhead">
              <div className="memorialhead">
                <div className="left-head">
                  <Avatar {...stringAvatar(Capitalizer(trib_data?.user_name))} />

                  <div className="initial-right">
                    <div className="topdate">
                      <div>
                        {" "}
                        <span className="from">From</span>
                      </div>
                      <div>
                        <span className="actualdate">{moment(trib_data?.updated_at).format('Do ddd MM YYYY')}</span>
                      </div>
                    </div>

                    <div className="bottom-name">
                      <h1 className="bottomname">{Capitalizer(trib_data?.user_name)}</h1>
                    </div>
                  </div>
                </div>

                <Dropdown
                  editClick={() => handleEditClick(trib_data.id, 'Tribute')}
                  deleteClick={() => handleDeleteClick(trib_data.id, 'Tribute')}
                  hideClick={() => handleHideClick(trib_data.id, 'Tribute')}
                />

              </div>

              <div className="memorial-bottommain">
                <h1 className="maintext">{trib_data?.tribute}</h1>
              </div>
            </div>
        )}
      </div>
    </div>
  );
}

export default TributeCard;
