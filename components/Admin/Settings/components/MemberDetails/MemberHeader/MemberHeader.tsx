'use client'
import React, { useState } from 'react'
import styles from './MemberHeader.module.scss'
import { Button } from '@/shared'
import Image from 'next/image'
import EditMember from '../EditMember/EditMember'

const MemberHeader = () => {
    const [openModal, setOpenModal] = useState(false)
    return (
        <div className={styles.container}>
            <div className={styles.container__left}>
                <div className={styles.container__left__image}>
                    {/* <Image src="https://plus.unsplash.com/premium_photo-1664533227571-cb18551cac82?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFufGVufDB8fDB8fHww" alt="member" height={70} width={70} className={styles.member_img} /> */}
                    <Image src="/svgs/user-avatar.svg" alt="member" height={40} width={40} className={styles.member_icon} />
                    <span data-status={'online'} className={styles.online_indicator}></span>
                </div>
                <div className={styles.container__left__details}>
                    <p className={styles.container__left__details__name}>John Doe</p>
                    <p className={styles.container__left__details__role}> Product designer</p>
                    <p className={styles.container__left__details__email}>johndoe@email.com</p>
                    <p className={styles.container__left__details__phone}>08175301468</p>
                </div>
            </div>

            <div className={styles.container__right}>
                <Button className={styles.deactivate_btn}>Deactivate user</Button>
                <Button className={styles.edit_btn} onClick={() => setOpenModal(true)}>Edit user</Button>
            </div>
            <EditMember openModal={openModal} setOpenModal={setOpenModal} />
        </div>
    )
}

export default MemberHeader