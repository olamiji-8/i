import { Grid } from '@mui/material'
import React, { useState, useEffect } from 'react'
import CountrySelect from './CountrySelect'
import "./Pricing.css"
import PricingCard from './PricingCard'
import Premium from '../../assets/Premium.png'
import { useGetPlanAUD, useGetPlanNGN } from '../../api/useGetPlan'
import { PuffLoader } from 'react-spinners'
import { Local_storage } from '../../utils/LocalStorageConfig'
import { useNavigate } from 'react-router-dom'
// import {useQuery} from 'react-query'

function Pricing() {

  let navigate = useNavigate();

  const { isLoading, data: NGNresponse } = useGetPlanNGN("NGN")

  const { isLoading: isLoadingAUD, data: AUDresponse } = useGetPlanAUD("AUD")
  const [priceType, setpriceType] = useState('NGN')

  //function to add comma to a number
  const numberWithCommas = new Intl.NumberFormat("en-GB")

  //function to convert number to its english spelling
  var num = "Zero One Two Three Four Five Six Seven Eight Nine Ten Eleven Twelve Thirteen Fourteen Fifteen Sixteen Seventeen Eighteen Nineteen".split(" ");
  var tens = "Twenty Thirty Forty Fifty Sixty Seventy Eighty Ninety".split(" ");

  function number2words(n) {
    n = parseInt(n)
    if (n < 20) return num[n];
    var digit = n % 10;
    if (n < 100) return tens[~~(n / 10) - 2] + (digit ? "-" + num[digit] : "");
    if (n < 1000) return num[~~(n / 100)] + " hundred" + (n % 100 === 0 ? "" : " and " + number2words(n % 100));
    return number2words(~~(n / 1000)) + " thousand" + (n % 1000 !== 0 ? " " + number2words(n % 1000) : "");
  }

  const returnArrayValues = (value) => {
    let newValue = []
    value?.map((x) => {
      newValue = [...newValue,
      x?.value
      // number2words(x?.value)
      + " " + x?.name.charAt(0).toUpperCase() + x.name.slice(1).replace(/_/, " ")]
    })
    return [...newValue, "No Ads"]
  }

  if (isLoading || isLoadingAUD) {
    return (
      <div className='justify_center'>
        <PuffLoader color='var(--main)' loading={isLoading} speedMultiplier={1} size={100} />
      </div>
    )
  }
  return (
    <div className='price_container' id='pricing' >
      <div className="home_max_width">
        <div className="price_body">
          <div className="price_head">
            <h1>Pricing & Features</h1>
            <p>Create an online memorial in few easy steps</p>
          </div>
          <CountrySelect priceType={priceType} setpriceType={setpriceType} />
          {/* {
            console.log(AUDresponse, 'AUDresponse ')
          } */}

          {
            NGNresponse !== undefined && AUDresponse !== undefined ?
              priceType === "NGN" ?
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
                        buttonClick={() => {
                          Local_storage().get("_utk") !== "" ?
                            navigate('/create-memorial')
                            :
                            navigate('/sign-up')
                        }}
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
                        price={`₦${numberWithCommas.format(NGNresponse[1]?.price)}`}
                        subPeriod="/Year"
                        period={NGNresponse[1]?.name}
                        description={NGNresponse[1]?.description}
                        values={returnArrayValues(NGNresponse[1]?.features)}
                        buttonClick={() => {
                          Local_storage().get("_utk") !== "" ?
                            navigate('/create-memorial')
                            :
                            navigate('/sign-up')
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={4} className="add_padding_top each_price">
                      <PricingCard
                        titleColor="#231D4F"
                        subColor="#848199"
                        iconColor="var(--main)"
                        iconbgColor="var(--sub-main)"
                        btnColor="var(--sub-main)"
                        price={`₦${numberWithCommas.format(NGNresponse[2]?.price)}`}
                        subPeriod=""
                        period={NGNresponse[2]?.name}
                        description={NGNresponse[2]?.description}
                        values={returnArrayValues(NGNresponse[2]?.features)}
                        buttonClick={() => {
                          Local_storage().get("_utk") !== "" ?
                            navigate('/create-memorial')
                            :
                            navigate('/sign-up')
                        }}
                      />
                    </Grid>
                  </Grid>
                </div>
                :
                <div>
                  <Grid container spacing={2}>
                    {
                      AUDresponse[0]?.name &&

                      <Grid item xs={12} md={3} className="add_padding_top each_price">
                        <PricingCard
                          titleColor="#231D4F"
                          subColor="#848199"
                          iconColor="var(--main)"
                          iconbgColor="var(--sub-main)"
                          btnColor="var(--sub-main)"
                          price={`${numberWithCommas.format(AUDresponse[0]?.price)} AUD`}
                          subPeriod="/month"
                          period={AUDresponse[0]?.name}
                          description={AUDresponse[0]?.description}
                          values={returnArrayValues(AUDresponse[0]?.features)}
                          buttonClick={() => {
                            Local_storage().get("_utk") !== "" ?
                              navigate('/create-memorial')
                              :
                              navigate('/sign-up')
                          }}
                        />
                      </Grid>
                    }
                    <Grid item xs={12} md={3} className="add_padding_top each_price">
                      <PricingCard
                        titleColor="#231D4F"
                        subColor="#848199"
                        iconColor="var(--main)"
                        iconbgColor="var(--sub-main)"
                        btnColor="var(--sub-main)"
                        price={`${numberWithCommas.format(AUDresponse[1]?.price)} AUD`}
                        subPeriod="/month"
                        period={AUDresponse[1]?.name}
                        description={AUDresponse[1]?.description}
                        values={returnArrayValues(AUDresponse[1]?.features)}
                        buttonClick={() => {
                          Local_storage().get("_utk") !== "" ?
                            navigate('/create-memorial')
                            :
                            navigate('/sign-up')
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={3} className="each_price">
                      <PricingCard
                        badge
                        bgColor="var(--main)"
                        titleColor="white"
                        bgImage={Premium}
                        subColor="white"
                        iconColor="white"
                        iconbgColor="rgba(255,255,255,0.1)"
                        btnColor="white"
                        shadow="0px 42px 34px rgba(82, 67, 194, 0.3)"
                        price={`${numberWithCommas.format(AUDresponse[2]?.price)} AUD`}
                        subPeriod="/month"
                        period={AUDresponse[2]?.name}
                        description={AUDresponse[2]?.description}
                        values={returnArrayValues(AUDresponse[2]?.features)}
                        buttonClick={() => {
                          Local_storage().get("_utk") !== "" ?
                            navigate('/create-memorial')
                            :
                            navigate('/sign-up')
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={3} className="add_padding_top each_price">
                      <PricingCard
                        titleColor="#231D4F"
                        subColor="#848199"
                        iconColor="var(--main)"
                        iconbgColor="var(--sub-main)"
                        btnColor="var(--sub-main)"
                        price={`${numberWithCommas.format(AUDresponse[3]?.price)} AUD`}
                        subPeriod="/month"
                        period={AUDresponse[3]?.name}
                        description={AUDresponse[3]?.description}
                        values={returnArrayValues(AUDresponse[3]?.features)}
                        buttonClick={() => {
                          Local_storage().get("_utk") !== "" ?
                            navigate('/create-memorial')
                            :
                            navigate('/sign-up')
                        }}
                      />
                    </Grid>
                  </Grid>
                </div>
              :
              null
          }

        </div>
      </div>
    </div>
  )
}

export default Pricing