'use cient';
import React, { useState } from 'react'
import styles from './SecretPhraseModal.module.scss'
import Modal from '@/shared/modals/modal/Modal'
import Image from 'next/image';
import { Button, TextArea } from '@/shared';
import Link from 'next/link';


interface Props {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<{
        showSecretPhraseModal: boolean;
        showGoogleBackupModal: boolean;
    }>>
}
const SecretPhraseModal = ({ setOpenModal, openModal }: Props) => {


    const handleSubmit = () => {

    }

    const onClose = () => {
        setOpenModal((prev) => ({ ...prev, showSecretPhraseModal: false }))
    }



    return (
        <Modal title='Secret phrase' openModal={openModal} setOpenModal={onClose} >
            <div className={styles.container}>
                <hr className={styles.divider} />
                <div className={styles.text_area_container}>
                    <TextArea placeholder='Enter secret phrase' rows={8} />
                    <p className={styles.paste_text}>Paste</p>
                </div>
                <p className={styles.text_area_suffix}>Typically 12(sometimes 18,24) words separated by single spaces</p>

                <Button>Restore wallet</Button>
                <Link href='/' className={styles.link_text}>What is a secret phrase?</Link>
            </div>
        </Modal>

    )
}

export default SecretPhraseModal