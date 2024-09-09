'use client'
import { Switch } from '@mui/material'
import React from 'react'
import styles from './MoreModal.module.scss'
import { ToggleSwitch } from '@/shared'

interface MoreModalProps {
    row?: any;
    activeFilter?: string;
}

enum MoreModalActions {

    EDIT = 2,
    PREVIEW = 2,
    DELETE = 3
}

const MoreModal = ({ row, activeFilter }: MoreModalProps) => {
    const [checked, setChecked] = React.useState(false)

    const handleActions = (id: number) => {
        console.log(id)
        switch (id) {
            case MoreModalActions.EDIT:

                console.log(`editing ${row.title}`)
                break;
            case MoreModalActions.PREVIEW:
                console.log(`previewing ${row.title}`)
                break;
            case MoreModalActions.DELETE:
                console.log(`deleting ${row.title}`)
                break;
            default:
                break;
        }
    }
    // console.log(activeFilter)
    return (
        <div className={styles.container}>
            {activeFilter === 'courses' && <div className={`${styles.container__edit} ${styles.item}`}>View Details</div>}
            <div className={`${styles.container__edit} ${styles.item}`}>Edit</div>
            {
                activeFilter === 'courses' ?
                    <div className={`${styles.container__edit} ${styles.item}`}>Share</div>
                    :
                    <div className={`${styles.container__status_container} ${styles.item}`}>
                        <span className={styles.status}>Status</span>
                        <span className={styles.switch}>
                            <ToggleSwitch onChange={() => setChecked((prev) => !prev)} />
                            {checked ? 'Live' : 'Hidden'}
                        </span>
                    </div>
            }
            <div className={`${styles.container__delete} ${styles.item}`}>Delete</div>
        </div>
    )
}

export default MoreModal