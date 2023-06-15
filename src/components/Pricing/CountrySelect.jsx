import React, { useEffect, useState } from 'react'
import "./Pricing.css"
import Nigeria from '../../assets/Nigeria.png'
import Australia from '../../assets/Australia.png'
import { FaChevronDown } from 'react-icons/fa'
import { useDashboardContext } from '../../contexts/DashboardContext/Dashboard'
import { Local_storage } from '../../utils/LocalStorageConfig'

function CountrySelect({ priceType, setpriceType }) {

    const [showOptions, setshowOptions] = useState(false);
    // const [user]
    const { dashdata } = useDashboardContext();


    // useEffect(() => {
    //     console.log(dashdata, 'dashdata')

    //     console.log(dashdata?.data?.user_details.country, 'dashdata')
    //     console.log(Local_storage().get("_utk"), '   Local_storage().get("_utk")')
    //     console.log(Local_storage().get("_eml"), '   Local_storage().get("_eml")')

    // }, [dashdata]);


    return (
        <div className='country_select'>
            {
                priceType === "NGN" ?
                    <div className="country_value" onClick={() => { setshowOptions(!showOptions); }}>
                        <img src={Nigeria} alt="NGN" width='30px' />
                        <span>NGN</span>
                        <FaChevronDown />
                    </div>
                    :
                    <div className="country_value" onClick={() => { setshowOptions(!showOptions); }}>
                        <img src={Australia} alt="AUD" width='30px' />
                        <span>AUD</span>
                        <FaChevronDown />
                    </div>
            }


            {/* {
                showOptions && dashdata.data.user_details.country.country === "Nigeria" && Local_storage().get("_utk") !== " " ?
                    <>
                        <div className="country_value" onClick={() => { setshowOptions(!showOptions); }}>
                            <img src={Nigeria} alt="NGN" width='30px' />
                            <span>NGN</span>
                            <FaChevronDown />
                        </div>
                    </> :
                    showOptions && <div className="country_options">
                        <div className="country_opt" onClick={() => { setshowOptions(!showOptions); setpriceType('NGN') }}>
                            <img src={Nigeria} alt="NGN" width='30px' />
                            <span>Nigerian Naira (NGN)</span>
                        </div>
                        <div className="country_opt" onClick={() => { setshowOptions(!showOptions); setpriceType('AUD') }}>
                            <img src={Australia} alt="AUD" width='30px' />
                            <span>Australian Dollar (AUD)</span>
                        </div>
                    </div>


            } */}


            {
                showOptions ?
                    <div className="country_options">
                        <div className="country_opt" onClick={() => { setshowOptions(!showOptions); setpriceType('NGN') }}>
                            <img src={Nigeria} alt="NGN" width='30px' />
                            <span>Nigerian Naira (NGN)</span>
                        </div>
                        <div className="country_opt" onClick={() => { setshowOptions(!showOptions); setpriceType('AUD') }}>
                            <img src={Australia} alt="AUD" width='30px' />
                            <span>Australian Dollar (AUD)</span>
                        </div>
                    </div>
                    :
                    null
            }

        </div>
    )
}

export default CountrySelect