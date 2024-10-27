'use cient';
import React, { useState } from 'react'
import styles from './SetTransactionPinModal.module.scss'
import Modal from '@/shared/modals/modal/Modal'
import Image from 'next/image';
import { Button, TextArea } from '@/shared';
import Link from 'next/link';
import { AccountPinSet } from '../../../Account/Components';


interface Props {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}
const SetTransactionPinModal = ({ setOpenModal, openModal }: Props) => {


    const handleSubmit = () => {

    }

    const onClose = () => {
        setOpenModal(false)
    }



    return (
        <Modal title='' description='' openModal={openModal} setOpenModal={onClose} >
            <div className={styles.container}>
                <AccountPinSet inModal={true} />
            </div>
        </Modal>

    )
}

export default SetTransactionPinModal