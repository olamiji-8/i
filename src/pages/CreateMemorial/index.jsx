import React, { useEffect, useState, useRef } from 'react'
import './style.css'
import { Grid, IconButton, Tooltip } from '@mui/material'
import PrimaryBtn from '../../components/Buttons/PrimaryBtn'
import DateInput from '../../components/DateInput'
import SelectInput from '../../components/SelectInput'
import CustomizedLinearProgress from './components/LinearProgress'
import VerticalLinearStepper from './components/Stepper'
import CreateMemoPricing from '../../components/Pricing/CreateMemoPricing'
import SuccessPopup from '../../components/SuccessPopup'
import ErrorPopup from '../../components/SuccessPopup/ErrorPopup'
import { useCreatePayment } from '../../api/useCreateMemorial'
import { Local_storage } from '../../utils/LocalStorageConfig'
import { useForm, Controller } from "react-hook-form";
import moment from 'moment'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";
import AuthAxios from '../../utils/AuthAxios'
import { IoArrowBackSharp } from 'react-icons/io5'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import PaystackWidget from '../../components/PaystackWidget'
import { ClipLoader } from 'react-spinners'
import { useMemorialContext } from '../../contexts/MemorialContext/MemorialContext'

const CreateMemorial = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const paystackRef = useRef();
    const navigate = useNavigate()
    const [page, setpage] = useState(1)

    const [selectedPlan, setselectedPlan] = useState('')

    const [selectedPrice, setselectedPrice] = useState('')

    const [creating, setCreating] = useState(false)

    const [formData, setFormData] = useState({})

    const [showPaymentDialog, setshowPaymentDialog] = useState(false)
    const { memorial, setMemorial } = useMemorialContext();

    const options = [
        { value: "Aunt", label: "Aunt" },
        { value: "Brother", label: "Brother" },
        { value: "Boyfriend", label: "Boyfriend" },
        { value: "Colleague", label: "Colleague" },
        { value: "Cousin", label: "Cousin" },
        { value: "Daughter", label: "Daughter" },
        { value: "Father", label: "Father" },
        { value: "Friend", label: "Friend" },
        { value: "Girlfriend", label: "Girlfriend" },
        { value: "Granddaughter", label: "Granddaughter" },
        { value: "Grandfather", label: "Grandfather" },
        { value: "Grandmother", label: "Grandmother" },
        { value: "Grandson", label: "Grandson" },
        { value: "Inlaw", label: "Inlaw" },
        { value: "Husband", label: "Husband" },
        { value: "Mentor", label: "Mentor" },
        { value: "Mother", label: "Mother" },
        { value: "Nephew", label: "Nephew" },
        { value: "Niece", label: "Niece" },
        { value: "Sister", label: "Sister" },
        { value: "Son", label: "Son" },
    ]

    const handleClosePayment = () => {
        setshowPaymentDialog(false);
        const link = JSON.parse(Local_storage().get("_pay_ref")).payment_link
        window.open(link, '_blank').focus();
    }

    const CreateMemo = (payment_ref, slug, data) => {
        setCreating(true)
        var formdata = new FormData();
        formdata.append("fullname", data.fullname);
        formdata.append("gender", data.gender);
        formdata.append("relationship", data.relationship);
        formdata.append("date_of_birth", moment(data.date_of_birth).format('YYYY-MM-DD'));
        formdata.append("date_of_death", moment(data.date_of_death).format('YYYY-MM-DD'));
        formdata.append("image", data.image);
        formdata.append("plan_slug", slug);
        formdata.append("payment_reference", payment_ref,)

        AuthAxios.post('/memorial', formdata).then((res) => {
            Swal.fire({
                icon: "success",
                iconColor: 'var(--main)',
                text: `Memorial created successfully`,
                confirmButtonColor: "var(--main)",
                timer: 3000
            }).then(() => {
                // navigate(`/edit-memorial/${res?.data?.data?.uuid}`)
                navigate(`/edit-memorial/${res?.data?.data?.slug}`)
                // console.log(res?.data, 'res.dataa')
                setMemorial(data.data.data)

            })
        }).catch((err) => {
            Swal.fire({
                icon: "error",
                iconColor: 'var(--main)',
                text: `${err?.response?.data?.message}`,
                confirmButtonColor: "var(--main)",
                timer: 3000
            })
        }).finally(() => {
            // console.log('finally')
            setCreating(false)

        })
    }

    const CreateMemoFree = (data) => {
        var formdata = new FormData();
        formdata.append("fullname", data.fullname);
        formdata.append("gender", data.gender);
        formdata.append("relationship", data.relationship);
        formdata.append("date_of_birth", moment(data.date_of_birth).format('YYYY-MM-DD'));
        formdata.append("date_of_death", moment(data.date_of_death).format('YYYY-MM-DD'));
        formdata.append("image", data.image);
        formdata.append("plan_slug", 'free');

        AuthAxios.post('/memorial', formdata).then((res) => {
            // console.log(res, "rererr")

            Swal.fire({
                icon: "success",
                iconColor: 'var(--main)',
                text: `Memorial created successfully`,
                confirmButtonColor: "var(--main)",
                timer: 3000
            }).then(() => {
                navigate(`/edit-memorial/${res?.data?.data?.slug}`)
            })
        }).catch((err) => {
            Swal.fire({
                icon: "error",
                iconColor: 'var(--main)',
                text: `${err?.response?.data?.message}`,
                confirmButtonColor: "var(--main)",
            })

        }).finally(() => {
            setCreating(false)
        })
    }

    const handleCreateMemo = (payment_ref) => {
        // const payment_info = JSON.parse(Local_storage().get("_pay_ref"))
        const slug = Local_storage().get('slug')
        CreateMemo(payment_ref, slug, formData)
    }

    const [showSuccess, setshowSuccess] = useState(false)
    const [showError, setshowError] = useState(false)

    const schema = yup.object().shape({
        fullname: yup.string().required("Fullname is required").min(3, "Can't be lesser than 3 digits").max(75, "Can't exceed 75 digits").matches(/^[aA-zZ\s]+$/, "Can't contain number or special character"),
        gender: yup.string().required("Gender is required"),
        relationship: yup.string().required("Relationship is required"),
        date_of_birth: yup.date().required("Date of birth is required"),
        date_of_death: yup.date().required("Date of death is required")
            .when(['date_of_birth'], (dob, validation) => dob && validation.min(dob, "Invalid date of death")),
        image: yup
            .mixed()
            .test("fileSize", "Uploaded image can't exceed 3MB", (file) => {
                return file && file[0]?.size <= 3 * 1024 * 1024
            })
    })

    const { control, getValues, register, handleSubmit, formState: { errors } } = useForm({
        mode: 'all',
        resolver: yupResolver(schema),
    })

    const [payment_ref, setpayment_ref] = useState('')

    const onCreatePaymentSuccess = async (res) => {

        await setpayment_ref(res.data.data.reference);
        setCreating(true)
        setTimeout(() => {
            paystackRef.current.paymentTriger()
            setCreating(false)
        }, 2000);
    }

    const onCreatePaymentError = (err) => {
        // console.log(err, 'error roeoo')
    }

    const handlePaymentClick = async (currency, id) => {
        if (currency === 'NGN' && id === 1) {
            // console.log('freemium')
            setCreating(true)
            CreateMemoFree(formData)
        }
        else {
            createPayment({ currency, id })
        }
    }

    const { mutate: createPayment, isLoading } = useCreatePayment(onCreatePaymentSuccess, onCreatePaymentError);

    const onNextClick = (data) => {
        setpage(2)
        data.image = data.image[0]
        setFormData(data)
    }

    const handleClose = () => {
        setshowSuccess(false)
    }
    const handleCloseError = () => {
        setshowError(false)
    }

    return (
        <div className='createMemoCont'>
            {
                isLoading || creating ?
                    <div
                        style={{ position: 'fixed', left: '0', top: '0', zIndex: '20', width: '100%', height: '100vh', background: 'rgba(230, 225, 225, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ClipLoader color="var(--main)" loading={isLoading || creating} speedMultiplier={1} size={40} />
                    </div>
                    :
                    null
            }

            <div style={{ marginBottom: '10px' }}>
                <Tooltip title="Go back">
                    <IconButton onClick={() => navigate(-1)}>
                        <IoArrowBackSharp size={30} />
                    </IconButton>
                </Tooltip>
            </div>
            {
                page === 1 ?
                    <div>
                        <form style={{ width: '100%' }} onSubmit={handleSubmit(onNextClick)}>
                            <Grid container spacing={6}>
                                <Grid item xs={12} md={4} >
                                    <div className='setupText'>SETUP MEMORIAL FOR YOUR LOVED ONE</div>
                                    <Grid container alignItems="center" spacing={4}>
                                        <Grid item xs={9}>
                                            <CustomizedLinearProgress width={50} />
                                        </Grid>
                                        <Grid item xs={3} style={{ display: "flex", color: "#979797", justifyContent: "flex-start" }} >
                                            <span>1 of 2</span>
                                        </Grid>
                                    </Grid>
                                    <div className="stepDown">
                                        <VerticalLinearStepper activeStep={0} />
                                    </div>
                                </Grid>

                                <Grid item xs={12} md={5} >
                                    <div className='create_text'>
                                        Create beautiful memories of your loved ones, share stories, photos and write tributes to preserve their legacies.
                                    </div>
                                    <div className="create_input">
                                        <div>
                                            <input {...register("fullname")} className='input_name' type="text" placeholder='Full Name' />
                                            <span className='error_label'>{errors?.fullname?.message}</span>
                                        </div>
                                        <div>
                                            <Controller
                                                control={control}
                                                name='gender'
                                                render={({ field: { onChange, value, ref } }) => (
                                                    <SelectInput
                                                        value={value}
                                                        onChange={onChange}
                                                        id="gender"
                                                        inputRef={ref}
                                                        label="Gender"
                                                        options={[
                                                            { value: "male", label: "Male" },
                                                            { value: "female", label: "Female" },
                                                        ]}
                                                    />
                                                )}
                                            />
                                            <span className='error_label'>{errors?.gender?.message}</span>
                                        </div>
                                        <div>
                                            <Controller
                                                control={control}
                                                name='relationship'
                                                render={({ field: { onChange, value, ref } }) => (
                                                    <SelectInput
                                                        value={value}
                                                        onChange={onChange}
                                                        id="relationship"
                                                        label="Relationship"
                                                        inputRef={ref}
                                                        options={options}
                                                    />)}
                                            />
                                            <span className='error_label'>{errors?.relationship?.message}</span>

                                        </div>
                                        <div>
                                            <Controller
                                                control={control}
                                                name='date_of_birth'
                                                render={({ field: { onChange, value } }) => (
                                                    <DateInput
                                                        error={errors?.date_of_birth}
                                                        value={value}
                                                        onChange={onChange}
                                                        label="Date of birth"
                                                    />)}
                                            />
                                            <span className='error_label'>{errors?.date_of_birth?.message}</span>
                                        </div>
                                        <div>
                                            <Controller
                                                control={control}
                                                name='date_of_death'
                                                render={({ field: { onChange, value } }) => (
                                                    <DateInput
                                                        error={errors?.date_of_death}
                                                        value={value}
                                                        onChange={onChange}
                                                        label="Date of death"
                                                    />
                                                )}
                                            />
                                            <span className='error_label'>{errors?.date_of_death?.message}</span>

                                        </div>
                                        {/* <label className='error_label'>{errors?.date_of_death?.message}</label> */}
                                        <input required {...register("image")} className='input_name' id="passport" type="file" accept="image/x-png,image/jpg,image/jpeg" />
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={3} style={{ display: 'flex', alignItems: 'flex-end' }} >
                                    <PrimaryBtn
                                        txtColor="white"
                                        type='submit'
                                        pd="8px"
                                        br="8px"
                                        w="120px"
                                        bg="var(--main)"
                                        hoverBG="var(--main)"
                                        txt="Next step"
                                        fw="500"
                                    />
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                    :
                    <div>
                        <Grid container spacing={6}>
                            <Grid item xs={12} md={3} >
                                <div className='setupText'>SETUP MEMORIAL FOR YOUR LOVED ONE</div>
                                <Grid container alignItems="center" spacing={4}>
                                    <Grid item xs={9}>
                                        <CustomizedLinearProgress width={100} />
                                    </Grid>
                                    <Grid item xs={3} style={{ display: "flex", color: "#979797", justifyContent: "flex-start" }} >
                                        <span>2 of 2</span>
                                    </Grid>
                                </Grid>
                                <div className="stepDown">
                                    <VerticalLinearStepper activeStep={1} />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={9} >
                                <div className='create_text2'>
                                    Create beautiful memories of your loved ones, share stories, photos and write tributes to preserve their legacies.
                                </div>
                                <div >
                                    <Tooltip title="Previous">
                                        <IconButton onClick={() => setpage(1)}>
                                            <IoArrowBackSharp size={30} />
                                        </IconButton>
                                    </Tooltip>
                                </div>

                                <CreateMemoPricing
                                    clickPlan={
                                        async (slug, name, currency, id, price) => {
                                            Local_storage().set('slug', slug);
                                            handlePaymentClick(currency, id);
                                            setselectedPlan(name)
                                            setselectedPrice(price)
                                            // console.log(slug, name, currency, id,"slug, name, currency, id")
                                        }
                                    }
                                />

                            </Grid>
                        </Grid>
                    </div>
            }
            <PaystackWidget
                amount={selectedPrice}
                ref={paystackRef}
                payment_ref={payment_ref}
                paymentMade={(ref) => {
                    handleCreateMemo(ref.reference);
                }}
            />
            <SuccessPopup
                open={showSuccess}
                close={handleClose}
                title="Success"
                message="Tribute has been created successfully"
            />

            <SuccessPopup
                open={showPaymentDialog}
                close={handleClosePayment}
                title={`${selectedPlan} plan selected`}
                btnText="Proceed to payment"
            />

            {/* <SuccessWithClose
                open={showProceedDialog}
                close={handleCreateMemo}
                closeClick={handleCreateMemo}
                hideIcon
                title="Confirm payment"
                message="Have you made the payment? if yes, click ok to continue else click on the link below to make payment"
                submessage="Payment link"
            /> */}

            <ErrorPopup
                open={showError}
                close={handleCloseError}
                tryAgain={() => console.log('try aggain')}
                title="Error"
                message="Oppz! Could not publish memorial"
            />

        </div>
    )
}

export default CreateMemorial
