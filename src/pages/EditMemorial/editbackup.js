import React, { useEffect, useState } from 'react'
import { AiFillAudio, AiFillPauseCircle, AiFillPlayCircle, AiOutlineClose, AiOutlineCloseCircle, AiOutlineDelete, AiOutlineMenu } from 'react-icons/ai'
import './style.css'
import { MdVisibility } from 'react-icons/md'
import { Grid } from '@mui/material'
import PrimaryBtn from '../../components/Buttons/PrimaryBtn'
import ShadowCard from '../../components/ViewBody/ShadowCard'
import Copy from '../../components/Copy'
import { convertFromRaw, convertToRaw, Editor, EditorState, } from 'draft-js';
import Wysiwug from '../../components/Wysiwug'
import IconButton from '../../components/IconButton/IconButton'
import { FiEdit3, FiPlus } from 'react-icons/fi'
import imageCompression from "browser-image-compression";
import { GrInstagram } from 'react-icons/gr'
import { BsTwitter, BsWhatsapp } from 'react-icons/bs'
import { FaFacebookF } from 'react-icons/fa'
import Aside from '../../components/Aside'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import AuthAxios from '../../utils/AuthAxios'
import { ContentState, convertFromHTML, } from 'draft-js'
import moment from 'moment'
import { BiLink } from 'react-icons/bi'
import $ from 'jquery'
import {
    // convertFromHTML,
    convertToHTML
} from 'draft-convert';
import BackDrop from '../../components/BackDrop'
import { FacebookShareButton, InstapaperShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share'
import { useForm } from 'react-hook-form'
import { ClipLoader } from 'react-spinners'
import Swal from 'sweetalert2'
import { useRef } from 'react'
import { ScaleLoader } from "react-spinners";
import { Local_storage } from '../../utils/LocalStorageConfig'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


var a;
const today = moment().format("YYYY-MM-DD")



const EditMemorial = () => {


    var retrievedObject = localStorage.getItem('testObject');

    useEffect(() => {
        window.scrollTo(0, 0)


        // console.log()

    }, [])

    $('.open-datetimepicker').click(function (event) {
        event.preventDefault();
        $('#datetimepicker').click();
    });
    let location = useLocation();

    const audioRef = useRef()

    const [buttonName, setButtonName] = useState("Play");

    const [duration, setDuration] = useState(0)
    const [audio_file_name, setaudio_file_name] = useState('');
    const [audio_to_send, setaudio_to_send] = useState(null);
    const [audio, setAudio] = useState('');
    const [audioFromBE, setAudioFromBE] = useState('');
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
        if (a) {
            a.pause();
            a = null;
            setButtonName("Play");
        }
        if (audio) {
            a = new Audio(audio);
            a.onended = () => {
                setButtonName("Play");
            };
        }
    }, [audio]);

    const handleClick = () => {
        if (buttonName === "Play") {
            a.play();
            setButtonName("Pause");
        } else {
            a.pause();
            setButtonName("Play");
        }
    };

    function getDuration(src, cb) {
        var audio = new Audio();
        $(audio).on("loadedmetadata", function () {
            cb(audio.duration);
        });
        audio.src = src;
    }


    const addFile = (e) => {
        if (e.target.files[0]) {
            setaudio_file_name(e.target.files[0].name)
            setaudio_to_send(e.target.files[0])
            setAudio(URL.createObjectURL(e.target.files[0]));
            getDuration(URL.createObjectURL(e.target.files[0]), function (length) {
                setDuration(length)
            });
        }
    };

    const navigate = useNavigate()

    const { slug } = useParams()

    const [updating, setupdating] = useState(false)
    const [saving, setsaving] = useState(false)

    var host = window.location.protocol + "//" + window.location.host;

    const link_to_share = `${host}/memorial/${slug}`
    const preview_link = `${host}/preview_memo/${slug}`

    const [user_memorial, setUser_memorial] = useState(null)

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // if(user_memorial === null){

        // console.log(slug, 'sluggggggg')
        setLoading(true);
        AuthAxios
            .get(`/memorial/${slug}`)
            .then((response) => {
                updatePage(response.data)
            })
            .catch((err) => {
                setError(err);
                console.log(err)
            })
            .finally(() => {
                setLoading(false);
            });
        // }
    }, [slug]);

    // const { loading, user_memorial, error, refetch } = useSingleUserMemo(`/memorial/${slug}`)
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
    const [status, setStatus] = useState(false)

    const [isActive, setActive] = useState(false);

    const [story_text, setstory_text] = useState('')
    const [story_image, setstory_image] = useState(null)
    const [addData, setVal] = useState("")
    const [addedData, showData] = useState(0)
    const [state, setState] = useState()

    const updatePage = (res) => {

        // console.log(res?.data?.biography, 'res?.data?.biography')
        // console.log()
        // console.log(convertFromRaw(JSON.parse(res?.data?.biography)), 'convertFromRaw(JSON.parse(res?.data?.biography))')
        // console.log(EditorState.createWithContent(
        //     convertFromRaw(JSON.parse(res?.data?.biography))
        // ))



        // const contentState = res?.data?.biography.startsWith("{") ? convertFromRaw(JSON.parse(res?.data?.biography)) : ""
        // console.log(contentState, 'contentState')
        // const editorState = contentState !== "" && EditorState.createWithContent(contentState);




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
        setStatus(res.data.status)
        setAudioFromBE(res.data.audio)
        setvalueBiography(res?.data?.biography)

        // setvalueBiography(
        //     () => EditorState.createWithContent(
        //         res?.data?.biography === null ?
        //             ContentState.createFromBlockArray(
        //                 convertFromHTML("")
        //             )
        //             :
        //             convertFromRaw(JSON.parse(res?.data?.biography))

        //     ),
        // )

        // console.log(EditorState.createWithContent(
        //     convertFromRaw(JSON.parse(res?.data?.biography))
        // ))


        setvalueBiography(
            res?.data?.biography

        )


        // setvalueBiography(
        //     <Editor editorState={EditorState.createWithContent(
        //         convertFromRaw(JSON.parse(res?.data?.biography))
        //     )} readOnly={true} />
        // )


        setvalueHistory(
            () => EditorState.createWithContent(
                res?.data?.life_history === null ?
                    ContentState.createFromBlockArray(
                        convertFromHTML("")
                    )
                    :
                    convertFromRaw(JSON.parse(res?.data?.life_history))

            ),
        )
    }

    const editMode = () => {
        setshowStory(true);
    }

    const Toggle = () => {
        setActive(!isActive);
    };

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

    // const removeDeceaseImage = (index) => {
    //     setdecease_image('')
    //     setdecease_image_to_send(null);
    // }

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
    const removeAudio = async () => {
        setDeleting(true)
        await AuthAxios.get(`/memorial/audio/delete/${user_memorial?.uuid}`)
            .then(() => {
                setAudioFromBE(null)
            })
            .catch((err) => {
                console.log(err, "eroororo")
            })
            .finally(() => {
                setDeleting(false)
            })
    }
    const publishMemo = async () => {
        setupdating(true)
        await AuthAxios.post(`/memorial/publish/${user_memorial?.uuid}`)
            .then((res) => {
                Swal.fire({
                    icon: "success",
                    iconColor: 'var(--main)',
                    text: "Memorial published successfully",
                    confirmButtonColor: "var(--main)",
                    timer: 3000
                }).then(() => {
                    window.location.reload()
                })
            })
            .catch((err) => {
            })
            .finally(() => {
                setupdating(false)
            })
    }

    const [newdata, setNewdata] = useState('')


    const UpdateMemo = async (arg) => {
        const contentState = convertFromRaw(JSON.parse(valueBiography))
        // console.log(arg, 'arggggggg')
        // console.log(valueBiography, 'valueBiography.getCurrentContent')

        const editorState = EditorState.createWithContent(contentState)
        setNewdata(editorState)

        // console.log(<Editor editorState={editorState} readOnly={true} />, 'editor stateeeee')

        // console.log(valueBiography, 'valueBiography')

        // console.log(JSON.stringify(convertToRaw(valueBiography.getCurrentContent())))

        // if (convertToHTML(valueBiography.getCurrentContent()) === "<p></p>") {
        //     return Swal.fire({
        //         icon: "error",
        //         iconColor: 'var(--main)',
        //         text: `Short biography is required`,
        //         confirmButtonColor: "var(--main)",
        //         timer: 3000
        //     })
        // }



        // if (convertToHTML(valueHistory.getCurrentContent()) === "<p></p>") {
        //     return Swal.fire({
        //         icon: "error",
        //         iconColor: 'var(--main)',
        //         text: `Life history is required`,
        //         confirmButtonColor: "var(--main)",
        //         timer: 3000
        //     })
        // }


        // if (arg === 'save') {
        //     setsaving(true)
        // }
        // else {
        //     setupdating(true)

        // }
        // var formdata = new FormData();
        // var audioformdata = new FormData();

        // for (var i = 0; i < galleries_to_BE.length; i++) {
        //     formdata.append(`gallery[${i}]`, galleries_to_BE[i]);
        // }
        // if (decease_image_to_send !== null) {
        //     formdata.append("image", decease_image_to_send)
        // }

        // if (audio_to_send !== null) {
        //     audioformdata.append("audio", audio_to_send)
        // }

        // if (arg === 'save') {
        //     formdata.append("action", 'save')
        // }
        // if (story_image !== null) {
        //     formdata.append("story[image]", story_image)
        // }
        // if (story_text !== '') {
        //     formdata.append("story[text]", story_text)
        // }

        // // const content = JSON.stringify(convertToRaw(data));


        // const JSBlogPost = JSON.stringify(convertToRaw(valueBiography.getCurrentContent()));



        // formdata.append("fullname", fullname)
        // // formdata.append("biography", JSON.stringify(convertToRaw(valueBiography.getCurrentContent())))
        // formdata.append("biography", JSBlogPost)
        // formdata.append("life_history", JSON.stringify(convertToRaw(valueHistory.getCurrentContent())))
        // formdata.append("type", type)
        // formdata.append("date_of_birth", moment(dob).format("YYYY-MM-DD"))
        // formdata.append("date_of_death", moment(dod).format("YYYY-MM-DD"))

        // await AuthAxios.post(`/memorial/${user_memorial?.uuid}`, formdata)
        //     .then(async (res) => {
        //         if (audio_to_send !== null) {
        //             await AuthAxios.post(`/memorial/audio/upload/${user_memorial?.uuid}`, audioformdata)
        //                 .then(() => {
        //                     Swal.fire({
        //                         icon: "success",
        //                         iconColor: 'var(--main)',
        //                         text: arg === 'save' ? `Memorial saved` : status === 'saved' ? "Memorial published" : "Memorial updated",
        //                         confirmButtonColor: "var(--main)",
        //                         timer: 3000
        //                     }).then(() => {
        //                         window.location.reload()
        //                     })
        //                 })
        //                 .catch((err) => {
        //                     console.log(err, "eroororo")
        //                 })
        //         }
        //         else {
        //             Swal.fire({
        //                 icon: "success",
        //                 iconColor: 'var(--main)',
        //                 text: arg === 'save' ? `Memorial saved` : status === 'saved' ? "Memorial published" : "Memorial updated",
        //                 confirmButtonColor: "var(--main)",
        //                 timer: 3000
        //             }).then(() => {
        //                 window.location.reload()
        //             })
        //         }
        //     })
        //     .catch((err) => {
        //         Swal.fire({
        //             icon: "error",
        //             iconColor: 'var(--main)',
        //             text: `${err?.response?.data?.message}`,
        //             confirmButtonColor: "var(--main)",
        //             timer: 5000
        //         })
        //     })
        //     .finally(() => {
        //         console.log('finally')
        //         setupdating(false)
        //         setsaving(false)
        //     })
    }






    const handleChange = (e, editor) => {

        const data = editor.getData();
        setvalueBiography(data)
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
                            <div style={{ marginRight: '15px' }}>
                                <PrimaryBtn
                                    txtColor="#8F92A1" pd="5px" br="7px" w="120px" bg="white" hoverBG="whitesmoke"
                                    txt={saving ? <ClipLoader color="var(--main)" loading={saving} speedMultiplier={1} size={22} /> : "Save"}
                                    fw="400" border="#8F92A1"
                                    onClick={() => UpdateMemo('save')}
                                />
                            </div>
                            <PrimaryBtn
                                txtColor="white" pd="5px" br="7px" w="120px" bg="var(--main)" hoverBG="var(--main)"
                                txt={updating ? <ClipLoader color="white" loading={updating} speedMultiplier={1} size={22} /> : status === 'saved' ? "Publish" : "Update"}
                                border="var(--main)" fw="400"
                                onClick={() => status === 'saved' ? publishMemo() : UpdateMemo()}
                            />
                        </div>
                    </div>
                    <div className='showMobile'>
                        <div className='doublebtn'>
                            <PrimaryBtn
                                txtColor="#8F92A1" pd="3px 5px" br="7px" w="70px" bg="white" hoverBG="whitesmoke"
                                txt={saving ? <ClipLoader color="var(--main)" loading={saving} speedMultiplier={1} size={22} /> : "Save"}
                                fw="400" border="#8F92A1"
                                onClick={() => UpdateMemo('save')}
                            />
                            <PrimaryBtn
                                txtColor="white" pd="3px 5px" br="7px" w="70px" bg="var(--main)" hoverBG="whitesmoke"
                                txt={updating ? <ClipLoader color="white" loading={updating} speedMultiplier={1} size={22} /> : status === 'saved' ? "Publish" : "Update"}
                                border="var(--main)" fw="400"
                                onClick={() => status === 'saved' ? publishMemo() : UpdateMemo()}
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
                                    <div className="titl_s">Create a short biography now</div>
                                    <div>
                                        {/* {
                                            <Editor editorState={state} readOnly={true} />
                                        } */}
                                    </div>
                                    <ShadowCard>
                                        {/* <Wysiwug valueState={valueBiography} setvalueState={setvalueBiography} /> */}
                                        <CKEditor
                                            editor={ClassicEditor}

                                            data={valueBiography}
                                            // data={
                                            //     <Editor editorState={ } readOnly={true} />
                                            // }
                                            onChange={handleChange}
                                            onReady={editor => {
                                                // You can store the "editor" and use when it is needed.
                                                console.log('Editor is ready to use!', editor);
                                            }}
                                        // onChange={(event, editor) => {
                                        //     const data = editor.getData();
                                        //     console.log({ event, editor, data });
                                        // }}
                                        // onBlur={(event, editor) => {
                                        //     console.log('Blur.', editor);
                                        // }}
                                        // onFocus={(event, editor) => {
                                        //     console.log('Focus.', editor);
                                        // }}


                                        />
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
                                                        galleries_from_BE.length === 0 ?
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
                                                            :
                                                            null
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
                                                    stories_from_BE.length === 0 ?
                                                        showStory === true ?
                                                            <ShadowCard>
                                                                <div className="edit_card">

                                                                    <input type="file" {...registerStoryAttachment("attach_image")} name="attach_image" id="attach_image" accept="image/x-png,image/gif,image/jpeg" style={{ display: 'none' }} />

                                                                    <textarea
                                                                        name="story_area"
                                                                        value={story_text}
                                                                        onChange={(e) => setstory_text(e.target.value)}
                                                                        placeholder='Tell a story |'
                                                                        id="story_area"
                                                                        rows="5"
                                                                    />

                                                                    {/* </textarea> */}
                                                                    <div className="space_between">
                                                                        <div>
                                                                            <label htmlFor="attach_image" className="icon_text" style={{ color: 'var(--main)' }}>
                                                                                {
                                                                                    story_image?.name === undefined ?
                                                                                        <>
                                                                                            <BiLink size={24} />
                                                                                            <span>Attach image</span>
                                                                                        </>
                                                                                        :
                                                                                        <>
                                                                                            <span>{story_image?.name}</span>
                                                                                            <AiOutlineClose
                                                                                                size={18}
                                                                                                style={{ marginLeft: '30px', color: 'grey' }}
                                                                                                onClick={() => setstory_image(null)}
                                                                                            />
                                                                                        </>
                                                                                }

                                                                            </label>
                                                                        </div>
                                                                        <div onClick={() => setshowStory(false)} className="icon_text" style={{ color: '#EA532A' }}>
                                                                            <AiOutlineDelete size={24} />
                                                                            <span>Delete</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </ShadowCard>
                                                            :
                                                            <ShadowCard>

                                                                <div className="storrr_card" onClick={() => editMode()}>
                                                                    <IconButton bg="var(--sub-main)" width="50px" height="50px" icon={<FiPlus color='var(--main)' size={28} />} />
                                                                    <span>Add a story</span>
                                                                </div>
                                                            </ShadowCard>
                                                        :
                                                        null
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
                                                    showStory ?
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                            <ShadowCard>
                                                                <div className="edit_card">

                                                                    <input type="file" {...registerStoryAttachment("attach_image")} name="attach_image" id="attach_image" accept="image/x-png,image/gif,image/jpeg" style={{ display: 'none' }} />

                                                                    <textarea
                                                                        name="story_area"
                                                                        value={story_text}
                                                                        onChange={(e) => setstory_text(e.target.value)}
                                                                        placeholder='Tell a story |'
                                                                        id="story_area"
                                                                        rows="5"
                                                                    />

                                                                    {/* </textarea> */}
                                                                    <div className="space_between">
                                                                        <div>
                                                                            <label htmlFor="attach_image" className="icon_text" style={{ color: 'var(--main)' }}>
                                                                                {
                                                                                    story_image?.name === undefined ?
                                                                                        <>
                                                                                            <BiLink size={24} />
                                                                                            <span>Attach image</span>
                                                                                        </>
                                                                                        :
                                                                                        <>
                                                                                            <span>{story_image?.name}</span>
                                                                                            <AiOutlineClose
                                                                                                size={18}
                                                                                                style={{ marginLeft: '30px', color: 'grey' }}
                                                                                                onClick={() => setstory_image(null)}
                                                                                            />
                                                                                        </>
                                                                                }

                                                                            </label>
                                                                        </div>
                                                                        <div onClick={() => setshowStory(false)} className="icon_text" style={{ color: '#EA532A' }}>
                                                                            <AiOutlineDelete size={24} />
                                                                            <span>Delete</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </ShadowCard>
                                                        </div>
                                                        :
                                                        <ShadowCard>
                                                            <div className="storrr_card" onClick={() => editMode()} >
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
                        <Grid
                            item
                            xs={12}
                            md={4}
                            style={{ display: "flex", flexDirection: "column", gap: "30px" }}
                        >
                            <ShadowCard>
                                <div className="previv">
                                    {/* <a
                    href={preview_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ cursor: "pointer", textDecoration: "none" }}
                  >
                    <div className="previv_text">
                      <MdVisibility color="grey" size={24} />
                      <span>Preview memorial</span>
                    </div>
                  </a> */}

                                    <div
                                        className="view_trib"
                                        style={{ cursor: "pointer", textDecoration: "none" }}
                                        onClick={() => {
                                            return window.open(
                                                `/preview_memo/${slug}`,
                                                "_blank",

                                                Local_storage().set(
                                                    "font",
                                                    `${JSON.stringify(location?.state)}`
                                                )
                                            );
                                        }}
                                    >
                                        <div
                                            style={{ cursor: "pointer", textDecoration: "none" }}
                                            className="previv_text"
                                        >
                                            <MdVisibility color="grey" size={24} />
                                            <span>Preview memorial</span>
                                        </div>
                                    </div>

                                    <div
                                        className="view_trib"
                                        style={{ cursor: "pointer", textDecoration: "none" }}
                                        onClick={() => {
                                            return window.open(
                                                `/memorial/${slug}`,
                                                "_blank",

                                                Local_storage().set(
                                                    "font",
                                                    `${JSON.stringify(JSON.parse(retrievedObject)?.slug)}`
                                                )
                                            );
                                        }}
                                    >
                                        View tributes
                                    </div>
                                </div>





                                <div className="createdDate">
                                    <span>Date created: <span>{moment(created_expire[0]).format('DD/MM/YYYY')}</span></span>
                                    <span>Expiring: <span>{moment(created_expire[1]).format('DD/MM/YYYY') === 'Invalid date' ? 'Infinity' : moment(created_expire[1]).format('DD/MM/YYYY')}</span></span>
                                    {
                                        console.log(moment(created_expire[1]).format('DD/MM/YYYY'), 'kjkmkmkm')
                                    }

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
                                    <span>
                                        Date of birth: <input value={dob} max={today} onChange={(e) => setdob(e.target.value)} type="date" name="dated" id="dated" />
                                        <label style={{ marginLeft: '-20px', color: 'var(--main)' }}><FiEdit3 /></label>
                                    </span>

                                    <span>Date of death: <input value={dod} min={dob} max={today} onChange={(e) => setdod(e.target.value)} type="date" name="dated" id="dated" />
                                        <label style={{ marginLeft: '-20px', color: 'var(--main)' }}><FiEdit3 /></label>
                                    </span>
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
                                            {/* <span onClick={removeDeceaseImage} className='remover'>Remove</span> */}
                                        </div>
                                    </form>
                                </div>

                                <div className="display_flex upload_audio">
                                    <div className="previv_t" style={{ padding: '0' }}>
                                        <div className="previv_title">
                                            Memorial Song
                                        </div>
                                    </div>

                                    <audio style={{ display: 'none' }} ref={audioRef} id="myAudio" src={audio} controls />
                                    <input style={{ display: 'none' }} type="file" name='audio_file' id='audio_file' onChange={addFile} accept="audio/mp3,audio/*;capture=microphone" />

                                    {audioFromBE !== null ?
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <audio id="audioFromBE" src={audioFromBE} controls />
                                            {
                                                deleting ?
                                                    <div style={{ marginLeft: '20px' }}>
                                                        <ClipLoader color="var(--main)" loading={deleting} speedMultiplier={1} size={22} />
                                                    </div>
                                                    :
                                                    <div onClick={removeAudio} className="icon_text" style={{ color: '#EA532A', marginLeft: '20px' }}>
                                                        <AiOutlineDelete size={24} />
                                                        <span>Remove audio</span>
                                                    </div>

                                            }

                                        </div>
                                        :
                                        duration === 0 && audio === '' ?
                                            <label htmlFor='audio_file' className="justify_center margin_zero">
                                                <AiFillAudio size={20} />
                                                <span>Upload Audio</span>
                                            </label>
                                            :
                                            <>
                                                <div className="display_flex" style={{ alignItem: "center", color: 'var(--main)', gap: '5px', fontStyle: 'italic' }}>
                                                    <AiFillAudio size={20} />
                                                    <span>Audio added successful</span>
                                                </div>
                                                <div className="space_between" style={{ gap: '3px' }}>
                                                    <span className='changer_name'>{audio_file_name}</span>
                                                    <span className='remover' onClick={() => {
                                                        setDuration(0);
                                                        setAudio('')
                                                        setaudio_to_send(null)
                                                    }}>Remove</span>
                                                </div>
                                                <div onClick={handleClick} className="justify_center playing_button">
                                                    {buttonName === "Play" ?
                                                        <>
                                                            <AiFillPlayCircle size={18} />
                                                            {(parseInt(duration) / 60).toFixed(2)} mins
                                                        </>
                                                        :
                                                        <>
                                                            <AiFillPauseCircle size={18} />
                                                            <ScaleLoader color="var(--main)" loading={true} speedMultiplier={1} height={10} />
                                                        </>
                                                    }
                                                </div>
                                            </>
                                    }
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
                                        activities.sort((x, y) => new Date(y.updated_at) - new Date(x.updated_at)).slice(0, 15).map((activity) => (
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