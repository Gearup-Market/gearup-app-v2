'use cient';
import React from 'react'
import styles from './SetTransactionPinModal.module.scss'
import Modal from '@/shared/modals/modal/Modal'
import { AccountPinSet } from '../../../Account/Components';


interface Props {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}
const SetTransactionPinModal = ({ setOpenModal, openModal }: Props) => {

    const onClose = () => {
        setOpenModal(false)
    }



    return (
        <Modal title='' description='' openModal={openModal} setOpenModal={onClose} >
            <div className={styles.container}>
                <AccountPinSet inModal={true} onClose={onClose}/>
            </div>
        </Modal>

    )
}

export default SetTransactionPinModal