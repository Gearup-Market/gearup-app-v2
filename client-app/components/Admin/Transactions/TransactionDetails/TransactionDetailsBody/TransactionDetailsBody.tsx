import React from 'react'
import styles from './TransactionDetailsBody.module.scss'
import { useSearchParams } from 'next/navigation'
import DetailsComponent from './components/Details/Details'
interface Props {
    item: any
}
const TransactionDetailsBody = ({ item }: Props) => {
    const search = useSearchParams()
    return (
        <div className={styles.container}>
            <DetailsComponent item={item} />
        </div>
    )
}

export default TransactionDetailsBody