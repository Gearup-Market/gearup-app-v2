import React from 'react'
import styles from './MessageSent.module.scss'

interface Props {
  message?: string
}

const MessageSent = ({ message }: Props) => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>
        {message}
      </p>
    </div>
  )
}

export default MessageSent