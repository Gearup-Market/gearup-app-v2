import React from 'react'
import { DashboardCard } from '../../..'
import styles from './TotalEarningsCard.module.scss'
import { tableEnum } from '../../TotalEarnings'
interface Props {
    item: any
}
const TotalEarningsCard = ({ item }: Props) => {
    return (
        <DashboardCard>
            <div className={styles.container}>
                <p className={styles.container__type}>Type</p>
                <p className={styles.container__type__value}><span data-type={item?.type?.toLowerCase()} className={styles.circle}></span> {tableEnum[item.name as keyof typeof tableEnum]}</p>
            </div>
         {/*    <div className={styles.container}>
                <p className={styles.container__type}>No of Product</p>
                <p className={styles.container__type__value}>{item.no_of_products}</p>
            </div> */}
            <div className={styles.container}>
                <p className={styles.container__type}>% of Revenue</p>
                <p className={styles.container__type__value}>{item.percentage}</p>
            </div>
            <div className={styles.container}>
                <p className={styles.container__type}>Value</p>
                <p className={styles.container__type__value}>{item.amount}</p>
            </div>
        </DashboardCard>
    )
}

export default TotalEarningsCard