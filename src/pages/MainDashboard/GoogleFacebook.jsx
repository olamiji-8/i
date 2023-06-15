import React, { useEffect, useState } from "react";
import editpen from "../../assets/editpen.svg";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import EditAccount from "./EditAccount";
// import Aside from "../../components/Aside";
import { useDashboardContext } from "../../contexts/DashboardContext/Dashboard";
import { Grid } from "@mui/material";
import { Capitalizer } from "../../utils/Capitalizer";
import { IoCloseSharp } from "react-icons/io5";
import { Local_storage } from "../../utils/LocalStorageConfig";

function GoogleFacebook() {
    const [showedit, setShowedit] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0)


        console.log(Local_storage().get('provider'), 'provi')


        Local_storage().get('provider') === "google" || Local_storage().get('provider') === "facebook" ? setShowedit(true) : setShowedit(false)



    }, [])

    const [isActive, setActive] = useState(false);
    const Toggle = () => {
        setActive(!isActive);
    };

    let navigate = useNavigate();



    const [user_details, setUser_details] = useState({})
    const { dashdata } = useDashboardContext();

    useEffect(() => {

        // console.log(dashdata?.data?.user_details, 'dashdata?.data?.user_details')


        if (dashdata?.data?.user_details?.country !== " " && dashdata?.data?.user_details?.phone !== " ") {

            navigate('/dashboard')
        } else {
            if (dashdata !== undefined) {
                setUser_details(dashdata?.data?.user_details)
            }

        }







    }, [dashdata])

    return (
        <div className="grid-container">

            <div className="menu-icon" onClick={Toggle}>
                <AiOutlineMenu className="header__menu" />
            </div>

            <aside className={` sidenav ${isActive ? " active" : null}`}>
                <div onClick={Toggle} className="sidenav__close-icon-" >
                    <AiOutlineCloseCircle />
                </div>

                {/* <Aside onClick={Toggle} /> */}
            </aside>

            {
                showedit ?
                    <section className="main" style={{
                        height: "100vh"
                    }} >
                        <div className="main_name_edit space_between">
                            <div>Edit Account</div>


                            {

                                Local_storage().get('provider') === "google" || Local_storage().get('provider') === "facebook" ? null :

                                    <>

                                        <div className="div_cancel" onClick={() => setShowedit(false)}>
                                            <IoCloseSharp />
                                            <span className="canceler">Cancel</span>
                                        </div>

                                    </>

                            }



                        </div>

                        <EditAccount setStateBack={() => setShowedit(false)} />
                    </section>
                    :
                    <section className="main" style={{
                        height: "100vh"
                    }}  >
                        <div className="profile-body" style={{ padding: '60px 0' }}>
                            <div className="myaccount_name">
                                {`${Capitalizer(user_details?.first_name)} ${user_details.last_name}`}
                            </div>
                            <div className="myaccount_small">
                                {Capitalizer(user_details?.role)}
                            </div>

                            <div className="myaacount_editpen">
                                <div className="myaccount">
                                    <h1 className="myaccount_text">My Account</h1>
                                </div>
                                <div
                                    className="editpenandtext"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: '3px'
                                    }}
                                    onClick={() => setShowedit(true)}
                                >
                                    <img src={editpen} alt="editpen" width={24} />
                                    <span>
                                        Edit profile
                                    </span>
                                </div>
                            </div>

                            <div className="form-inputs">
                                <form style={{ width: '100%' }}>
                                    <Grid container rowSpacing={{ xs: 3, md: 5 }} columnSpacing={{ xs: 2, md: 3 }}>
                                        <Grid item xs={12} md={6}>
                                            <div className="form-content">
                                                <div className="first_namediv">
                                                    <div>
                                                        <label htmlFor="firstname" className="labelfirstname">First Name</label>
                                                    </div>
                                                    <div className="input_div">
                                                        {user_details?.first_name}
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={6}>

                                            <div className="form-content">
                                                <div className="first_namediv">
                                                    <div>
                                                        <label className="labelfirstname">Last Name</label>
                                                    </div>
                                                    <div className="input_div">
                                                        {user_details?.last_name}
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <div className="form-content">
                                                <div className="first_namediv">
                                                    <div>
                                                        {" "}
                                                        <label className="labelfirstname">Email</label>
                                                    </div>
                                                    <div className="input_div">
                                                        {user_details?.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <div className="form-content">
                                                <div className="first_namediv">
                                                    <div>
                                                        <label className="labelfirstname" htmlFor="countrytext">Country</label>
                                                    </div>
                                                    <div className="input_div">
                                                        {user_details?.country}
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <div className="form-content">
                                                <div className="first_namediv">
                                                    <div>
                                                        <label className="labelfirstname" htmlFor="phonevalue" >Phone Number</label>
                                                    </div>
                                                    <div className="input_div">
                                                        {user_details?.phone}
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </form>


                                {
                                    Local_storage().get('provider') === "google" || Local_storage().get('provider') === "facebook" ? null :

                                        <>

                                            <div className="myaacount_editpen">
                                                <div className="myaccount">
                                                    <h1 className="myaccount_text">Security</h1>
                                                </div>

                                                <div className="editpen">
                                                    <div
                                                        className="editpenandtext"
                                                        style={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        <div className="link_div" onClick={() => navigate("/resetpassword")}>
                                                            <h1> Reset Password</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-content">
                                                <div className="first_namediv">
                                                    <div>
                                                        <label className="labelfirstname">Password</label>
                                                    </div>
                                                    <div className="input_div">
                                                        &#8226; &#8226; &#8226; &#8226; &#8226; &#8226; &#8226;
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                }





                            </div>
                        </div>
                    </section>


            }


        </div>
    );
}

export default GoogleFacebook;
