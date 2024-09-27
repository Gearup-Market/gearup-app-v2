'use client'
import React, { useState } from 'react'
import styles from './StatusUpdate.module.scss'
import { CustomRadioButton, RadioInput } from '@/shared'


const statuses = [
    {
        title: 'Pending',
        id: 1,

    },
    {
        title: 'Ongoing',
        id: 2

    },
    {
        title: 'Completed',
        id: 3

    },
    {
        title: 'Dispute',
        id: 4

    },
    {
        title: 'Canceled',
        id: 5

    }
]

const StatusUpdate = () => {
    const [active, setActive] = useState(1)


    const handleChange = (id: number) => {
        setActive(id)
    }
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Status</h3>

            <ul className={styles.statuses_container}>
                {
                    statuses.map((status, index) => {
                        return (
                            <li key={index} className={styles.status}>
                                <h4 data-active={index + 1 === active} className={styles.status_title}>{status.title}</h4>


                                <CustomRadioButton checked={index + 1 === active} onChange={() => handleChange(index + 1)} />

                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default StatusUpdate