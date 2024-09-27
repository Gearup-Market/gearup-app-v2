import React from 'react'
import styles from './AwaitingConfirmation.module.scss'
import HeaderSubText from '@/components/Admin/HeaderSubText/HeaderSubText'


const AwaitingConfirmation = () => {
    return (
        <div className={styles.container}>
            <HeaderSubText title="Awaiting Confirmation" />

            <div className={styles.details_container}>
                <p className={styles.details}>
                    Awaiting the lender to confirm they’ve received the gear in a good condition</p>
            </div>
            <div className={styles.details_container}>
                <p className={styles.details}>
                    After your client confirmed handover, the transaction will be completed
                </p>
            </div>
        </div>
    )
}

export default AwaitingConfirmation