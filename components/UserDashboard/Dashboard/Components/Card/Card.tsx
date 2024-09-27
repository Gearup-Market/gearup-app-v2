import React from 'react'
import styles from './Card.module.scss'
interface Props {
    children: React.ReactNode
}
const Card = ({ children }: Props) => {
    return (
        <div className={styles.card_container}>
            {children}
        </div>
    )
}

export default Card