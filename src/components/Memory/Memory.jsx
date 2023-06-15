import React from 'react'
import "./Memory.css"
import { useGetRecentMemo } from '../../api/useGetRecentMemo';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Avatar } from '@mui/material';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';


function Memory() {

  let a = ''
  const { isLoading, data } = useGetRecentMemo()

  var host = window.location.protocol + "//" + window.location.host;

  const breakpoint = {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    520: {
      slidesPerView: 1,
      spaceBetween: 30
    },
    950: {
      slidesPerView: 2,
      spaceBetween: 40
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 40
    }
  }
  const formatData = data?.map((obj, i) => ({ ...obj, life_history: obj?.life_history?.slice(0, 35) }));


  return (
    <div className="memoryoverall">

      <div className="memory-with">
        <div className='memorial-containers'  >
          <div className='memory-width' >
            <div className="memorialdiv">

              {/* <div className='memorial0ne'  > */}
              <h1 className="recentmomorial">
                Recent Memorials
              </h1>
              {/* </div> */}
            </div>
          </div>
          <div className="memorialscarousel">
            {
              isLoading ?
                <div className='justify_center'>
                  <PuffLoader color='white' loading={isLoading} speedMultiplier={1} size={100} />
                </div>
                :
                <Swiper
                  breakpoints={breakpoint}
                  spaceBetween={30}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Pagination]}
                  className="mySwiper"
                >
                  {
                    formatData?.map((memo, i) => (
                      <SwiperSlide key={i}>
                        <div className='rowandcolumn'  >
                          <div className="carousel1">
                            <Avatar alt="photo" src={memo?.image} sx={{ width: 50, height: 50 }} />
                            <p className="carousel_name">{memo?.fullname}</p>
                            <span>
                              {memo?.life_history === undefined || memo?.life_history.startsWith("{") ?
                                `Let the Memory of ${memo?.fullname?.split(" ")[0]} be with us forever`
                                :
                                <p dangerouslySetInnerHTML={{ __html: memo?.life_history }}></p>
                              }
                            </span>
                          </div>
                          <div className='sub-memory' >
                            <p className='memorial-date' >{moment(memo?.date_of_birth).format("DD/MM/YYYY")} - {moment(memo?.date_of_death).format("DD/MM/YYYY")}</p>
                            <a className='memorial-link' style={{ textDecoration: 'none' }} href={`${host}/memorial/${memo?.slug}`} target="_blank" rel="noopener noreferrer">

                              <span className='memorial-name'>Visit Memorial</span>
                            </a>
                          </div>

                        </div>
                      </SwiperSlide>
                    ))
                  }
                </Swiper>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Memory