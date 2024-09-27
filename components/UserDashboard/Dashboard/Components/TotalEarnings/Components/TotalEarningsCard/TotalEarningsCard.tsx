import React from 'react'
import { DashboardCard } from '../../..'
import styles from './TotalEarningsCard.module.scss'
interface Props {
    item: any
}
const TotalEarningsCard = ({ item }: Props) => {
    return (
        <DashboardCard>
            <div className={styles.container}>
                <p className={styles.container__type}>Type</p>
                <p className={styles.container__type__value}><span data-type={item?.type?.toLowerCase()} className={styles.circle}></span> {item.type}</p>
            </div>
            <div className={styles.container}>
                <p className={styles.container__type}>No of Product</p>
                <p className={styles.container__type__value}>{item.no_of_products}</p>
            </div>
            <div className={styles.container}>
                <p className={styles.container__type}>% of Revenue</p>
                <p className={styles.container__type__value}>{item.revenue_percentage}</p>
            </div>
            <div className={styles.container}>
                <p className={styles.container__type}>Value</p>
                <p className={styles.container__type__value}>{item.value}</p>
            </div>
        </DashboardCard>
    )
}

export default TotalEarningsCard