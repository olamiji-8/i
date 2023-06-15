import React, { useEffect } from 'react'
import HeaderBG from '../../assets/HeadBG.png'
import Lifebackground from '../../assets/Lifebackground.svg'
import About from '../../assets/About.png'
import "./ViewHeader.css"

function ViewHeader({activeTab, setactiveTab,image, name, date}) {

// useEffect(() => {

//   console.log(activeTab, 'activetab')
// }, [activeTab]);

  return (
    <div className='viewHeader' style={{
        backgroundImage:`url(${ Lifebackground })`,
        }}>
        <div style={{position:'absolute', width:'100%', height:'100%', top:'0', left:'0', backgroundColor:'rgba(0,0,0,0.4)'}}></div>

        <div className='viewInnerHeader'>
          <div className='viewInnerImage'>
            <div className='imageFrame' style={{backgroundImage: `url(${image})`}}></div>
            <div className='textFrame'>
              <h1>{name}</h1>
              <span>{date}</span>
            </div>
          </div>
          <div className='viewTabs'>
            <div
            onClick={()=>setactiveTab('About')} className={activeTab === "About" ? 'viewTabActive' : 'viewTab'}>
              About
            </div>
            <div
            onClick={()=>setactiveTab('Life')} className={activeTab === "Life" ? 'viewTabActive' : 'viewTab'}>
              Life
            </div>
            <div
            onClick={()=>setactiveTab('Gallery')} className={activeTab === "Gallery" ? 'viewTabActive' : 'viewTab'}>
              Gallery
            </div>
            <div
            onClick={()=>setactiveTab('Stories')} className={activeTab === "Stories" ? 'viewTabActive' : 'viewTab'}>
              Stories
            </div>
            <div
            onClick={()=>setactiveTab('Tributes')} className={activeTab === "Tributes" ? 'viewTabActive' : 'viewTab'}>
              Tributes
            </div>
           
          </div>
        </div>
        
    </div>
  )
}

export default ViewHeader