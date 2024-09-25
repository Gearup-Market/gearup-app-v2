'use client'
import React, { useState } from 'react'
import styles from './Members.module.scss'
import HeaderSubText from '@/components/Admin/HeaderSubText/HeaderSubText'
import { GridAddIcon } from '@mui/x-data-grid'
import { Button } from '@/shared'
import MembersTable from './MembersTable/MembersTable'
import Image from 'next/image'
import { UserIcon } from '@/shared/svgs/dashboard'
import AddMember from './AddMember/AddMember'

const lists = [
    {
        id: 1,
        title: 'Customer Support',
        icon: '/svgs/customer-support.svg'
    },
    {
        id: 2,
        title: 'Super Admin',
        icon: '/svgs/super-admin.svg'
    },
    {
        id: 3,
        title: 'Admin',
        icon: '/svgs/admin-svg.svg'
    },
]

const Members = () => {
    const [openModal, setOpenModal] = useState(false)
    const noMembers = true;
    return (
        <div className={styles.container}>
            <div className={styles.body}>
                <div className={styles.header}>

                    <div className={styles.header_title}>
                        <HeaderSubText title="Members" variant='main' />
                    </div>

                    <Button
                        buttonType="primary"
                        className={`${styles.transparent_btn} ${styles.btn}`}
                        onClick={() => setOpenModal(true)}
                    >
                        <span className={styles.icon}>
                            <GridAddIcon className={styles.icon} />{" "}
                        </span>
                        New member
                    </Button>

                </div>
                <ul className={styles.members_list}>
                    {
                        lists.map((item, index) => (
                            <li key={index} className={styles.member}>

                                <Image width={50} height={50} src={item.icon} alt={item.title} className={styles.avatar} />
                                <div>
                                    <span className={styles.title}>{item.title}</span>
                                    <p className={styles.amount}>10</p>
                                </div>

                            </li>
                        ))
                    }
                </ul>
                {
                    !noMembers ?
                        <div className={styles.no_members}>
                            <span className={styles.icon}>  <UserIcon color='#FFB30F' /></span>
                            <div>
                                <h3>No members found</h3>
                                <p>Add new members to ease your workflow</p>
                            </div>
                            <Button
                                buttonType="primary"
                                className={`${styles.transparent_btn} ${styles.btn}`}
                                onClick={() => setOpenModal(true)}
                            >
                                <span className={styles.add_icon}>
                                    <GridAddIcon className={styles.add_icon} />{" "}
                                </span>
                                New member
                            </Button>


                        </div>
                        : <MembersTable />
                }
            </div>
            <AddMember openModal={openModal} setOpenModal={setOpenModal} />
        </div>
    )
}

export default Members