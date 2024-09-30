import React from 'react'
import styles from './ConfirmHandover.module.scss'
import { Button } from '@/shared'
import HeaderSubText from '@/components/Admin/HeaderSubText/HeaderSubText'
import { iTransactionDetails, TransactionStage, TransactionStatus } from '@/interfaces';
interface Props {
  handleNext: (stage: TransactionStage, status?: TransactionStatus) => Promise<void>;
	item: iTransactionDetails;
}
const ConfirmHandover = ({ handleNext }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.container_top}>
        <HeaderSubText title="Confirm handover" />

        <div className={styles.details_container}>
          <p className={styles.details}>
            Please make sure the gear has been released and delivered to the rental before confirming handover
          </p>
        </div>
        <div className={styles.details_container}>
          <p className={styles.details}>
            Shipping can be made either in person (local pick-up) or shipped to an address agreed upon by you and the renter
          </p>
        </div>
        <div className={styles.details_container}>
          <p className={styles.details}>
            After confirming handover, the transaction will be initiated once the renter also  successfully confirmed the gear is in their possession
          </p>
        </div>
      </div>
      <div className={styles.btn_container}>
        <Button onClick={() => handleNext(TransactionStage.SellerShipped)}>Confirm handover</Button>
      </div>
    </div>
  )
}

export default ConfirmHandover