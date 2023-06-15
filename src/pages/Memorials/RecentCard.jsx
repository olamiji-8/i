import React, { useEffect } from 'react'
import './Memorials.css'
import PrimaryBtn from '../../components/Buttons/PrimaryBtn'
import { useNavigate } from 'react-router-dom'
import { Capitalizer } from '../../utils/Capitalizer'
import moment from 'moment'

function RecentCard({ memorial }) {

  const navigate = useNavigate()

  const life_history = memorial?.life_history?.slice(0, 80)

  return (
    <div className='recent_card_con'>
      <div className="recentImage" style={{ backgroundImage: `url(${memorial?.image})` }}>
        <span className='memo_btn'>
          <PrimaryBtn
            txtColor="white"
            pd="5px 10px"
            br="5px"
            // w="200px"
            bg="var(--main)"
            hoverBG="whitesmoke"
            txt="Visit Memorial"
            fw="300"
            // onClick={() => navigate(`/memorial/${memorial?.uuid}`)}
            onClick={() =>
              window?.open(
                `/memorial/${memorial?.slug}`,
                "_blank",
                localStorage.setItem(
                  "testObject",
                  JSON?.stringify(memorial)
                )
              )
            }
          />
        </span>
      </div>
      <div className='recent_info' >
        <div className="memo_card_recent">
          <div className="circle_title_recent">{`${memorial?.user?.first_name?.charAt(0).toUpperCase()}${memorial?.user?.last_name?.charAt(0).toUpperCase()}`}</div>
          <div className="username_">
            <h3>{`${Capitalizer(memorial?.user?.first_name)} ${Capitalizer(memorial?.user?.last_name)}`}</h3>
            <p>{`${Capitalizer(memorial?.user?.role)} ${moment(memorial?.user?.created_at).format("DD MMM YYYY")}`}</p>
          </div>
        </div>
        {/* {
          console.log(memorial?.life_history, "memorial?.life_history")
        } */}
        <div className="memo_content_recent">
          <h3>{Capitalizer(memorial?.fullname)}</h3>
          <p>{`${moment(memorial?.date_of_birth).format('DD/MM/YYYY')} - ${moment(memorial?.date_of_death).format('DD/MM/YYYY')}`}</p>
          {memorial?.life_history ?
            <p dangerouslySetInnerHTML={{ __html: life_history }}></p>
            :
            null
          }
          <div><span>{memorial?.views_count} Views</span> &#8226; <span>{memorial?.tribute.length} Tributes</span></div>
        </div>
      </div>
    </div>
  )
}

export default RecentCard