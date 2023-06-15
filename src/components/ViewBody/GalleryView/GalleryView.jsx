import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import './GalleryView.css'
import About from '../../../assets/About.png'
import Mission from '../../../assets/Mission.png'
import DialogClickout from '../../DialogClickout';
import GallerySlider from './GallerySlider';
import { Link } from 'react-router-dom';
import CardMedia from "@mui/material/CardMedia";
import { Local_storage } from '../../../utils/LocalStorageConfig';
import PostTributes from '../../PostTributes';

function GalleryView({ from, memo_id, gallery, fullname }) {
    const [showViewer, setShowViewer] = useState(false)
    const [activeImage, setActiveImage] = useState(0)

    // console.log(gallery, "gallery")

    const toNext = () => {
        if ((gallery.length - 1) === activeImage) {
            setActiveImage(0)
        }
        else {
            setActiveImage(activeImage + 1)
        }
    }
    const toPrevious = () => {
        if (activeImage === 0) {
            setActiveImage(gallery.length - 1)
        }
        else {
            setActiveImage(activeImage - 1)
        }
    }

    return (
        <>
            <div className='galleryView'>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {gallery.map((x, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index} onClick={() => { setShowViewer(true); setActiveImage(index) }}>
                            <CardMedia
                                component="img"
                                height="260px"
                                width="100%"
                                object-fit="contain"
                                image={`${x.file_url}`}
                            />
                        </Grid>
                    ))}
                </Grid>

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

            <DialogClickout
                open={showViewer}
                handleClose={() => { setShowViewer(false); }}
            >
                <GallerySlider image={gallery[activeImage]?.file_url} toNext={toNext} toPrevious={toPrevious} />
            </DialogClickout>

        </>
    )
}

export default GalleryView
