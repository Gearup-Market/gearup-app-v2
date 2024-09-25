'use client'
import { Button } from '@/shared'
import styles from './ReceiptDetails.module.scss'
import React, { useState } from 'react'
import { ChevronIcon } from '@/shared/svgs/dashboard'

const ReceiptDetails = () => {
    const [showReceiptBtns, setShowReceiptBtns] = useState(false)
    return (
        <div className={styles.container}>
            <div className={styles.container__receipt_container}>
                <div className={styles.receipt_header}>
                    <h4 className={styles.receipt_title}>Receipt</h4>
                    <span data-active={showReceiptBtns} className={styles.icon} onClick={() => setShowReceiptBtns((prev) => !prev)}>
                        <ChevronIcon />
                    </span>
                </div>
                {
                    showReceiptBtns &&
                    <>
                        <div className={styles.btn_container}>
                            <Button buttonType='secondary' className={styles.btn}>View Receipt</Button>
                            <Button buttonType='secondary' className={styles.btn}>Resend receipt</Button>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default ReceiptDetails