import React, { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { IoCopyOutline } from 'react-icons/io5'
import './style.css'

const Copy = ({ email }) => {
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        if (copied) {
            setTimeout(() => {
                setCopied(false)
            }, 2000);
        }
    }, [copied])

    return (
        <div className="email_copy">
            <span>{email.substring(0, 32)}...</span>
            <div className="showDesktop">
                <CopyToClipboard
                    onCopy={() => setCopied(true)}
                    text={email}>
                    <IoCopyOutline size="14px" />

                </CopyToClipboard>
            </div>
            <div className="showMobile">
                <CopyToClipboard
                    onCopy={() => setCopied(true)}
                    text={email}>
                    <IoCopyOutline size="13px" />

                </CopyToClipboard>
                
            </div>
            {
                copied ? 
                    <div className='copied' >Copied</div> 
                    : ""
            }
        </div>
    )
}

export default Copy
