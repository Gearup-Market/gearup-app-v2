'use client'
import React, { useEffect, useState } from 'react'
import styles from './StatusUpdate.module.scss'
import { CustomRadioButton } from '@/shared'


const statuses = [
    {
        title: 'Pending',
        id: 1,

    },
    {
        title: 'Ongoing',
        id: 2,

    },
    {
        title: 'Completed',
        id: 3,

    },
    {
        title: 'Dispute',
        id: 4,

    },
    {
        title: 'Declined',
        id: 5,
    }
]

interface Props {
    activeStatus: string
}

const StatusUpdate = ({ activeStatus }: Props) => {
    const [active, setActive] = useState(1)


    const handleChange = (id: number) => {
        setActive(id)
    }

    useEffect(() => {
        const status = statuses.findIndex(status => status?.title?.toLowerCase() === activeStatus?.toLowerCase()) ?? 0
        setActive(status + 1)
    }, [activeStatus])

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Status</h3>
            <ul className={styles.statuses_container}>
                {
                    statuses.map((status, index) => {
                        return (
                            <li key={index} className={styles.status}>
                                <h4 data-active={index + 1 === active} className={styles.status_title}>{status.title}</h4>
                                <CustomRadioButton disabled={true} checked={index + 1 === active} onChange={() => handleChange(index + 1)} />
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default StatusUpdate