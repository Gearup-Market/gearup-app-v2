import React from 'react'
import styles from './MobileCardContainer.module.scss'

interface Props {
    children?: React.ReactNode
}

const MobileCardContainer = ({ children }: Props) => {
    return (
        <ul className={styles.cards_container}>
            {children}
        </ul>
    )
}

export default MobileCardContainer