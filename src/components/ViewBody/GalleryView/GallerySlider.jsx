import React from 'react'
import './GalleryView.css'
import About from '../../../assets/About.png'
import IconButton from '@mui/material/IconButton';
import {AiFillLeftCircle, AiFillRightCircle} from 'react-icons/ai'


function GallerySlider({image, toNext, toPrevious }) {
    
    return (
        <div className='gallery_slider'>
            <h2>Gallery</h2>
            <div className='imaged' style={{backgroundImage: `url(${image})`}}>
                <span className='chevronLicon'>
                    <IconButton onClick={toPrevious}>
                        <AiFillLeftCircle color='grey' size='40px'/>
                    </IconButton> 
                </span>

                <span className='chevronRicon'>
                    <IconButton onClick={toNext}>
                        <AiFillRightCircle color='grey' size='40px'/>
                    </IconButton> 
                </span>
            </div>
        </div>
    )
}

export default GallerySlider
