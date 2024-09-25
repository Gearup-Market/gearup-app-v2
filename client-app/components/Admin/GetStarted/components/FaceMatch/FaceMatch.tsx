'use cient';
import React, { useState, useEffect } from 'react'
import styles from './FaceMatch.module.scss'
import Modal from '@/shared/modals/modal/Modal'
import Image from 'next/image';
import { Button } from '@/shared';
import { CautionIcon } from '@/shared/svgs/dashboard';

const FaceMatch = () => {
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setOpenModal(true)
  }
    , [])

  return (
    <Modal title='Verify with a selfie' openModal={openModal} setOpenModal={setOpenModal} >
      <div className={styles.container}>
        <div className={styles.image_container}>
          <Image src="https://images.unsplash.com/photo-1507081323647-4d250478b919?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2Zlc3Npb25hbCUyMHBob3RvfGVufDB8fDB8fHww" alt="face-match" fill objectFit='cover' />
        </div>
        <div className={styles.btn_text_container}>
          <div className={styles.caution_container}>
            <span className={styles.icon}>
              <CautionIcon />
            </span>
            Please make sure the picture is clear because if it isn’t, it can affect your verification</div>
          <Button onClick={() => setOpenModal(false)} buttonType='primary' className={styles.button}>Capture</Button>
        </div>
      </div>
    </Modal>
  )
}

export default FaceMatch