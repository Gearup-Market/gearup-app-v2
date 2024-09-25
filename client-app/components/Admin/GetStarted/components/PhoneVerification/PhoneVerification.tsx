'use client'
import React, { useState } from 'react'
import styles from './PhoneVerification.module.scss'
import HeaderSubText from '@/components/Admin/HeaderSubText/HeaderSubText'
import { ConfirmToken, InputField } from '@/shared'
import RevealDetails from '../RevealDetails/RevealDetails'

interface Props {
  isTokenVerified?: boolean;
  setIsTokenVerified: (value: boolean) => void;
  isTokenVerification?: boolean;
  setIsTokenVerification?: (value: boolean) => void;
}

const PhoneVerification = ({ isTokenVerified, setIsTokenVerified, isTokenVerification, setIsTokenVerification }:Props) => {


  const handleComplete = () => {
    setIsTokenVerified(true)
  }

  return (
    <div className={styles.container}>
      {
        !isTokenVerification ?
          <>
            <HeaderSubText title="Verify your phone number" description='We use this to notify you of information relating to your rentals. We will not use your number for promotions. This number can be changed later on the dashboard' />

            <div className={styles.field}>
              <InputField label='Phone number' placeholder='Enter address' />
            </div>
            <RevealDetails question='Why is this needed?' answer='We use this to notify you of information relating to your rentals. We will not use your number for promotions.
      The phone number can be changed in your Dashboard later.' />
          </>
          :
          <>
            <HeaderSubText title="You’ve got an SMS!" description='Type the code you received via SMS on +2348025341009' />
            <ConfirmToken length={6} onComplete={handleComplete} />
            <p className={styles.resend_token}>Resend code(45)</p>
          </>
      }
    </div>
  )
}

export default PhoneVerification