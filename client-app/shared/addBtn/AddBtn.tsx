'use client'
import { GridAddIcon } from '@mui/x-data-grid'
import React from 'react'
import styles from './AddBtn.module.scss'

interface Props {
    onClick?: () => void
    className?: string
}
const AddBtn = ({ onClick, className }: Props) => {
    return (
        <span onClick={onClick} className={`${styles.add_btn} ${className}`}>
            <GridAddIcon sx={{ height: '3rem', width: '3rem' }} />
        </span>
    )
}

export default AddBtn