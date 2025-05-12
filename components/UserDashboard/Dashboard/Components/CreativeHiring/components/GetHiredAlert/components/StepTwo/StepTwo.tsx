import React from 'react'
import styles from './StepTwo.module.scss'
import { TextArea } from '@/shared'

const StepTwo = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Professional Profile</h2>
            </div>
            <div className={styles.form}>
                <TextArea placeholder="Type here..." label="Job title (You can add more than one job role)" />
                <TextArea placeholder="Type here..." label="About career" />
                <TextArea placeholder="Type here..." label="Add skills (You can add more than one skills)" />
            </div>
        </div>
    )
}

export default StepTwo