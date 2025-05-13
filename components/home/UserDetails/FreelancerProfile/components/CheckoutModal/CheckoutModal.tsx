import React from 'react'
import styles from './CheckoutModal.module.scss'
import Modal from '@/shared/modals/modal/Modal'
import { Button } from '@/shared'

interface Props {
    openModal: boolean
    onClose: () => void
    showBackIcon?: boolean
}

const CheckoutModal = ({ openModal, onClose, showBackIcon = false }: Props) => {
    return (
        <Modal
            title="Checkout"
            openModal={openModal}
            setOpenModal={onClose}
            className={styles.container}
            addBackIcon={showBackIcon}
        >
            <div className={styles.header}>
                <div className={styles.header_left}>
                    <h2>Basic Photography Package</h2>
                    <p>25 photographs for your events and marketing services</p>
                </div>
                <div className={styles.header_amount}><span className={styles.amount}>$2</span>/day</div>
            </div>

            <Button>Continue</Button>
        </Modal>
    )
}

export default CheckoutModal