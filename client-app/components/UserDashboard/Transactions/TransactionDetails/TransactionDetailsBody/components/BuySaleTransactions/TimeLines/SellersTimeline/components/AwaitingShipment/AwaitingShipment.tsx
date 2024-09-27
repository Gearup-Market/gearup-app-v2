import React from 'react'
import styles from './AwaitingShipment.module.scss'
import HeaderSubText from '@/components/Admin/HeaderSubText/HeaderSubText'
import { TransactionStage, TransactionStatus } from '@/interfaces';

interface Props {
    handleNext: (stage: TransactionStage, status?: TransactionStatus) => Promise<void>;
}

const AwaitingShipment = ({ handleNext }: Props) => {
    return (
        <div className={styles.container}>
            <HeaderSubText title="Awaiting Shipment" />
            <div className={styles.details_container}>
                <p className={styles.details}>
                    Your gear is currently been processed for shipment by the service center</p>
            </div>
            <div className={styles.details_container}>
                <p className={styles.details}>
                    Once your gear is shipped, you will be required to confirm shipment
                </p>
            </div>
        </div>
    )
}

export default AwaitingShipment