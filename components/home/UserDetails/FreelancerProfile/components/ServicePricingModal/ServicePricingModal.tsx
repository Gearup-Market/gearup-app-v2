import React from 'react'
import styles from './ServicePricingModal.module.scss'
import Modal from '@/shared/modals/modal/Modal'
import ServicesPricing from '../ServicesPricing/ServicesPricing'

interface Props {
    openModal: boolean
    onClose: () => void
}

const ServicePricingModal = ({ openModal, onClose }: Props) => {
    return (
        <Modal
            title="Checkout"
            openModal={openModal}
            setOpenModal={onClose}
            className={styles.container}
        >
            <ServicesPricing fromProfile={true} />
        </Modal>
    )
}

export default ServicePricingModal