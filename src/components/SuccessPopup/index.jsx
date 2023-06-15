import { Dialog } from '@mui/material'
import PrimaryBtn from '../Buttons/PrimaryBtn'
import './style.css'
import {GiCheckMark} from 'react-icons/gi'
import { Local_storage } from '../../utils/LocalStorageConfig'

const SuccessPopup = ({ open, close, title, message, btnText }) => {
    return (
        <div>
            <Dialog open={open} maxWidth="sm">
                <>
                    <div className="dialogArea">
                        <div className="iconArea">
                            <GiCheckMark size={36} color="white"/>
                        </div>
                        <div className="titleArea">
                            {title}
                        </div>
                        <div className="messageArea">
                            {message}
                        </div>
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

export default SuccessPopup
