import React from 'react'
import styles from './WarningContainer.module.scss'
import { ChevronIcon, WarningIcon } from '@/shared/svgs/dashboard'

const WarningContainer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.container__report_container}>
                <span className={`${styles.warning}`}>
                    <WarningIcon color='#FF3729' />
                </span>
                <div>
                    <h4>Report transaction</h4>
                    <p>report an issue with this transaction</p>
                </div>
                <span className={`${styles.chevron} ${styles.icon}`}>
                    <ChevronIcon />
                </span>
            </div>
        </div>
    )
}

export default WarningContainer