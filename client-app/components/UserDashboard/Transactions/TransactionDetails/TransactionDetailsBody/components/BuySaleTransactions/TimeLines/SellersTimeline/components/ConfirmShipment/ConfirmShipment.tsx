import React from 'react'
import styles from './ConfirmShipment.module.scss'
import HeaderSubText from '@/components/Admin/HeaderSubText/HeaderSubText'
import { Button } from '@/shared'

interface Props {
    handleNext: () => void
}
const ConfirmShipment = ({ handleNext }: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.container_top}>
                <HeaderSubText title="Confirm Shipment" />

                <div className={styles.details_container}>
                    <p className={styles.details}>
                        Please make sure you’ve successfully received the gear from the seller before confirming shipment
                    </p>
                </div>
            </div>
            <div className={styles.btn_container}>
                <Button onClick={handleNext}>Confirm Shipment</Button>
            </div>
        </div>
    )
}

export default ConfirmShipment