import React from 'react'
import styles from './InitiateReturn.module.scss'
import HeaderSubText from '@/components/Admin/HeaderSubText/HeaderSubText'
import Image from 'next/image'
import { Button } from '@/shared'
import { TransactionStage, TransactionStatus } from '@/interfaces'
interface Props {
    handleNext: (stage: TransactionStage, status?: TransactionStatus) => Promise<void>;
}

const InitiateReturn = ({ handleNext }: Props) => {
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
                        Please make sure you’ve returned the gear and in the same condition as received before confirming the transaction completed
                    </p>
                </div>
                <div className={styles.details_container}>
                    <p className={styles.details}>
                        Before this transaction will be marked completed, the lender also need to confirm they’ve received the gear in good condition
                    </p>
                </div>
                <div className={styles.details_container}>
                    <p className={styles.details}>
                        If after returning the gear and the lender discovered a deformation or an abuse of the equipment, that is not within our insurance coverage, you will be required to pay for the damages
                    </p>
                </div>
                <div className={styles.details_container}>
                    <p className={styles.details}>
                        Note: Gearup insurrance coverage only cover damages like theft, fire damage, electrical damage, damage due to drop of equipment, storm and rainfall.
                    </p>
                </div>
                <div className={styles.details_container}>
                    <p className={styles.details}>
                        We do not cover damages like under water usage, wear and tear, or deals outside Gearup
                    </p>
                </div>
            </div>
            <div className={styles.btn_container}>
                <Button onClick={() => handleNext(TransactionStage.AwaitingLenderConfirmation)}>Completed</Button>
            </div>
        </div>
    )
}

export default InitiateReturn