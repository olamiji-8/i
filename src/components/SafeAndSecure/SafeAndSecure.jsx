import { Grid } from '@mui/material'
import IconButton from '../IconButton/IconButton'
import React from 'react'
import "./SafeAndSecure.css"
import { MdLock } from 'react-icons/md'
import { BiShieldQuarter } from 'react-icons/bi'
import { RiAwardLine } from 'react-icons/ri'
import Secure from '../../assets/Secure.png'

function SafeAndSecure() {
  return (
    <div className='safe_container'>
      <div className="home_max_width">
        <div className="safe_body">
          <Grid container style={{alignItems:'center'}}>
            <Grid item xs={12} md={3} lg={5}>
              <h1>Safe and Secure</h1>
              <div className='secure_img' style={{ backgroundImage: `url(${Secure})`}}>

              </div>
            </Grid>
            <Grid item xs={12} md={9} lg={7}>
              <DataCard 
                color="white"
                bg="var(--main)"
                icon={<RiAwardLine color='var(--main)' size={32} />}
                head="DATA SECURITY"
                desc="We prioritize protecting your data. Our secure servers ensure that no third-party is granted access to your personal information. We collect and use your personal data to constantly improve your user experience."
                />
              <DataCard 
                icon={<BiShieldQuarter color='var(--main)' size={32} />}
                head="BANK LEVEL SECURITY"
                desc="Our Payment processors are PCIDSS compliant to ensure optimum security of your data electronically and all payment transactions are encrypted and protected using 256-bit AES bank-level encryption."
                color="var(--black)"
                bg="var(--sub-main)"
                />
              <DataCard 
                icon={<MdLock color='var(--main)' size={32} />}
                head="SSL SECURITY"
                desc="Create Tribute protects the security of your information with the latest encryption techniques and Secure Socket Layer(SSL) transmission protocol, this provides security between your devices and our servers ensuring your personal details are always kept private."
                color="var(--black)"
                bg="var(--sub-main)"
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  )
}

export default SafeAndSecure

const DataCard = ({icon, bg, head, desc, color}) =>(
  <div className='data_card' style={{backgroundColor:bg}}>
    <div className='showDesktop'>
      <IconButton bg="white" width="90px" height="90px" icon={icon}/>
    </div>
    <div className='showMobile'>
      <IconButton bg="white" width="50px" height="50px" icon={icon}/>
    </div>
    <div style={{color: color}}>
      <div className='data_head'>{head}</div>
      <div className='data_desc'>{desc}</div>
    </div>
  </div>
)