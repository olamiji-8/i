import React from 'react'
import './Memorials.css'
import PrimaryBtn from '../../components/Buttons/PrimaryBtn'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { Editor, EditorState, convertFromRaw, convertToRaw } from 'draft-js';

function SearchResCard({ data }) {

  const navigate = useNavigate()
  // const contentState = data?.biography.startsWith("<p>") ? "" : convertFromRaw(JSON.parse(data?.biography));
  // const editorState = contentState !== "" && EditorState.createWithContent(contentState);


  const contentState = data?.biography?.startsWith("{") ? convertFromRaw(JSON.parse(data?.biography)) : ""
  const editorState = contentState !== "" && EditorState.createWithContent(contentState);

  return (
    <div className='search_card_con'>
      <div className='search_info' >
        <div className="search_image">
          <img src={data?.image} alt={data?.id} />
          <div className="showMobile">
            <h3>{data?.fullname}</h3>
            <p>{moment(data?.date_of_birth).format('DD/MM/YYYY')} - {moment(data?.date_of_death).format('DD/MM/YYYY')}</p>
          </div>
        </div>
        <div className="search_content_recent">
          <div className="showDesktop">
            <h3>{data?.fullname}</h3>
            <p>{moment(data?.date_of_birth).format('DD/MM/YYYY')} - {moment(data?.date_of_death).format('DD/MM/YYYY')}</p>
          </div>
          {/* <p dangerouslySetInnerHTML={{__html : data?.biography}}></p> */}
          <div className="about_content">

            {

              // data?.biography.startsWith("<p>") ? <div dangerouslySetInnerHTML={{ __html: data?.biography }} /> :

              //   <>

              //     <Editor editorState={editorState} readOnly={true} />


              //   </>

              data?.biography?.startsWith("{") ? <Editor editorState={editorState} readOnly={true} /> :

                <>

                  <div dangerouslySetInnerHTML={{ __html: data?.biography }} />


                </>




            }


          </div>
          <PrimaryBtn
            txtColor="white"
            pd="5px 10px"
            br="5px"
            bg="var(--main)"
            hoverBG="var(--main)"
            txt="Visit Memorial"
            fw="300"
            onClick={() => navigate(`/memorial/${data?.slug}`)}
          />
        </div>
      </div>

    </div>
  )
}

export default SearchResCard
