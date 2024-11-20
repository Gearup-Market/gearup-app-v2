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


    return (
        <div className={styles.container}>
            <div className={`${styles.container__item}`}>Download receipt</div>
            <div className={`${styles.container__item} ${styles.share}`}>Share</div>
        </div>
    )
}

export default MoreModal