import React, { useState } from 'react'
import ShadowCard from '../ShadowCard'
import About from '../../../assets/About.png'
import './StoryView.css'
import NameCircleV2 from '../../NameCircle/NameCircleV2'

function StoryViewCard(props) {
    const { showImage, clicked, image, story, username } = props
    const [showMore, setShowMore] = useState(false);
    return (
        <ShadowCard>
            <div className='story_card_cont' onClick={clicked}>
                {
                    showImage ?
                        <div className="story_image"
                            style={{ backgroundImage: `url(${image})` }}
                        >
                        </div>
                        :
                        null
                }

                <div className="story_containa">
                    <NameCircleV2 name={username} />
                    <div className="story_content" >
                        <p> <h6>

                            {showMore ? story : `${story.substring(0, 250)}`} &nbsp;


                            {
                                story.substring(0, 250).length >= 250 ?
                                    <button className="btnreadmore" onClick={() => setShowMore(!showMore)}>{showMore ? "Show less" : "Show more"}</button> :
                                    null
                            }

                        </h6>
                        </p>
                    </div>
                </div>

            </div>
        </ShadowCard>

    )
}

export default StoryViewCard
