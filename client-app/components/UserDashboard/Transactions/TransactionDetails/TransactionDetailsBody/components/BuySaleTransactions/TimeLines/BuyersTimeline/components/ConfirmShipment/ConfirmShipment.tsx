import React from 'react'
import styles from './ConfirmShipment.module.scss'
import HeaderSubText from '@/components/Admin/HeaderSubText/HeaderSubText'
import { Button } from '@/shared'

interface Props {
  handleNext: () => void
  thirdPartyVerification?: boolean
}
const ConfirmShipment = ({ handleNext, thirdPartyVerification }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.container_top}>
        <HeaderSubText title="Confirm Shipment" />

        <div className={styles.details_container}>
          {
            !thirdPartyVerification ?
              <p className={styles.details}>
                Please make sure you’ve successfully received the gear from the seller before confirming shipment
              </p> :
              <p className={styles.details}>
                Please make sure you’ve successfully received the gear from the service center before confirming shipment
              </p>
          }
        </div>
        <div className={styles.details_container}>
          {
            !thirdPartyVerification ?
              <p className={styles.details}>
                The seller has up to 48 hours after accepting the transaction to ship your gear to you, else your money will be refunded to you
              </p>
              :
              <p className={styles.details}>Your equipment will be delivered to you 24-48hours after inspection</p>
          }
        </div>
      </div>
      <div className={styles.btn_container}>
        <Button onClick={handleNext}>Confirm Shipment</Button>
      </div>
    </div>
  )
}

export default ConfirmShipment