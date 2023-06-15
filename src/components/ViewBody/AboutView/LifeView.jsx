import React from 'react'
import { Link } from 'react-router-dom'
import { Local_storage } from '../../../utils/LocalStorageConfig'
import PostTributes from '../../PostTributes'
import './AboutView.css'
import { Editor, EditorState, convertFromRaw, convertToRaw } from 'draft-js';

function LifeView({ from, memo_id, fullname, life_history }) {

    // const contentState = life_history?.startsWith("<p>") ? "" : convertFromRaw(JSON.parse(life_history));
    // const editorState = contentState !== "" && EditorState.createWithContent(contentState);
    // console.log(life_history, 'life_history')

    const contentState = life_history?.startsWith("{") ? convertFromRaw(JSON.parse(life_history)) : ""
    // console.log(contentState, 'contentState')
    const editorState = contentState !== "" && EditorState.createWithContent(contentState);


    return (
        <div style={{ width: '100%' }}>
            <div className='about_memo_cont'>
                <div className="about_title">
                    Life of {fullname}
                </div>

                <div className="about_content">
                    {/* <div dangerouslySetInnerHTML={{ __html: life_history }} /> */}

                    {

                        // life_history.startsWith("<p>") ? <div dangerouslySetInnerHTML={{ __html: life_history }} /> :

                        //     <>

                        //         <Editor editorState={editorState} readOnly={true} />


                        //     </>

                        life_history?.startsWith("{") ? <Editor editorState={editorState} readOnly={true} /> :

                            <>

                                <div dangerouslySetInnerHTML={{ __html: life_history }} />


                            </>




                    }



                </div>
                {
                    console.log(life_history, 'life_history')
                }
            </div>
            <div className="showDesktop">
                {
                    Local_storage().get("_utk") !== '' ?
                        from === 'preview' ?
                            null :
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

export default LifeView
