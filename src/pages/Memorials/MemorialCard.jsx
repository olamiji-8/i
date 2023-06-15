import React from 'react'
import './Memorials.css'
import PrimaryBtn from '../../components/Buttons/PrimaryBtn'
import { FaFacebookF } from 'react-icons/fa'
import { BsWhatsapp, BsTwitter } from 'react-icons/bs'
import IconButton from '../../components/IconButton/IconButton'
import NameCircle from '../../components/NameCircle/NameCircle'
import Copy from '../../components/Copy'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { FacebookShareButton, TwitterShareButton, InstapaperShareButton, WhatsappShareButton } from "react-share";
import { Editor, EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Local_storage } from '../../utils/LocalStorageConfig'


function MemorialCard({ memorial, link_to_share }) {
  let navigate = useNavigate()
  const life_history = memorial?.life_history?.slice(0, 80)
  // console.log(memorial?.life_history, 'life_history')
  // const contentState = life_history?.startsWith("<p>") ? "" : convertFromRaw(JSON.parse(life_history));
  // const editorState = contentState !== "" && EditorState.createWithContent(contentState);

  return (
    <div className="memo_card_con">
      <NameCircle
        name={
          memorial?.user.first_name.charAt(0).toUpperCase() +
          memorial?.user.first_name.slice(1).toLowerCase() +
          " " +
          memorial?.user.last_name.charAt(0).toUpperCase() +
          memorial?.user.last_name.slice(1).toLowerCase()
        }
        role={memorial?.user.role}
        date={memorial?.created_at}
      />
      <div className="memo_card_body">
        <div className="image_cont">
          <div
            className="image_house"
            style={{ backgroundImage: `url(${memorial?.image})` }}
          >
            <span className="memo_btn">
              <span className="showDesktop">
                <PrimaryBtn
                  txtColor="white"
                  pd="5px 10px"
                  br="5px"
                  bg="var(--main)"
                  hoverBG="var(--main)"
                  txt="Visit Memorial"
                  fw="300"
                  onClick={() =>
                    window?.open(
                      `/memorial/${memorial?.slug}`,
                      "_blank",
                      localStorage.setItem(
                        "testObject",
                        JSON?.stringify(memorial)
                      )
                      ,
                      Local_storage().set(
                        "nodi_data",
                        `${JSON.stringify({ memorial })}`
                      ),
                    )
                  }
                />
              </span>
            </span>

            <span className="memo_btn">
              <span className="showMobile">
                <PrimaryBtn
                  fs="9px"
                  pd="3px 5px"
                  fw="400"
                  txt="Visit Memorial"
                  bg="var(--main)"
                  txtColor="#FFFFF"
                  hoverBG="var(--main)"
                  onClick={() =>
                    window?.open(
                      `/memorial/${memorial?.slug}`,
                      "_blank",
                      localStorage.setItem(
                        "testObject",
                        JSON.stringify(memorial)
                      )
                    )
                  }
                />
              </span>
            </span>
          </div>
        </div>
        <div className="memo_content">
          <h3
            onClick={() =>
              window.open(
                `/memorial/${memorial?.slug}`,
                "_blank",
                localStorage.setItem("testObject", JSON.stringify(memorial))
              )
            }
          >
            {memorial?.fullname}
          </h3>
          <p>
            {moment(memorial?.date_of_birth).format("DD/MM/YYYY") +
              " - " +
              moment(memorial?.date_of_death).format("DD/MM/YYYY")}
          </p>
          <p>{`“ Let the Memory of ${memorial?.fullname} be with us forever”`}</p>

          {
            life_history?.startsWith("<p>") ?
              <div className='memo_quote'
                dangerouslySetInnerHTML={{ __html: life_history }}
              ></div>

              : null
          }





          {/* {
            console.log(life_history, 'lifehistoryyyy')
          } */}














          {/* <div className='memo_quote'>This memorial website was created in memory of our loved one, Magbodi Johnson 80 years old , born on Sept 02, 1980 and passed away on Aug 19, 2021. We will remember him forever.</div> */}
          <div className="_icons">
            <span>{memorial?.views_count} Views</span> &#8226;{" "}
            <span>{memorial?.tribute.length} Tributes</span>
          </div>
          <div className="showDesktop">
            <div className="social_icons ">
              {/* <InstapaperShareButton url={link_to_share}>
                <IconButton bg="var(--sub-main)" width="32px" height="32px" icon={<GrInstagram color='var(--main)' size={18} />} />
              </InstapaperShareButton> */}

              <WhatsappShareButton url={link_to_share}>
                <IconButton
                  bg="var(--sub-main)"
                  width="32px"
                  height="32px"
                  icon={<BsWhatsapp color="var(--main)" size={18} />}
                />
              </WhatsappShareButton>

              <TwitterShareButton url={link_to_share}>
                <IconButton
                  bg="var(--sub-main)"
                  width="32px"
                  height="32px"
                  icon={<BsTwitter color="var(--main)" size={18} />}
                />
              </TwitterShareButton>

              <FacebookShareButton url={link_to_share}>
                <IconButton
                  bg="var(--sub-main)"
                  width="32px"
                  height="32px"
                  icon={<FaFacebookF color="var(--main)" size={18} />}
                />
              </FacebookShareButton>
            </div>
          </div>
          <div className="showMobile">
            <div className=" social_icons ">
              {/* <InstapaperShareButton url={link_to_share}>
                <IconButton bg="var(--sub-main)" width="14px" height="14px" icon={<GrInstagram color='var(--main)' size={9} />} />
              </InstapaperShareButton> */}
              <WhatsappShareButton url={link_to_share}>
                <IconButton
                  bg="var(--sub-main)"
                  width="14px"
                  height="14px"
                  icon={<BsWhatsapp color="var(--main)" size={9} />}
                />
              </WhatsappShareButton>
              <TwitterShareButton url={link_to_share}>
                <IconButton
                  bg="var(--sub-main)"
                  width="14px"
                  height="14px"
                  icon={<BsTwitter color="var(--main)" size={9} />}
                />
              </TwitterShareButton>
              <FacebookShareButton url={link_to_share}>
                <IconButton
                  bg="var(--sub-main)"
                  width="14px"
                  height="14px"
                  icon={<FaFacebookF color="var(--main)" size={9} />}
                />
              </FacebookShareButton>
            </div>
          </div>
          <div className="justify_center">
            <Copy email={link_to_share} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemorialCard;
