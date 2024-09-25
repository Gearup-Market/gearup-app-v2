import React from 'react'
import styles from './TransactionDetailsBody.module.scss'
import RentTransactions from './components/RentTransactions/RentTransactions'
import BuyTransactions from './components/BuySaleTransactions/BuySaleTransactions'
import CourseTransactions from './components/CoursesTransactions/CourseTransactions'
import { iTransactionDetails } from '@/interfaces'
interface Props {
    item: iTransactionDetails
}
const TransactionDetailsBody = ({ item }: Props) => {
    const transactionType = item.transactionType;
    return (
        <div className={styles.container}>
            {
                transactionType === 'Rental' && <RentTransactions item={item} />
            }
            {
                transactionType === 'Purchase' || transactionType === 'Sale' && <BuyTransactions item={item}/>
            }
            {
                transactionType === 'courses' && <CourseTransactions item={item}/>
            }
        </div>
    )
}

export default TransactionDetailsBody