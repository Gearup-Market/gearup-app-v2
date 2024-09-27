'use client'
import React, { useState } from 'react'
import styles from './ReviewFeedback.module.scss'
import HeaderSubText from '@/components/Admin/HeaderSubText/HeaderSubText'
import { Button, StarRating, TextArea } from '@/shared'

const ReviewFeedback = () => {
    const [rating, setRating] = useState(0);

    const handleRatingChange = (newRating: number) => {
        setRating(newRating);
    };
    return (
        <div className={styles.container}>
            <HeaderSubText title="Review and feedback" description='Please tell us about your lending experience and rate the services' />

            <StarRating onRatingChange={handleRatingChange} />

            <div>
                <TextArea placeholder="Write your feedback here..." rows={7} />
                <div className={styles.btn_container}>
                    <Button >Submit</Button>
                </div>
            </div>
        </div>
    )
}

export default ReviewFeedback