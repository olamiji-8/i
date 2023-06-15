import React from 'react'
import ShadowCard from './ShadowCard'
import "./ViewBody.css"
import AboutView from './AboutView/AboutView'
import Footer from '../Footer/Footer'
import LifeView from './AboutView/LifeView'
import GalleryView from './GalleryView/GalleryView'
import StoryView from './StoryView/StoryView'
import TributeView from './TributeView/TributeView'
import NameCircle from '../NameCircle/NameCircle'

function PreviewBody({ activeTab, memorial }) {

  return (
    <div className='view_body_container'>
      {/* {
        console.log(memorial, 'memoriallll')
      } */}
      <div className="home_max_width">
        <div className="view_body_body">
          <div className="memo_view_body_card_title">
            <NameCircle
              name={memorial?.user?.first_name?.charAt(0)?.toUpperCase() + memorial?.user?.first_name?.slice(1)?.toLowerCase()
                + " " +
                memorial?.user?.last_name?.charAt(0)?.toUpperCase() + memorial?.user?.last_name?.slice(1)?.toLowerCase()}
              role={memorial?.user?.role}
              date={memorial?.created_at}
            />
          </div>

          <div className="memo_view_body">

            <div className="memo_view_body_left">
              {
                activeTab === "About" ?
                  <AboutView from='preview' fullname={memorial?.fullname} memo_id={memorial?.uuid} biography={memorial?.biography} memorial={memorial} />
                  :
                  activeTab === "Life" ?
                    <LifeView from='preview' fullname={memorial?.fullname} memo_id={memorial?.uuid} life_history={memorial?.life_history} />
                    :
                    activeTab === "Gallery" ?
                      <GalleryView from='preview' fullname={memorial?.fullname} memo_id={memorial?.uuid} gallery={memorial?.gallery} />
                      :
                      activeTab === "Stories" ?
                        <StoryView from='preview' fullname={memorial?.fullname} memo_id={memorial?.uuid} story={memorial?.story} />
                        :
                        activeTab === "Tributes" ?
                          <TributeView from='preview' fullname={memorial?.fullname} memo_id={memorial?.uuid} tributes={memorial?.tribute} memorial={memorial} />
                          :
                          null
              }
            </div>

            <div className="memo_view_body_right">
              <ShadowCard>
                <div className="memo_view">
                  {memorial?.views_count} View(s)
                </div>
              </ShadowCard>
              <ShadowCard>
                <div style={{ padding: '20px' }}>
                  <div className="memo_created_by">
                    Created By
                  </div>
                  <div className="memo_created_name">
                    {memorial?.user?.first_name?.charAt(0)?.toUpperCase() + memorial?.user?.first_name?.slice(1)?.toLowerCase()
                      + " " +
                      memorial?.user?.last_name?.charAt(0)?.toUpperCase() + memorial?.user?.last_name?.slice(1)?.toLowerCase()}
                  </div>
                </div>
              </ShadowCard>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default PreviewBody