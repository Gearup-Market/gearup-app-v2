import React from 'react'
import styles from './AwaitingConfirmation.module.scss'
import HeaderSubText from '@/components/Admin/HeaderSubText/HeaderSubText'
import { useSearchParams } from 'next/navigation'
import { iTransactionDetails } from '@/interfaces';

interface Props {
  item: iTransactionDetails;
}
const AwaitingConfirmation = ({item}: Props) => {
  const {metadata} = item;
  const thirdPartyVerification = !!metadata?.thirdPartyCheckup;
  return (
    <div className={styles.container}>
      <HeaderSubText title="Awaiting Confirmation" />
      {
        thirdPartyVerification ?

          <>
            <div className={styles.details_container}>
              <p className={styles.details}>
                Awaiting confirmation from the Gearup service center to confirm they’ve received the shipment for inspection</p>
            </div>
            <div className={styles.details_container}>
              <p className={styles.details}>
                Once your shipment has been confirmed by the service center, Inspection will commence immediately and the status report of the inspection will be communicated to you after the inspection
              </p>
            </div>
          </>
          :
          <>
            <div className={styles.details_container}>
              <p className={styles.details}>
                Awaiting confirmation from the buyer to confirm they’ve received the shipment in good condition</p>
            </div>
            <div className={styles.details_container}>
              <p className={styles.details}>
                Once your shipment has been confirmed by the buyer, the transaction will be completed
              </p>
            </div>
          </>
      }
    </div>
  )
}

export default AwaitingConfirmation