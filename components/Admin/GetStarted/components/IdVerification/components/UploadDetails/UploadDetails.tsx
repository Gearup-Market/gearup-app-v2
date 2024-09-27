'use client'
import React from 'react'
import styles from './UploadDetails.module.scss'
import { RedoIcon, CloseIcon, TrashIcon, DocumentIcon } from '@/shared/svgs/dashboard'

interface ItemProps {
    name: string;
    size: string;
    status: string;
}

interface Props {
    item: ItemProps
}
const UploadedDetails = ({ item }: Props) => {
    const iconColor = item.status === 'success' ? '#40B773' : item.status === 'error' ? '#FF3729' : '#FFB30F';
    return (
        <div className={styles.container}>
            <div className={styles.container__left}>
                <span className={`${styles.document} ${styles.document_icon}`} data-status={item.status}>
                    <DocumentIcon color={iconColor} />
                </span>
                <div className={styles.name_container}>
                    <p className={styles.name}>{item.name}</p>
                    <p className={styles.size}>{item.size}</p>
                </div>
            </div>
            <div className={styles.container__right}>
                {
                    item.status === 'success' && (
                        <div className={`${styles.success} ${styles.icon}`}>
                            <TrashIcon />
                        </div>
                    )
                }
                {
                    item.status === 'error' && (
                        <div className={`${styles.error} ${styles.icon}`}>
                            <RedoIcon />
                        </div>
                    )
                }
                {
                    item.status === 'uploading' && (
                        <div className={`${styles.uploading} ${styles.icon}`}>
                           <CloseIcon color="#A4A6A7"/>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default UploadedDetails