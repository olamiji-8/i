import React from 'react'
import { Helmet } from 'react-helmet'
import CreateMemory from '../../components/CreateMemory/CreateMemory'
import Faq from '../../components/Faq/Faq'
import Footer from '../../components/Footer/Footer'
import HomeHero from '../../components/HomeHero/HomeHero'
import HowItWorks from '../../components/HowItWorks/HowItWorks'
import Memory from '../../components/Memory/Memory'
import NavbarHome from '../../components/Navbar/NavbarHome'

import Preserve from '../../components/Preserve/Preserve'
import Pricing from '../../components/Pricing/Pricing'
import SafeAndSecure from '../../components/SafeAndSecure/SafeAndSecure'
import "./Home.css"

function Home() {
  return (
    <div className='home_container'>
      <Helmet>
        <title>Tribute to a love one - Create Tribute</title>
      </Helmet>
      <NavbarHome bgColor="#FFFAF6" iconColor="#76797F"/>
      <HomeHero/>
      <HowItWorks/>
      <Preserve/>
      <Memory/>
      <Pricing/>
      <SafeAndSecure/>
      <CreateMemory/>
      <Faq/> 
      <Footer/>
    </div>
  )
}

export default Home