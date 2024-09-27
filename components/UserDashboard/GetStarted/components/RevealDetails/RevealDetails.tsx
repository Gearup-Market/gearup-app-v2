'use client';
import React from 'react'
import styles from './RevealDetails.module.scss'
import { ChevronIcon } from '@/shared/svgs/dashboard';

interface Props {
    question: string;
    answer: string;
}

const RevealDetails = ({ question, answer }: Props) => {
    const [isRevealed, setIsRevealed] = React.useState(false)
    return (
        <div className={styles.container}>
            <div className={styles.container__question}>
                <p className={styles.container_question__item}>{question}</p>
                <span className={isRevealed ? styles.rotate : styles.image} onClick={() => setIsRevealed((prev) => !prev)}><ChevronIcon /></span>
            </div>
            <p className={styles.container__answer} data-visible={isRevealed}>
                {answer}
            </p>
        </div>
    )
}

export default RevealDetails