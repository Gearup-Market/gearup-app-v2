'use client'
import React, { useEffect } from 'react'
import styles from './TransactionDetails.module.scss'
import { TransactionDetailsBody, TransactionDetailsHeader } from '@/components/Admin/Transactions/TransactionDetails'
import { transactions } from '@/mock/transactions.mock'
interface Props {
    slug: string
}

const TransactionDetails = ({ slug }: Props) => {
    const [item, setItem] = React.useState<any>()

    useEffect(() => {
        setItem(transactions.find((item) => item.id.toString() === slug))
    }, [slug])
    return (
        <div className={styles.container}>
            <TransactionDetailsHeader slug={slug} item={item} />
            <TransactionDetailsBody item={item} />
        </div>
    )
}

export default TransactionDetails