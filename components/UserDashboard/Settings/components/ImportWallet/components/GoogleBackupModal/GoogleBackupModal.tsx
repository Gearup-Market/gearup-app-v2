'use cient';
import React, { useState } from 'react'
import styles from './GoogleBackupModal.module.scss'
import Modal from '@/shared/modals/modal/Modal'
import Image from 'next/image';
import { CopyIcon, WarningIcon } from '@/shared/svgs/dashboard';


interface Props {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<{
        showSecretPhraseModal: boolean;
        showGoogleBackupModal: boolean;
    }>>
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

    const handleSubmit = () => {

    }

    const onClose = () => {
        setOpenModal((prev) => ({ ...prev, showGoogleBackupModal: false }))
    }



    return (
        <Modal title="Back up manually" openModal={openModal} setOpenModal={onClose} >
            <div className={styles.container}>

                <hr className={styles.divider} />
                <div className={styles.warning_container}>
                    <span className={styles.icon}>
                        <WarningIcon color='#A26B00' />
                    </span>
                    <p>Note: Write down your <span className={styles.bold}>secret phrase</span> and store it in a secure offline location and never share it with anyone.</p>
                </div>

                <ul className={styles.key_phrase_container}>
                    {
                        keyPhrases.map((phrase, index) => (
                            <li key={index} className={styles.phrase}>
                                <span>{phrase}</span>
                            </li>
                        ))
                    }
                </ul>
                <div className={styles.clipboard_container}>
                    <span className={styles.icon}>
                        <CopyIcon />
                    </span>
                    <p>Copy to clipboard</p>
                </div>

            </div>
        </Modal>

    )
}

export default GoogleBackupMoal