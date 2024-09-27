'use client'
import React, { useState } from 'react'
import styles from './CourseTransactions.module.scss'
import { Completed, Live, Pending } from './components'
import { ChevronIcon, CopyIcon, LocationEllipse, VerifyIcon } from '@/shared/svgs/dashboard'
import { Button, StarRating } from '@/shared'
import { PersonalDetails, ReceiptDetails } from '../DetailsSummary/components'

interface Props {
  item?: any
}

const CourseTransactions = ({ item }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.container__left}>
        <div className={styles.container__left__summary_container}>
          <h3 className={styles.title}>Summary</h3>
          <div className={styles.summary_item}>
            <h4>Transaction type</h4>
            <p>Ebook course</p>
          </div>
          <div className={styles.summary_item}>
            <h4>Transaction date</h4>
            <p>15 Dec, 2023</p>
          </div>
          <div className={styles.summary_item}>
            <h4>Transaction ID</h4>
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <p>0000045847378283543</p>
              <span className={styles.icon}>
                <CopyIcon />
              </span>
            </span>
          </div>

          <div className={styles.bottom_section}>
            {
              item?.transaction_status === 'completed' && <div className={styles.summary_item}>
                <h4>Link to course</h4>
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingRight: '2rem' }}>
                  <span className={styles.ellipse_container}>
                    <p>https://Einsteindesign.notion.site/Alison-s-Oasis-2024-ca9ef8c373b842fe8299e4278052cd90?pvs=4</p>
                  </span>
                  <span className={styles.icon}>
                    <CopyIcon />
                  </span>
                </span>
              </div>
            }
            {
              item?.transaction_status === 'requested' &&
              <div>
                <div className={styles.summary_item}>
                  <h4>Duration</h4>
                  <p>2 months</p>
                </div>
                <div className={styles.summary_item}>
                  <h4>Starts</h4>
                  <p>16/12/2023</p>
                </div>
                <div className={styles.summary_item}>
                  <h4>Ends</h4>
                  <p>16/12/2023</p>
                </div>
                <div className={styles.summary_item}>
                  <h4>Daily hours</h4>
                  <p>2 hours</p>
                </div>
                <div className={styles.summary_item}>
                  <h4>Meeting link</h4>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <p>Googlemeet.com/fhsgsjssqw33r22</p>
                    <span className={styles.icon}>
                      <CopyIcon />
                    </span>
                  </span>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
      <div className={styles.container__right}>
        <div className={styles.container__left__summary_container}>
          <h3 className={styles.rating_title}>Your rating</h3>
          <StarRating />
        </div>
        <PersonalDetails name='Wade Warren' subText='Tutor' profileLink='/admin/settings/profile' />
        <ReceiptDetails />
      </div>
    </div>
  )
}

export default CourseTransactions