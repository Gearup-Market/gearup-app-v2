'use client'
import { Switch } from '@mui/material'
import React from 'react'
import styles from './MoreModal.module.scss'
import { ToggleSwitch } from '@/shared'

interface MoreModalProps {
    row?: any;
    onClose?: () => void;
    containerRef?: HTMLDivElement
}

enum MoreModalActions {
    EDIT = 1,
    PREVIEW = 2,
    DELETE = 3
}

const MoreModal = ({ row }: MoreModalProps) => {
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

    return (
        <div className={styles.container}>
            <div className={`${styles.container__item}`}>Download receipt</div>
            <div className={`${styles.container__item} ${styles.share}`}>Share</div>
        </div>
    )
}

export default MoreModal