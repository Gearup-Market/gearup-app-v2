import React from 'react'
import styles from './MessageReceived.module.scss'

interface Props{
  message?: string
}

const MessageReceived = ({message}:Props) => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>
{message}
      </p>
    </div>
  )
}

export default MessageReceived