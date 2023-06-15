import React from 'react'
import "./ProductHuntBtn.css"
import {IoMdArrowDropup} from 'react-icons/io'

function ProductHuntBtn() {
  return (
    <div className='hunt_btn'>
        <div className="flextoLeft">
            <div className="leftRounded">
                P
            </div>
            <div className="leftText">
                <span>COME JOIN US ON</span>
                <h4>Product Hunt</h4>
            </div>
        </div>
        <div className="flextoRight">
            <IoMdArrowDropup size={18} color="var(--main)"/>
            <span>7</span>
        </div>
    </div>
  )
}

export default ProductHuntBtn