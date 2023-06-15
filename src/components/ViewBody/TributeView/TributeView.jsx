import React from 'react'
import { Link } from 'react-router-dom'
import StoryViewCard from '../StoryView/StoryViewCard'
import '../StoryView/StoryView.css'
import { Local_storage } from '../../../utils/LocalStorageConfig'
import PostTributes from '../../PostTributes'

function TributeView({ from, tributes, fullname, memo_id }) {
    return (
        <div style={{ width: '100%' }}>
            <div className='story_memo_cont'>
                <div className="story_title">
                    Tributes
                </div>

                <div className="story_containa">
                    {
                        tributes.map((tribute, i) => (
                            <StoryViewCard username={tribute.user_name} story={tribute.tribute} key={i} />
                        ))
                    }

                </div>
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

export default TributeView
