import React, { useState } from 'react'
import styles from './CheckoutModal.module.scss'
import Modal from '@/shared/modals/modal/Modal'
import { Button } from '@/shared'
import PaymentModal from '../PaymentModal/PaymentModal'

interface Props {
    openModal: boolean
    onClose: () => void
    showBackIcon?: boolean
    activePlanType: string
}

const CheckoutModal = ({ openModal, onClose, showBackIcon = false, activePlanType }: Props) => {
    const [isPayment, setIsPayment] = useState(false)

    const handleCheckout = () => {
        setIsPayment(true)
    }

    const closePayment = () => {
        setIsPayment(false)
        onClose()
    }

    if (!isPayment) {

        return (
            <Modal
                title="Checkout"
                openModal={openModal}
                setOpenModal={onClose}
                className={styles.container}
                addBackIcon={showBackIcon}
                onClickBack={onClose}
            >
                <div className={styles.header}>
                    <div className={styles.header_left}>
                        <h2>{activePlanType} Photography Package</h2>
                        <p>25 photographs for your events and marketing services</p>
                    </div>
                    <div className={styles.header_amount}><span className={styles.amount}>$2</span>/day</div>
                </div>

                <div className={styles.date_section}>
                    <h3>Choose project start / end dates</h3>
                    <div className={styles.dates_wrapper}>
                        <input type="date" />
                        <input type="date" />
                    </div>
                </div>

                <div className={styles.items_container}>
                    <PriceItem item="Service price (2 day)" value="$2.00" />
                    <PriceItem item="Gearup service fee" value="$0.00" />
                    <PriceItem item="VAT" value="$2.00" />
                    <hr />
                    <PriceItem item="Total" value="$2.00" isTotal={true} />
                </div>

                <Button onClick={handleCheckout}>Checkout</Button>

            </Modal>
        )
    }
    return (
        <PaymentModal openModal={isPayment} onClose={closePayment} />
    )
}

export default CheckoutModal


const PriceItem = ({ item, value, isTotal }: { item: string; value: React.ReactNode; isTotal?: boolean }) => {
    return (
        <div className={styles.item}>
            <p>{item}</p>
            <h3 data-isTotal={isTotal}>{value}</h3>
        </div>
    )
}