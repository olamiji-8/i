import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Local_storage } from '../../../utils/LocalStorageConfig'
import DialogClickout from '../../DialogClickout'
import PostStory from '../../PostTributes/PostStory'
import './StoryView.css'
import StoryViewCard from './StoryViewCard'

function StoryView({from, memo_id, story, fullname}) {

    const [showStory, setshowStory] = useState(false)
    const [clickedIndex, setClickedIndex] = useState(0)
    return (
        <>
        <div style={{width:'100%'}}>
           <div className='story_memo_cont'>
                <div className="story_title">
                    Stories
                </div>
                
                <div className="story_containa">
                    {
                        story?.map((x,i)=>(
                            <StoryViewCard 
                                key={i}
                                username={x?.user_name}
                                // showImage={!x?.image === null || !x?.image === null} 
                                showImage={x?.image?.includes("https")} 
                                image = {x?.image}
                                story = {x?.story}
                                clicked={()=>{setshowStory(true); setClickedIndex(i)}}
                            />
                        ))
                    }
                    {/* <StoryViewCard clicked={()=>setshowStory(true)}/>
                    <StoryViewCard showImage clicked={()=>setshowStory(true)}/> */}
                </div>
            </div>
            <div className="showDesktop">
                {
                    Local_storage().get("_utk") !== '' ?
                    from ==='preview' ?
                        null:
                        <div className="story_memo_con">
                            <div className="story_title">
                                Post a story
                            </div>
                            <div className='story_link'>
                                <PostStory memo_id={memo_id}/>
                            </div>
                        </div>
                        :
                        <div className="story_memo_con">
                            <div className="story_title">
                                Post a story
                            </div>
                            <div className='story_link'>
                                <Link to="/login">Log in</Link> to post a tribute for {fullname}
                            </div>
                        </div>
                }
            </div>
           
        </div>
        <DialogClickout
         open={showStory}
         handleClose ={()=>{setshowStory(false);  }}
        >
            <StoryViewCard 
                story={story[clickedIndex]?.story}
                username={story[clickedIndex]?.user_name}
                showImage={story[clickedIndex]?.image?.includes("https")} 
                image = {story[clickedIndex]?.image}
            />
        </DialogClickout>
        </>
    )
}

export default StoryView
