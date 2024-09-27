'use client'
import React, { useEffect } from 'react'
import styles from './ThirdPartyCheckDetails.module.scss'
import { TransactionDetailsBody, TransactionDetailsHeader } from '@/components/Admin/ThirdPartyCheck/TransactionDetails'
import { transactions } from '@/mock/transactions.mock'
interface Props {
    slug: string
}

const ThirdPartyCheckDetails = ({ slug }: Props) => {
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

export default ThirdPartyCheckDetails