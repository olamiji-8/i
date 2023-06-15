import React, { useEffect, useState } from 'react'
import './AboutView.css'
import { Link } from 'react-router-dom'
import { Local_storage } from '../../../utils/LocalStorageConfig'
import PostTributes from '../../PostTributes'
// import { ContentState, convertFromHTML } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
// import { convertToRaw } from 'draft-js'
import { Editor, EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { useMemorialContext } from '../../../contexts/MemorialContext/MemorialContext';
import moment from 'moment';

function AboutView({ from, memo_id, fullname, biography, memorial }) {
    const [oldcontent, setOldcontent] = useState(false)


    // console.log(biography, 'biography')
    // console.log(JSON.stringify(biography), 'jjnjmijkkkkm')
    // console.log(JSON.parse(biography), 'ujijijii')

    //  const contentState = biography?.startsWith("<p>") ? "" : convertFromRaw(JSON.parse(biography));
    const contentState = biography.startsWith("{") ? convertFromRaw(JSON.parse(biography)) : ""
    const editorState = contentState !== "" && EditorState.createWithContent(contentState);







    const [news, setnews] = useState()

    useEffect(() => {

    }, []);





    return (
        <div style={{ width: '100%' }}>
            <div className='about_memo_cont'>
                <div className="about_title">
                    In Memory of {fullname}
                </div>
                <div className="about_quote">
                    “Let the Memory of {fullname} be with us forever”

                </div>


                <div className="about_quote">

                    This memorial website was created in memory of our loved one, {fullname}&ensp;
                    {

                        moment(memorial?.date_of_death).format('YYYY') -
                        moment(memorial?.date_of_birth).format('YYYY')
                    }&ensp;
                    years old, born on {moment(memorial?.date_of_birth).format('ll')} and passed away on  {moment(memorial?.date_of_death).format('ll')}. We will remember him forever.

                </div>
                <div className="about_content">

                    {



                        biography.startsWith("{") ? <Editor editorState={editorState} readOnly={true} /> :

                            <>

                                <div dangerouslySetInnerHTML={{ __html: biography }} />


                            </>



                    }


                </div>

            </div>


            <div className="showDesktop">
                {
                    Local_storage().get("_utk") !== '' ?
                        from === 'preview' ?
                            null
                            :
                            <div className="story_memo_con">
                                <div className="story_title">
                                    Post a tribute
                                </div>
                                <div className='story_link'>
                                    <PostTributes memo_id={memo_id} />
                                </div>
                            </div>
                        :
                        <div className="story_memo_con">
                            <div className="story_title">
                                Post a tribute
                            </div>
                            <div className='story_link'>
                                <Link to="/login">Log in</Link> to post a tribute for {fullname}
                            </div>
                        </div>
                }
            </div>

        </div>
    )
}

export default AboutView
