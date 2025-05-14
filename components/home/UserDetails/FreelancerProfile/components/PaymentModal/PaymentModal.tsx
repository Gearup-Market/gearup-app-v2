import React from 'react'
import styles from './PaymentModal.module.scss'
import Modal from '@/shared/modals/modal/Modal'
import { PaymentComp } from '@/components/CartComponent/CheckoutComp'
import { useAppSelector } from '@/store/configureStore'
import { Listing } from '@/store/slices/listingsSlice'

interface Props {
    openModal: boolean
    onClose: () => void
}

const PaymentModal = ({ openModal, onClose }: Props) => {
    const { checkout } = useAppSelector(s => s.checkout);

    return (
        <Modal
            title="Choose payment option"
            openModal={openModal}
            setOpenModal={onClose}
            className={styles.container}
        >
            <h3>The payment method is commented out because it has not been integrated</h3>
            {/* <PaymentComp
                item={checkout?.item ?? {} as Listing}
                amount={checkout?.amount ?? 5600}
                type={checkout?.type ?? ""}
                listingModelType={checkout?.listingModelType ?? ""}
            /> */}
        </Modal>
    )
}

export default PaymentModal