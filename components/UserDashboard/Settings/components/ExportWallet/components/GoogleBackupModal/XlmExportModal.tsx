'use cient';
import React, { useState } from 'react'
import styles from './XlmExportModal.module.scss'
import Modal from '@/shared/modals/modal/Modal'
import Image from 'next/image';
import { CopyIcon, WarningIcon } from '@/shared/svgs/dashboard';
import { copyText } from '@/utils';
import { Button } from '@/shared';


interface Props {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const keyPhrases = [
    'Phrase 1',
    'Phrase 2',
    'Phrase 3',
    'Phrase 4',
    'Phrase 5',
    'Phrase 6',
    'Phrase 7',
    'Phrase 8',
    'Phrase 9',
    'Phrase 10',
    'Phrase 11',
    'Phrase 12',

]


const GoogleBackupMoal = ({ setOpenModal, openModal }: Props) => {
    const [viewPasskey, setViewPasskey] = useState(false)

    const handleSubmit = () => {

    }

    const onClose = () => {
        setOpenModal(false)
        setViewPasskey(false)
    }

    const onClickCopy = () => {
        copyText('Copied')
    }
    
    const handleClick = (e: any) => {
        e.stopPropagation()
        setViewPasskey(!viewPasskey)
    }


    return (
        <Modal title="Export XLM Wallet" openModal={openModal} setOpenModal={onClose} >
            <div className={styles.container}>

                <hr className={styles.divider} />
                <div className={styles.warning_container}>
                    <span className={styles.icon}>
                        <WarningIcon color='#A26B00' />
                    </span>
                    <p>Exporting your wallet will reveal sensitive information. Ensure it is stored securely, as <br /> anyone with this data can access your funds. Proceed with caution.</p>
                </div>
                <div className={styles.wallet_container} onClick={onClickCopy}>
                    <p>Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.</p>
                    <div className={styles.clipboard_container}>
                        <span className={styles.icon}>
                            <CopyIcon />
                        </span>
                        <p className={styles.copy}>Copy to clipboard</p>
                    </div>
                    {
                        !viewPasskey &&
                    <div className={styles.mask_container}>
                        <Button onClick={handleClick}>View passkey</Button>
                    </div>
                    }
                </div>

            </div>
        </Modal>

    )
}

export default GoogleBackupMoal