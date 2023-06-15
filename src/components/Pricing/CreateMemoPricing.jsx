import { Grid } from '@mui/material'
import React, { useState } from 'react'
import CountrySelect from './CountrySelect'
import "./Pricing.css"
import PricingCard from './PricingCard'
import Premium from '../../assets/Premium.png'
import { useGetPlanAUD, useGetPlanNGN } from '../../api/useGetPlan'
import { PuffLoader } from 'react-spinners'
import { useDashboardContext } from '../../contexts/DashboardContext/Dashboard'
import { Local_storage } from '../../utils/LocalStorageConfig'

function CreateMemoPricing({clickPlan}) {

 const country = Local_storage().get("_count")
 
 const { isLoading, data : NGNresponse } = useGetPlanNGN("NGN")

  const { isLoading: isLoadingAUD, data: AUDresponse } = useGetPlanAUD("AUD")
  const [priceType, setpriceType] = useState('NGN')
  const returnArrayValues = (value) =>{
    let newValue = []
    value?.map((x)=>{
     newValue = [...newValue, 
       x?.value
       // number2words(x?.value)
       + " " + x?.name.charAt(0).toUpperCase()+x.name.slice(1).replace(/_/, " ") ]
    })
    return [...newValue, "No Ads"]
   }

  const numberWithCommas = new Intl.NumberFormat("en-GB")

   if(isLoading || isLoadingAUD){
    return (
      <div className='justify_center'>
      <PuffLoader color='var(--main)' loading={isLoading} speedMultiplier={1} size={100} />
    </div>
    )
  }

  return (
    
        <div className="price_body_create">
   {/* {
    console.log(country,"countrycountry")
   } */}
          {/* <CountrySelect priceType={priceType} setpriceType={setpriceType} /> */}
          {
            NGNresponse !== undefined && AUDresponse !== undefined ?

            country === "Nigeria" ?
              <div>
                <Grid container>
                  <Grid item xs={12} md={4} className="add_padding_top each_price">
                    <PricingCard
                      titleColor="#231D4F"
                      subColor="#848199"
                      iconColor="var(--main)"
                      iconbgColor="var(--sub-main)"
                      btnColor="var(--sub-main)"
                      price={NGNresponse[0]?.slug.charAt(0).toUpperCase() + NGNresponse[0]?.slug.slice(1)}
                      subPeriod=""
                      period={NGNresponse[0]?.name}
                      description={NGNresponse[0]?.description}
                      values={returnArrayValues(NGNresponse[0]?.features)}
                      buttonClick={() => clickPlan(NGNresponse[0]?.slug, NGNresponse[0]?.name, NGNresponse[0]?.currency, NGNresponse[0]?.id, NGNresponse[0]?.price)}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} className="each_price" >
                    <PricingCard
                      badge
                      bgColor="var(--main)"
                      titleColor="white"
                      subColor="white"
                      iconColor="white"
                      iconbgColor="rgba(255,255,255,0.1)"
                      btnColor="white"
                      bgImage={Premium}
                      shadow="0px 42px 34px rgba(82, 67, 194, 0.3)"
                      price= {`₦${numberWithCommas.format(NGNresponse[1]?.price)}`}
                      subPeriod="/Year"
                      period={NGNresponse[1]?.name}
                      description={NGNresponse[1]?.description}
                      values={returnArrayValues(NGNresponse[1]?.features)}
                      buttonClick={() => clickPlan(NGNresponse[1]?.slug, NGNresponse[1]?.name, NGNresponse[1]?.currency, NGNresponse[1]?.id, NGNresponse[1]?.price)}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} className="add_padding_top each_price">
                    <PricingCard
                      titleColor="#231D4F"
                      subColor="#848199"
                      iconColor="var(--main)"
                      iconbgColor="var(--sub-main)"
                      btnColor="var(--sub-main)"
                      price= {`₦${numberWithCommas.format(NGNresponse[2]?.price)}`}
                      subPeriod=""
                      period={NGNresponse[2]?.name}
                      description={NGNresponse[2]?.description}
                      values={returnArrayValues(NGNresponse[2]?.features)}
                      buttonClick={() => clickPlan(NGNresponse[2]?.slug, NGNresponse[2]?.name, NGNresponse[2]?.currency, NGNresponse[2]?.id, NGNresponse[2]?.price)}
                    />
                  </Grid>
                </Grid>
              </div>
              :
              <div>
              <Grid container spacing={2}>
                  <Grid item xs={12} md={3} className="add_padding_top each_price" >
                    <PricingCard
                      titleColor="#231D4F"
                      subColor="#848199"
                      iconColor="var(--main)"
                      iconbgColor="var(--sub-main)"
                      btnColor="var(--sub-main)"
                      price= {`${numberWithCommas.format(AUDresponse[0]?.price)} AUD`}
                      subPeriod="/month"
                      period={AUDresponse[0]?.name}
                      description={AUDresponse[0]?.description}
                      values={returnArrayValues(AUDresponse[0]?.features)}
                      buttonClick={() => clickPlan(AUDresponse[0]?.slug, AUDresponse[0]?.name, AUDresponse[0]?.currency, AUDresponse[0]?.id, AUDresponse[0]?.price)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} className="add_padding_top each_price">
                    <PricingCard
                      titleColor="#231D4F"
                      subColor="#848199"
                      iconColor="var(--main)"
                      iconbgColor="var(--sub-main)"
                      btnColor="var(--sub-main)"
                      price= {`${numberWithCommas.format(AUDresponse[1]?.price)} AUD`}
                      subPeriod="/month"
                      period={AUDresponse[1]?.name}
                      description={AUDresponse[1]?.description}
                      values={returnArrayValues(AUDresponse[1]?.features)}
                      buttonClick={() => clickPlan(AUDresponse[1]?.slug, AUDresponse[1]?.name, AUDresponse[1]?.currency, AUDresponse[1]?.id, AUDresponse[1]?.price)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} className="each_price">
                    <PricingCard
                      badge
                      bgColor="var(--main)"
                      titleColor="white"
                      bgImage= {Premium} 
                      subColor="white"
                      iconColor="white"
                      iconbgColor="rgba(255,255,255,0.1)"
                      btnColor="white"
                      shadow="0px 42px 34px rgba(82, 67, 194, 0.3)"
                      price= {`${numberWithCommas.format(AUDresponse[2]?.price)} AUD`}
                      subPeriod="/month"
                      period={AUDresponse[2]?.name}
                      description={AUDresponse[2]?.description}
                      values={returnArrayValues(AUDresponse[2]?.features)}
                      buttonClick={() => clickPlan(AUDresponse[2]?.slug, AUDresponse[2]?.name, AUDresponse[2]?.currency, AUDresponse[2]?.id, AUDresponse[2]?.price)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} className="add_padding_top each_price">
                    <PricingCard
                      titleColor="#231D4F"
                      subColor="#848199"
                      iconColor="var(--main)"
                      iconbgColor="var(--sub-main)"
                      btnColor="var(--sub-main)"
                      price= {`${numberWithCommas.format(AUDresponse[3]?.price)} AUD`}
                      subPeriod="/month"
                      period={AUDresponse[3]?.name}
                      description={AUDresponse[3]?.description}
                      values={returnArrayValues(AUDresponse[3]?.features)}
                      buttonClick={() => clickPlan(AUDresponse[3]?.name, AUDresponse[3]?.name, AUDresponse[3]?.currency, AUDresponse[3]?.id, AUDresponse[3]?.price)}
                    />
                  </Grid>
                </Grid>
                </div>
                :
                null
          }

        </div>
  )
}

export default CreateMemoPricing