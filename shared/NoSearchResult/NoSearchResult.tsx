import React from 'react'
import styles from './NoSearchResult.module.scss'
import Image from 'next/image'

const NoSearchResult = () => {
  return (
    <div className={styles.container}>
        <Image src="/svgs/empty-state-icon.svg" height={100} alt="empty-state-icon" width={100}/>
        <h2>No Search Result Found</h2>
        <p>Your current search result is not available</p>
    </div>
  )
}

export default NoSearchResult