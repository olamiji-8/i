import { Dialog } from '@mui/material'
import PrimaryBtn from '../Buttons/PrimaryBtn'
import './style.css'
import {GiCheckMark} from 'react-icons/gi'
import { Local_storage } from '../../utils/LocalStorageConfig'
import { AiFillCloseCircle } from 'react-icons/ai'

const SuccessWithClose = ({ open, close, title, message, btnText, hideIcon, submessage, closeClick }) => {
    return (
        <div>
            <Dialog open={open} maxWidth="sm">
                <>
                    <div className="dialogArea">
                        {
                            hideIcon ? 
                            <></>
                            :
                            <div className="iconArea">
                                <GiCheckMark size={36} color="white"/>
                            </div>
                        }
                       
                        <div className="titleArea">
                            {title}
                        </div>
                        <div className="messageArea">
                            {message}
                        </div>
                        {
                            submessage ?
                            <div onClick={()=>window.open(JSON.parse(Local_storage().get("_pay_ref")).payment_link, '_blank').focus()} className="sub_message">
                                {submessage}
                            </div>
                            :
                            <></>
                        }
                        <span className='closeIcon'>
                            <AiFillCloseCircle onClick={closeClick} size={24} color="maroon"/>
                        </span>
                    </div>
                    <div className="btnArea">
                        <PrimaryBtn
                            txtColor="white"
                            pd="8px"
                            br="8px"
                            w="100%"
                            bg="var(--main)"
                            hoverBG="var(--main)"
                            txt={ btnText ? btnText : "Continue" }
                            fw="500"
                            onClick={close}
                        />
                    </div>
                </>
            </Dialog>
        </div>
    )
}

export default SuccessWithClose
