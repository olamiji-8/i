import { Dialog } from '@mui/material'
import PrimaryBtn from '../Buttons/PrimaryBtn'
import './style.css'
import { IoClose } from 'react-icons/io5'

const ErrorPopup = ({ open, close,tryAgain, title, message }) => {
    return (
        <div>
            <Dialog open={open} maxWidth="sm">
                <>
                    <div className="dialogArea">
                        <div className="iconAreaError">
                            <IoClose size={40} color="white"/>
                        </div>
                        <div className="titleArea">
                            {title}
                        </div>
                        <div className="messageArea">
                            {message}
                        </div>
                    </div>
                    <div className="btnAreaError">
                        <PrimaryBtn
                            txtColor="#9BA9B9"
                            pd="8px"
                            br="8px"
                            w="130px"
                            bg="#D0DEEB"
                            hoverBG="#D0DEEB"
                            txt="Cancel"
                            fw="500"
                            onClick={close}
                        />
                        <PrimaryBtn
                            txtColor="white"
                            pd="8px"
                            br="8px"
                            w="130px"
                            bg="var(--main)"
                            hoverBG="var(--main)"
                            txt="Try again"
                            fw="500"
                            onClick={tryAgain}
                        />
                    </div>
                </>
            </Dialog>
        </div>
    )
}

export default ErrorPopup
