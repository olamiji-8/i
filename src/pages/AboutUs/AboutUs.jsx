import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import CreateMemory from '../../components/CreateMemory/CreateMemory'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import OverLayHeader from '../../components/OverLayHeader/OverLayHeader'
import "./AboutUs.css"
import AboutUsCard from './AboutUsCard'

function AboutUs() {
  useEffect(() => {
    window.scrollTo(0,0)
  }, [])
  return (
    
    <div>
      <Helmet>
        <title>About - Create Tribute</title>
      </Helmet>
      <Navbar mobilebgColor="" bgColor="var(--sub-main)" iconColor="#76797F"/>
      <OverLayHeader title="ABOUT US"/>
      <div className="about_container">
        <AboutUsCard/>
      </div>
      <CreateMemory/>
      <Footer/>
    </div>
  )
}

export default AboutUs