import React, { useState, useEffect } from 'react'
import UpdateMemoPricing from '../../components/Pricing/UpdateMemoPricing'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useCreatePayment } from '../../api/useCreateMemorial';
import { Local_storage } from '../../utils/LocalStorageConfig';
import SuccessWithClose from '../../components/SuccessPopup/SuccessWithClose';
import SuccessPopup from '../../components/SuccessPopup';
import AuthAxios from '../../utils/AuthAxios';
import Swal from 'sweetalert2';
import GoBack from '../../components/Navbar/GoBack';

const Update_sub = () => {
    const { slug } = useParams();
    const location = useLocation();
    const navigate = useNavigate()

    useEffect(() => {
        setpriceType(location?.state?.currency)
        setplanType(location?.state?.plan_type)
    }, [])

    const [priceType, setpriceType] = useState('NGN')
    const [planType, setplanType] = useState('free')

    const [showPaymentDialog, setshowPaymentDialog] = useState(false)
    const [showProceedDialog, setShowProceedDialog] = useState(false)
    const [selectedPlan, setselectedPlan] = useState('')

    const [updating, setupdating] = useState(false)

    const onCreatePaymentSuccess = (res) => {
        // console.log(res, 'rererer')
        setshowPaymentDialog(true)
        Local_storage().set("_pay_ref",
            JSON.stringify({
                payment_ref: res.data.data.reference,
                plan_id: res.data.data.plan_id,
                payment_link: res.data.data.payment_link
            }))
    }

    const onCreatePaymentError = (err) => {
        // console.log(err, 'error roeoo')
    }

    const { mutate: createPayment, isLoading } = useCreatePayment(onCreatePaymentSuccess, onCreatePaymentError);

    const handlePaymentClick = (currency, id) => {
        // console.log(currency, id, "currency, id ,")
        if (currency === 'NGN' && id === 1) {
            // console.log('freemium')
        }
        else (
            createPayment({ currency, id })
        )
    }

    const handleUpdateSub = () => {

        const payment_info = JSON.parse(Local_storage().get("_pay_ref"))

        setShowProceedDialog(false)
        setupdating(true)

        AuthAxios.post(`memorial/plan/upgrade/${slug}`, {
            plan_id: payment_info?.plan_id,
            payment_reference: payment_info?.payment_ref
        }).then((res) => {
            Swal.fire({
                icon: "success",
                iconColor: 'var(--main)',
                text: `Memorial upgraded successfully`,
                confirmButtonColor: "var(--main)",
                timer: 3000
            }).then(() => {
                navigate(-1)
            })
        }).catch((err) => {
            // console.log(err, "erer")
            Swal.fire({
                icon: "error",
                iconColor: 'var(--main)',
                text: `${err?.response?.data?.message}`,
                confirmButtonColor: "var(--main)",
                timer: 3000
            }).then(() => {
                setShowProceedDialog(true)
            })
        }).finally(() => {
            setupdating(false)
        })
    }

    const handleClosePayment = () => {
        setshowPaymentDialog(false);
        setShowProceedDialog(true)
        const link = JSON.parse(Local_storage().get("_pay_ref")).payment_link
        window.open(link, '_blank').focus();
    }

    return (
        <div>
            <GoBack />
            <div className="upgrade_body">
                <div className="price_head">
                    <h1>Upgrade subscription</h1>
                    <p>Upgrade subscription and enjoy more features</p>
                </div>
                <UpdateMemoPricing
                    priceType={priceType}
                    planType={planType}
                    clickPlan={
                        async (slug, name, currency, id) => {
                            Local_storage().set('slug', slug);
                            handlePaymentClick(currency, id);
                            setselectedPlan(name)
                        }
                    }
                />
            </div>
            <SuccessPopup
                open={showPaymentDialog}
                close={handleClosePayment}
                title={`${selectedPlan} plan selected`}
                btnText="Proceed to payment"
            // message="Proceed to payment"
            />

            <SuccessWithClose
                open={showProceedDialog}
                close={handleUpdateSub}
                closeClick={handleUpdateSub}
                hideIcon
                title="Confirm payment"
                message="Have you made the payment? if yes, click ok to continue else click on the link below to make payment"
                submessage="Payment link"
            />

        </div>
    )
}

export default Update_sub