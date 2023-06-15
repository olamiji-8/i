import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import ContactForm from '../../components/ContactForm'
import ContactMap from '../../components/ContactMap'
import CreateMemory from '../../components/CreateMemory/CreateMemory'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import OverLayHeader from '../../components/OverLayHeader/OverLayHeader'
import "./ContactUs.css"
import {Helmet} from 'react-helmet'

function ContactUs() {
  useEffect(() => {
    window.scrollTo(0,0)
  }, [])
  return (
    <div>
       <Helmet>
        <title>Contact us - Create Tribute</title>
      </Helmet>
      <Navbar mobilebgColor="" bgColor="var(--sub-main)" iconColor="#76797F"/>
      <OverLayHeader title="CONTACT US"/>
      <div className="home_max_width">
        <Grid container spacing={4} className="container_contact">
          <Grid item xs={12} sm={6} md={7}>
            <ContactForm/>
          </Grid>
          <Grid item xs={12} sm={6} md={5}>
            <ContactMap/>
          </Grid>
        </Grid>
      </div>
      
      <CreateMemory/>
      <Footer/>
    </div>
  )
}

export default ContactUs