'use client'
import React, { useState } from 'react'
import styles from './TransactionOngoing.module.scss'
import HeaderSubText from '@/components/Admin/HeaderSubText/HeaderSubText'
import Image from 'next/image'
import { Button } from '@/shared'
import PaymentRequest from './components/PaymentRequest/PaymentRequest'
import PaymentForm from './components/PaymentForm/PaymentForm'
import { iTransactionDetails, TransactionStage, TransactionStatus } from '@/interfaces'

interface Props {
    handleNext: (stage: TransactionStage, status?: TransactionStatus) => Promise<void>;
	item: iTransactionDetails;
    isTimeElapsed?: boolean
}

const TransactionOngoing = ({ handleNext, isTimeElapsed }: Props) => {
    const [openPaymentForm, setOpenPaymentForm] = useState(false)
    const [openPaymentRequest, setOpenPaymentRequest] = useState(false)

    const handleInitiateReturn = () => {
        setOpenPaymentRequest(true)
    }

    
    return (
        <div className={styles.container}>
            <div className={styles.container_top}>
                <HeaderSubText title="Transaction ongoing" />
                <div className={styles.details_container}>
                    <p className={styles.details}>
                        Transaction is currently ongoing
                    </p>
                </div>
                <div className={styles.details_container}>
                    <p className={styles.details}>
                        You’ll be requested to confirm this transaction as complete once you’ve returned the gear.
                    </p>
                </div>
                <div className={styles.warning_container}>
                    <Image src='/svgs/warningIcon.svg' className={styles.warning_icon} alt='warning' width={10} height={10} />
                    <p className={styles.warning}>
                        {
                            isTimeElapsed ? `You have an overdue payment request from the lender for the extended usage of the gear. To ensure a seamless experience, please review and address the pending payment request promptly.
` : "Gearup Global Insurance coverage starts from 17:00 the day before the shoot and ends at 10:00 the day after the shoot. Failure to report may affect your liability and the resolution process. Your immediate action is crucial for a swift and fair resolution"
                        }
                    </p>
                </div>
            </div>
            <div className={styles.btn_container}>
                <Button buttonType='primary' onClick={() => {
                    if(isTimeElapsed){
                        handleInitiateReturn()
                    }else {
                        handleNext(TransactionStage.AwaitingItemReturn)
                    } 
                }}>
                    {
                        isTimeElapsed ? "Review payment request" : "Initiate return"
                    }
                </Button>
            </div>
            <PaymentRequest openPaymentRequest={openPaymentRequest} setOpenPaymentRequest={setOpenPaymentRequest} setShowPaymentForm={setOpenPaymentForm}/>
            <PaymentForm showPaymentForm={openPaymentForm} setShowPaymentForm={setOpenPaymentForm} handleNext={handleNext}/>
        </div>
    )
}

export default TransactionOngoing