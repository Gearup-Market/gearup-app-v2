import React from 'react'
import styles from './ConfirmReturn.module.scss'
import HeaderSubText from '@/components/Admin/HeaderSubText/HeaderSubText'
import { Button } from '@/shared'
import { TransactionStage, TransactionStatus } from '@/interfaces';
interface Props {
    handleNext: (stage: TransactionStage, status?: TransactionStatus) => Promise<void>;
}
const ConfirmReturn = ({ handleNext }: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.container_top}>
                <HeaderSubText title="Confirm handover" />

                <div className={styles.details_container}>
                    <p className={styles.details}>
                        Please make sure you’ve received your gear and in the same condition as released before confirming the transaction completed
                    </p>
                </div>
                <div className={styles.details_container}>
                    <p className={styles.details}>
                        If after receiving your gear and you discovered a deformation or an abuse of the equipment, please make sure you report the abuse immediately.
                    </p>
                </div>
            </div>
            <div className={styles.btn_container}>
                <Button onClick={() => handleNext(TransactionStage.ReviewAndFeedback)}>Completed</Button>
            </div>
        </div>
    )
}

export default ConfirmReturn