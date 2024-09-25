'use client';
import React, { useState } from 'react'
import styles from './PaymentRequest.module.scss'
import Modal from '@/shared/modals/modal/Modal'
import Image from 'next/image';
import { Button } from '@/shared';
import { Ratings } from '@/shared';
import { SuccessCheck } from '@/shared/svgs/dashboard';
import HeaderSubText from '@/components/Admin/HeaderSubText/HeaderSubText'

interface Props {
    openPaymentRequest: boolean;
    setOpenPaymentRequest: React.Dispatch<React.SetStateAction<boolean>>;
    setShowPaymentForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const PaymentRequest = ({ openPaymentRequest, setOpenPaymentRequest, setShowPaymentForm }: Props) => {
    const [modalTitle, setModalTitle] = useState('Review payment request')

    const handleSubmission = () => {
        setOpenPaymentRequest(false)
        setShowPaymentForm(true)
    }


    const closeModal = () => {
        setOpenPaymentRequest(false)
    }

    return (
        <Modal openModal={openPaymentRequest} setOpenModal={closeModal} title={modalTitle}>
            <div className={styles.container}>
                            <div className={styles.container__header}>
                                <Image src='https://images.unsplash.com/photo-1582994254571-52c62d96ebab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtZXJhJTIwbGVuc3xlbnwwfHwwfHx8MA%3D%3D' alt='payment invoice' width={50} height={50} />
                                <h3>Hollyland Solidcom C1-6S Intercoms 6x</h3>
                            </div>
                            <div className={styles.container__summary_container}>
                                <div className={styles.summary_item}>
                                    <h4>Renter</h4>
                                    <div className={styles.renter_name}>
                                        <Image src='https://images.unsplash.com/photo-1582994254571-52c62d96ebab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtZXJhJTIwbGVuc3xlbnwwfHwwfHx8MA%3D%3D' alt='payment invoice' width={50} height={50} />
                                        <h3>Einstein</h3>
                                        <Ratings />
                                    </div>
                                </div>
                                <div className={styles.summary_item}>
                                    <h4>Type</h4>
                                    <p className={styles.type_container}>Rental</p>
                                </div>
                                <div className={styles.summary_item}>
                                    <h4>Rental duration</h4>
                                    <p>15 Dec 2023 - 19 Dec 2023</p>
                                </div>
                                <div className={styles.summary_item}>
                                    <h4>Gearup fee</h4>
                                    <p>$40.00</p>
                                </div>
                                <div className={styles.summary_item}>
                                    <h4>VAT</h4>
                                    <p>10 days</p>
                                </div>
                                <div className={styles.summary_item}>
                                    <h4>Overtime fee</h4>
                                    <p>$40.00</p>
                                </div>
                                <div className={styles.summary_item}>
                                    <h4>Total</h4>
                                    <p>$400.0</p>
                                </div>
                                <Button className={styles.button} onClick={handleSubmission}>Pay now</Button>
                            </div>
                       
            </div>
        </Modal>
    )
}

export default PaymentRequest