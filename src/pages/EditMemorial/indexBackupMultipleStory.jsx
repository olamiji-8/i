import React, { useEffect, useState } from 'react'
import { AiOutlineCloseCircle, AiOutlineDelete, AiOutlineMenu } from 'react-icons/ai'
import './style.css'
import { MdVisibility } from 'react-icons/md'
import { Grid } from '@mui/material'
import PrimaryBtn from '../../components/Buttons/PrimaryBtn'
import ShadowCard from '../../components/ViewBody/ShadowCard'
import Copy from '../../components/Copy'
import { EditorState } from 'draft-js';
import Wysiwug from '../../components/Wysiwug'
import IconButton from '../../components/IconButton/IconButton'
import { FiPlus } from 'react-icons/fi'
import imageCompression from "browser-image-compression";
import { GrInstagram } from 'react-icons/gr'
import { BsTwitter, BsWhatsapp } from 'react-icons/bs'
import { FaFacebookF } from 'react-icons/fa'
import Aside from '../../components/Aside'
import { useUserSingleMemo } from '../../api/useMemorial'
import { useNavigate, useParams } from 'react-router-dom'
import { useUserSingleMemorialContext } from '../../contexts/MemorialContext/UserSingleMemorialContext'
import AuthAxios from '../../utils/AuthAxios'
// import useSingleUserMemo from '../../api/useSingleUserMemo'
import { ContentState, convertFromHTML } from 'draft-js'
import moment from 'moment'
import { BiLink } from 'react-icons/bi'

import {
    // convertFromHTML,
    convertToHTML
} from 'draft-convert';
import BackDrop from '../../components/BackDrop'
import { FacebookShareButton, InstapaperShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share'
import { useForm } from 'react-hook-form'

const EditMemorial = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const navigate = useNavigate()

    const { slug } = useParams()

    var host = window.location.protocol + "//" + window.location.host;
    const link_to_share = `${host}/memorial/${slug}`

    const [user_memorial, setUser_memorial] = useState(null)

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // if(user_memorial === null){
        setLoading(true);
        AuthAxios
            .get(`/memorial/${slug}`)
            .then((response) => {
                updatePage(response.data)
            })
            .catch((err) => {
                setError(err);
                // console.log(err)
            })
            .finally(() => {
                setLoading(false);
            });
        // }
    }, [slug]);

    // const { loading, user_memorial, error, refetch } = useSingleUserMemo(`/memorial/${slug}`)

    const updatePage = (res) => {
        // console.log(res.data, "responshhe");
        setUser_memorial(res.data);
        setfullname(res.data?.fullname)
        setemail(res.data?.user?.email)
        setGalleries_from_BE(res.data?.gallery)
        setStories_from_BE(res.data?.story)
        settype(res.data?.type)
        setcreated_expire([res.data?.created_at, res.data?.plan_expiry_date])
        setdob(res.data?.date_of_birth)
        setdod(res.data?.date_of_death)
        setdecease_image(res.data?.image)
        setactivities(res.data?.activities)
        setPlan_type(res.data?.plan?.slug)

        setvalueBiography(
            () => EditorState.createWithContent(
                ContentState.createFromBlockArray(
                    convertFromHTML(`${res?.data?.biography === null ? "" : res?.data?.biography}`)
                )
            ),
        )

        setvalueHistory(
            () => EditorState.createWithContent(
                ContentState.createFromBlockArray(
                    convertFromHTML(`${res?.data?.life_history === null ? "" : res?.data?.life_history}`)
                )
            ),
        )
    }

    const [fullname, setfullname] = useState('');
    const [email, setemail] = useState('')
    const [valueBiography, setvalueBiography] = useState();
    const [valueHistory, setvalueHistory] = useState();
    const [galleries_from_BE, setGalleries_from_BE] = useState([])
    const [galleries_to_BE, setGalleries_to_BE] = useState([])
    const [galleries, setGalleries] = useState([])
    const [showImageSpace, setShowImageSpace] = useState(false)
    const [stories, setStories] = useState([]);
    const [stories_from_BE, setStories_from_BE] = useState([])
    const [showStory, setshowStory] = useState(false)
    const [type, settype] = useState('public')
    const [created_expire, setcreated_expire] = useState([])
    const [dob, setdob] = useState('')
    const [dod, setdod] = useState('')
    const [decease_image, setdecease_image] = useState('')
    const [decease_image_to_send, setdecease_image_to_send] = useState(null)
    const [activities, setactivities] = useState([])
    const [plan_type, setPlan_type] = useState('')

    const [isActive, setActive] = useState(false);

    const [story_text, setstory_text] = useState('')
    const [story_image, setstory_image] = useState('')

    // story format
    // story = {
    //     text:'hhhhhhh',
    //     image:['img_url','image_url']
    // }


    const addNewStory = () => {
        setshowStory(true);
        setStories([...stories, { text: story_text, image: story_image }])
    }
    const removeNewStory = (index) => {
        const story = Object.assign([], stories);
        story.splice(index, 1);
        setStories(story);
    }

    const editMode = () => {
        setshowStory(true);
    }

    const Toggle = () => {
        setActive(!isActive);
    };

    const Add_story = ({ deleteClick }) => (
        <ShadowCard>
            <div className="edit_card">

                <input type="file" {...registerStoryAttachment("attach_image")} name="attach_image" id="attach_image" accept="image/x-png,image/gif,image/jpeg" style={{ display: 'none' }} />

                <textarea name="story_area" value={story_text} onChange={(e) => setstory_text(e.target.value)} placeholder='Tell a story |' id="story_area" rows="5"></textarea>
                <div className="space_between">
                    <div>
                        <label htmlFor="attach_image" className="icon_text" style={{ color: 'var(--main)' }}>
                            <BiLink size={24} />
                            <span>Attach image</span>
                        </label>
                    </div>
                    <div onClick={deleteClick} className="icon_text" style={{ color: '#EA532A' }}>
                        <AiOutlineDelete size={24} />
                        <span>Delete</span>
                    </div>
                </div>
            </div>
        </ShadowCard>
    )

    const { register: registerStoryAttachment, watch: watchAttachment } = useForm();

    useEffect(() => {
        const subscription = watchAttachment((data) => {
            attachImage(data.attach_image)
        })
        return () => subscription.unsubscribe();
    }, [watchAttachment]);

    const attachImage = (file) => {
        if (file && file[0]) {
            setstory_image(file[0])

            // var options = { maxSizeMB: 3,  maxWidthOrHeight: 512};
            // const output = await imageCompression(file[0], options);
            // const dataa = await imageCompression.getDataUrlFromFile(output);
        }

    }


    const { register, watch } = useForm();

    useEffect(() => {
        const subscription = watch((data) => {
            addDeceaseImage(data.decease_img)
        })
        return () => subscription.unsubscribe();
    }, [watch]);


    const addDeceaseImage = async (file) => {
        if (file && file[0]) {
            setdecease_image_to_send(file[0])

            var options = { maxSizeMB: 3, maxWidthOrHeight: 512 };
            const output = await imageCompression(file[0], options);
            const dataa = await imageCompression.getDataUrlFromFile(output);
            setdecease_image(dataa)

            setShowImageSpace(true);
        }
    }

    const removeDeceaseImage = (index) => {
        setdecease_image('')
        setdecease_image_to_send(null);
    }

    const { register: registerGalleries, watch: watchGallaries } = useForm();

    useEffect(() => {
        const subscription = watchGallaries((data) => {
            imageHandler(data.galleries)
        })
        return () => subscription.unsubscribe();
    }, [watchGallaries]);


    const imageHandler = async (file) => {
        if (file && file[0]) {

            galleries_to_BE.push(file[0])

            var options = { maxSizeMB: 5, maxWidthOrHeight: 512, };
            const output = await imageCompression(file[0], options);
            const dataa = await imageCompression.getDataUrlFromFile(output);

            setGalleries((prev) => [...prev, dataa])
        }
        setShowImageSpace(true);
    }

    const removeImage = (index) => {
        const image = Object.assign([], galleries);
        image.splice(index, 1);
        setGalleries(image);

        const image_to_send = Object.assign([], galleries_to_BE);
        image_to_send.splice(index, 1);
        setGalleries_to_BE(image_to_send);
    }

    const changeType = (type) => {
        AuthAxios
            .post(`/memorial/type/change/${user_memorial?.uuid}`, {
                "type": type
            })
            .then((response) => {
                // console.log(response)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const UpdateMemo = () => {
        var formdata = new FormData();
        // const formDate = {
        for (var i = 0; i < galleries_to_BE.length; i++) {
            formdata.append(`gallery[${i}]`, galleries_to_BE[i]);
        }

        formdata.append("fullname", fullname)
        formdata.append("biography", convertToHTML(valueBiography.getCurrentContent()))
        formdata.append("life_history", convertToHTML(valueHistory.getCurrentContent()))
        formdata.append("type", type)
        formdata.append("date_of_birth", moment(dob).format("YYYY-MM-DD"))
        formdata.append("date_of_death", moment(dod).format("YYYY-MM-DD"))
        formdata.append("image", decease_image_to_send === null ? '' : decease_image_to_send)
        formdata.append("story", stories)
        // }

        AuthAxios.post(`/memorial/${user_memorial?.uuid}`, formdata)
            .then((res) => {
                // console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                console.log('finally')
            })
    }

    if (loading) {
        return (
            <BackDrop open={loading} />
        )
    }

    return (
        <div className="grid-container">
            {/* {console.log(user_memorial, "user_memorialuser_memorial")} */}
            <div className="menu-icon" onClick={Toggle}>
                <AiOutlineMenu className="header__menu" />
            </div>
            <aside className={` sidenav ${isActive ? " active" : null}`}>
                <div onClick={Toggle} className="sidenav__close-icon-" >
                    <AiOutlineCloseCircle />
                </div>
                <Aside />
            </aside>

            <section className="main">
                <div className="publish_sec">
                    <h3 className='publish_title'>Memorial</h3>
                    <div className='showDesktop'>
                        <div className='doublebtn'>
                            <PrimaryBtn
                                txtColor="#8F92A1" pd="5px" br="7px" w="120px" bg="white" hoverBG="whitesmoke" txt="Save" fw="400" border="#8F92A1"
                                onClick={() => console.log('clicked')}
                            />
                            <PrimaryBtn
                                txtColor="white" pd="5px" br="7px" w="120px" bg="var(--main)" hoverBG="whitesmoke" txt="Publish" border="var(--main)" fw="400"
                                onClick={UpdateMemo}
                            />
                        </div>
                    </div>
                    <div className='showMobile'>

                        <div className='doublebtn'>
                            <PrimaryBtn
                                txtColor="#8F92A1" pd="3px 5px" br="7px" w="70px" bg="white" hoverBG="whitesmoke" txt="Save" fw="400" border="#8F92A1"
                                onClick={() => console.log('clicked')}
                            />
                            <PrimaryBtn
                                txtColor="white" pd="3px 5px" br="7px" w="70px" bg="var(--main)" hoverBG="whitesmoke" txt="Publish" border="var(--main)" fw="400"
                                onClick={UpdateMemo}
                            />
                        </div>
                    </div>
                </div>
                <div className="edit_body">
                    <Grid container spacing={{ xs: 3, md: 4 }}>
                        <Grid item xs={12} md={8}>
                            <ShadowCard>
                                <input className='input_shadow' type="text" onChange={(e) => setfullname(e.target.value)} value={fullname} />
                            </ShadowCard>

                            <div className='permalinkss'>
                                <span>Permalink: </span>
                                <Copy email={link_to_share} />
                            </div>
                            <div className="editor_container">
                                <div>
                                    <div className='titl_h'>About</div>
                                    <div className="titl_s">Create a short biography</div>
                                    <ShadowCard>
                                        <Wysiwug valueState={valueBiography} setvalueState={setvalueBiography} />
                                    </ShadowCard>

                                </div>
                                <div>
                                    <div className='titl_h'>Life History</div>
                                    <div className="titl_s">Create detailed life history</div>
                                    <ShadowCard>
                                        <Wysiwug valueState={valueHistory} setvalueState={setvalueHistory} />
                                    </ShadowCard>

                                </div>
                                {
                                    plan_type.toLowerCase() === 'free' ?
                                        <>
                                            <div>
                                                <div className='titl_h'>Gallery</div>
                                                <div className="titl_s">Upload images</div>
                                                <div className="gallery_content">
                                                    {
                                                        galleries_from_BE.map((galla) => (
                                                            <div className="galla_card" style={{ backgroundImage: `url(${galla?.file_url})` }}></div>
                                                        ))
                                                    }
                                                    {
                                                        galleries.length === 0 ?
                                                            <>
                                                                <input
                                                                    {...registerGalleries('galleries')}
                                                                    style={{ display: "none" }}
                                                                    id="galleries"
                                                                    name="galleries"
                                                                    type="file"
                                                                    accept="image/x-png,image/gif,image/jpeg"
                                                                // onChange={imageHandler}
                                                                />
                                                                <label htmlFor="galleries" className="upload">
                                                                    <div className="galla_card">
                                                                        <IconButton bg="var(--sub-main)" width="50px" height="50px" icon={<FiPlus color='var(--main)' size={28} />} onClick={() => console.log('clicked')} />
                                                                        <span>Add Image or video</span>
                                                                    </div>
                                                                </label>
                                                            </>
                                                            :
                                                            <div className='galla_card_cont'>
                                                                <div className="galla_card" style={{ backgroundImage: `url(${galleries[0]})` }}></div>
                                                                <div className='deleter' onClick={() => setGalleries([])}>
                                                                    <AiOutlineDelete size={24} />
                                                                    <span>Delete</span>
                                                                </div>
                                                            </div>
                                                    }
                                                    <div className="subCard">
                                                        <span>You are currently subscribe to a free plan.
                                                            Upgrade your subscription to add more images to gallery</span>
                                                        <PrimaryBtn
                                                            txtColor="var(--main)" pd="3px" br="18px" w="180px" bg="var(--sub-main)" hoverBG="var(--sub-main)" txt="Upgrade Subscription" border="var(--sub-main)" fw="300"
                                                            onClick={() => {
                                                                navigate(`/update-subscription/${user_memorial?.uuid}`, {
                                                                    state: {
                                                                        currency: user_memorial?.plan?.currency,
                                                                        plan_type: user_memorial?.plan?.slug,
                                                                    }
                                                                })
                                                            }
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className='titl_h'>Stories</div>
                                                <div className="titl_s">Upload image and add description</div>
                                                {
                                                    stories_from_BE.map((story, i) => (
                                                        <ShadowCard key={i}>
                                                            <div className="storrr_card_update">
                                                                {
                                                                    story?.image?.includes("http") ?
                                                                        <div className="imager" style={{ backgroundImage: `url(${story?.image})` }}></div>
                                                                        :
                                                                        null
                                                                }
                                                                <div className="texter">
                                                                    {story?.story}
                                                                </div>
                                                            </div>
                                                        </ShadowCard>
                                                    ))
                                                }
                                                {
                                                    stories.length + stories_from_BE.length > 0 ?
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                            {
                                                                stories.map((story, i) => (
                                                                    <ShadowCard key={i}>
                                                                        <div className="storrr_card_update">
                                                                            {
                                                                                story?.image?.includes("http") ?
                                                                                    <div className="imager" style={{ backgroundImage: `url(${story?.image})` }}></div>
                                                                                    :
                                                                                    null
                                                                            }
                                                                            <div className="texter">
                                                                                {story?.story}
                                                                            </div>
                                                                        </div>
                                                                    </ShadowCard>
                                                                ))
                                                            }
                                                        </div>
                                                        :
                                                        showStory ?
                                                            <Add_story />
                                                            :
                                                            <ShadowCard>
                                                                <div className="storrr_card" onClick={editMode}>
                                                                    <IconButton bg="var(--sub-main)" width="50px" height="50px" icon={<FiPlus color='var(--main)' size={28} />} />
                                                                    <span>Add a story</span>
                                                                </div>
                                                            </ShadowCard>

                                                }

                                                <div className="storCard">
                                                    <span>You are currently subscribe to a free plan.
                                                        Upgrade your subscription to add more images to gallery</span>
                                                    <PrimaryBtn
                                                        txtColor="var(--main)"
                                                        pd="3px"
                                                        br="18px"
                                                        w="180px"
                                                        bg="var(--sub-main)"
                                                        hoverBG="var(--sub-main)"
                                                        txt="Upgrade Subscription"
                                                        border="var(--sub-main)"
                                                        fw="300"
                                                        onClick={() => {
                                                            navigate(`/update-subscription/${user_memorial?.uuid}`, {
                                                                state: {
                                                                    currency: user_memorial?.plan?.currency,
                                                                    plan_type: user_memorial?.plan?.slug,
                                                                }
                                                            })
                                                        }
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div>
                                                <div className='titl_h'>Gallery</div>
                                                <div className="titl_s">Upload images</div>
                                                <div className="gallery_content1">
                                                    {
                                                        galleries_from_BE.map((galla) => (
                                                            <div key={galla.id} className="galla_card" style={{ backgroundImage: `url(${galla?.file_url})` }}></div>
                                                        ))
                                                    }
                                                    {
                                                        galleries.map((image, i) => (
                                                            <div className='galla_card_cont' key={i}>
                                                                <div className="galla_card" style={{ backgroundImage: `url(${image})` }}></div>
                                                                <div className='deleter' onClick={() => removeImage(i)}>
                                                                    <AiOutlineDelete size={24} />
                                                                    <span>Delete</span>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                    <>
                                                        <input
                                                            {...registerGalleries('galleries')}
                                                            style={{ display: "none" }}
                                                            id="galleries"
                                                            name="galleries"
                                                            type="file"
                                                            accept="image/x-png,image/gif,image/jpeg"
                                                        // onChange={imageHandler}
                                                        />
                                                        <label htmlFor="galleries" className="upload">
                                                            <div className="galla_card">
                                                                <IconButton bg="var(--sub-main)" width="50px" height="50px" icon={<FiPlus color='var(--main)' size={28} />} onClick={() => console.log('clicked')} />
                                                                <span>Add Image or video</span>
                                                            </div>
                                                        </label>
                                                    </>
                                                </div>
                                            </div>
                                            <div>
                                                <div className='titl_h'>Stories</div>
                                                <div className="titl_s">Upload image and add description</div>
                                                {
                                                    stories_from_BE.map((story, i) => (
                                                        <div key={i} style={{ marginBottom: '10px' }}>
                                                            <ShadowCard>
                                                                <div className="storrr_card_update">
                                                                    {
                                                                        story?.image?.includes("http") ?
                                                                            <div className="imager" style={{ backgroundImage: `url(${story?.image})` }}></div>
                                                                            :
                                                                            null
                                                                    }
                                                                    <div className="texter">
                                                                        {story?.story}
                                                                    </div>
                                                                </div>
                                                            </ShadowCard>
                                                        </div>
                                                    ))
                                                }
                                                {
                                                    stories.length + stories_from_BE.length > 0 ?
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                            {
                                                                stories.map((story, i) => (
                                                                    <Add_story key={i} deleteClick={() => removeNewStory(i)} />
                                                                ))
                                                            }

                                                            <ShadowCard>
                                                                <div className="storrr_card" onClick={addNewStory} >
                                                                    <IconButton bg="var(--sub-main)" width="50px" height="50px" icon={<FiPlus color='var(--main)' size={28} />} />
                                                                    <span>Add a story</span>
                                                                </div>
                                                            </ShadowCard>

                                                        </div>
                                                        :
                                                        <ShadowCard>
                                                            <div className="storrr_card" onClick={addNewStory} >
                                                                <IconButton bg="var(--sub-main)" width="50px" height="50px" icon={<FiPlus color='var(--main)' size={28} />} />
                                                                <span>Add a story</span>
                                                            </div>
                                                        </ShadowCard>

                                                }

                                            </div>
                                        </>

                                }
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                            <ShadowCard>
                                <div className="previv">
                                    <div className="previv_text">
                                        <MdVisibility color='grey' size={24} />
                                        <span>Preview memorial</span>
                                    </div>
                                    <div className="view_trib">
                                        View tributes
                                    </div>
                                </div>
                                <div className="createdDate">
                                    <span>Date created: <span>{moment(created_expire[0]).format('DD-MM-YYYY')}</span></span>
                                    <span>Expiring: <span>{moment(created_expire[1]).format('DD-MM-YYYY')}</span></span>

                                    {
                                        plan_type.toLowerCase() === 'free' ?
                                            <PrimaryBtn txtColor="var(--main)" pd="1px" br="20px"
                                                w="180px"
                                                bg="var(--sub-main)"
                                                hoverBG="var(--sub-main)"
                                                txt="Upgrade Subscription"
                                                border="var(--sub-main)"
                                                fw="300"
                                                onClick={() => {
                                                    navigate(`/update-subscription/${user_memorial?.uuid}`, {
                                                        state: {
                                                            currency: user_memorial?.plan?.currency,
                                                            plan_type: user_memorial?.plan?.slug,
                                                        }
                                                    })
                                                }
                                                }
                                            />
                                            :
                                            null
                                    }
                                </div>
                                <div className="previv_t">
                                    <div className="previv_title">
                                        Lifespan
                                    </div>
                                    <div className="view_trib">
                                        Edit details
                                    </div>
                                </div>
                                <div className="createdDate">
                                    <span>Date of birth: <span>{moment(dob).format('DD-MM-YYYY')}</span></span>
                                    <span>Date of death: <span>{moment(dod).format('DD-MM-YYYY')}</span></span>
                                </div>
                                <div className="previv_t">
                                    <div className="previv_title">
                                        Deceased Image
                                    </div>
                                </div>
                                <div className="deceas_image_cont">
                                    <div className="image_here" style={{ backgroundImage: `url(${decease_image})` }}>
                                    </div>
                                    <form>
                                        <div className="image_action">
                                            <input type="file"
                                                {...register("decease_img")}
                                                accept="image/x-png,image/gif,image/jpeg"
                                                style={{ display: 'none' }}
                                                // onChange={addDeceaseImage}
                                                id="decease_img"
                                                name="decease_img"
                                            />
                                            <label htmlFor='decease_img' className='changer'>Change</label>
                                            <span onClick={removeDeceaseImage} className='remover'>Remove</span>
                                        </div></form>

                                </div>
                            </ShadowCard>
                            <ShadowCard>
                                <div className="previv">
                                    <div className="previv_title">
                                        Share Memorial
                                    </div>
                                </div>

                                <div className="share_contai">
                                    <div className="share_memo">
                                        <span>Share memorial with {fullname.split(" ")[0]}’s family and friends</span>
                                    </div>
                                    <div className="social_icons_memo">

                                        {/* <InstapaperShareButton url={link_to_share}>
                                            <IconButton bg="var(--sub-main)" width="32px" height="32px" icon={<GrInstagram color='var(--main)' size={18} />} />
                                        </InstapaperShareButton> */}

                                        <WhatsappShareButton url={link_to_share}>
                                            <IconButton bg="var(--sub-main)" width="32px" height="32px" icon={<BsWhatsapp color='var(--main)' size={18} />} />
                                        </WhatsappShareButton>
                                        <TwitterShareButton url={link_to_share}>

                                            <IconButton bg="var(--sub-main)" width="32px" height="32px" icon={<BsTwitter color='var(--main)' size={18} />} />
                                        </TwitterShareButton>
                                        <FacebookShareButton url={link_to_share}>
                                            <IconButton bg="var(--sub-main)" width="32px" height="32px" icon={<FaFacebookF color='var(--main)' size={18} />} />
                                        </FacebookShareButton>
                                    </div>
                                    <Copy email={link_to_share} />
                                </div>
                                <div className="public_contai">

                                    <div className="radioBtns" onClick={() => { changeType('public'); settype('public'); }}>
                                        <div className={type === 'public' ? "activeRadioBtn" : "radioBtn"}>

                                        </div>
                                        <div className="radioText" >
                                            <div>Public</div>
                                            <span>Anyone can post a tribute and stories under this memorial</span>
                                        </div>
                                    </div>
                                    <div className="radioBtns" onClick={() => { changeType('private'); settype('private') }}>
                                        <div className={type === 'private' ? "activeRadioBtn" : "radioBtn"}>

                                        </div>
                                        <div className="radioText">
                                            <div>Private</div>
                                            <span>Only people with the link can post a tribute and stories under this memorial</span>
                                        </div>
                                    </div>
                                </div>
                            </ShadowCard>
                            <div>
                                <PrimaryBtn
                                    txtColor="var(--black)"
                                    pd="10px"
                                    br="20px"
                                    w="100%"
                                    bg="var(--sub-main)"
                                    hoverBG="var(--sub-main)"
                                    txt="Recent Activitities"
                                    border="var(--sub-main)"
                                    fs="20px"
                                    fw="500"
                                />
                                <div className="recentAct">
                                    {
                                        activities.map((activity) => (
                                            <div key={activity?.id} className="recentlys">
                                                <p>{activity?.activity}</p>
                                                <span>{moment(activity?.updated_at).format('DD MMMM YYYY')}</span>
                                            </div>
                                        ))
                                    }

                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </section>

        </div>
    )
}

export default EditMemorial
