'use client';
import React, { useState } from 'react'
import styles from './PaymentRequestForm.module.scss'
import Modal from '@/shared/modals/modal/Modal'
import Image from 'next/image';
import { Button, InputField } from '@/shared';
import { Ratings } from '@/shared';
import { SuccessCheck } from '@/shared/svgs/dashboard';
import HeaderSubText from '@/components/Admin/HeaderSubText/HeaderSubText'

interface Props {
    openPaymentForm: boolean;
    setOpenPaymentForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const PaymentRequestForm = ({ openPaymentForm, setOpenPaymentForm }: Props) => {
    const [showEditForm, setShowEditForm] = useState<boolean>(false)
    const [success, setSuccess] = useState(false)
    const [modalTitle, setModalTitle] = useState('Payment Invoice')

    const handleSubmission = () => {
        setSuccess(true)
        setModalTitle('')
    }


    const closeModal = () => {
        setSuccess(false)
        setOpenPaymentForm(false)
    }

    return (
        <Modal openModal={openPaymentForm} setOpenModal={closeModal} title={modalTitle}>
            <div className={styles.container}>
                {
                    !success ?
                        <>
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
                                {
                                    !showEditForm ?
                                        <div className={styles.summary_item}>
                                            <h4>Overtime amount (70% of the Total replacement value)</h4>
                                            <p>$400.0 <span className={styles.edit} onClick={() => setShowEditForm(true)}>Edit</span></p>
                                        </div>
                                        :
                                        <div className={styles.input_container}>
                                            <InputField type='text' label='Percentage of the replacement value' placeholder='Specify amount' icon='/svgs/rounded-icon-close2.svg' iconPosition='suffix' handleSuffixClick={() => setShowEditForm(false)} />
                                        </div>
                                }
                                <div className={styles.summary_item}>
                                    <h4>VAT</h4>
                                    <p>10 days</p>
                                </div>
                                <div className={styles.summary_item}>
                                    <h4>Total</h4>
                                    <p>$400.0</p>
                                </div>
                                <Button className={styles.button} onClick={handleSubmission}>Send Payment Invoice</Button>
                            </div>
                        </>
                        :
                        <div className={styles.notification_container}>
                            <span className={styles.icon}>
                                <SuccessCheck />
                            </span>
                            <HeaderSubText title='Payment Request Sent Successfully!' />
                            <p>Your payment request for the additional gear usage has been successfully sent to the renter. They will receive a notification and can now proceed to fulfill the payment.</p>
                            <Button className={styles.button} onClick={handleSubmission}>Go back to dashboard</Button>
                        </div>
                }
            </div>
        </Modal>
    )
}

export default PaymentRequestForm