'use client'
import { Switch } from '@mui/material'
import React from 'react'
import styles from './MoreModal.module.scss'
import { ToggleSwitch } from '@/shared'

const MoreModal = () => {
    const [checked, setChecked] = React.useState(false)
    return (
        <div className={styles.container}>
            <div className={`${styles.container__edit} ${styles.item}`}>Edit</div>
            <div className={`${styles.container__status_container} ${styles.item}`}>
                <span className={styles.status}>Status</span>
                <span className={styles.switch}>
                    <ToggleSwitch onChange={() => setChecked((prev) => !prev)} />
                    {checked ? 'Live' : 'Hidden'}
                </span>
            </div>
            <div className={`${styles.container__delete} ${styles.item}`}>Delete</div>
        </div>
    )
}

export default MoreModal