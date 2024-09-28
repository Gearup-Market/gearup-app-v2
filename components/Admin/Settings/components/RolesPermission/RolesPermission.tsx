'use client'
import React, { useState } from 'react'
import styles from './RolesPermission.module.scss'
import HeaderSubText from '@/components/Admin/HeaderSubText/HeaderSubText'
import { GridAddIcon } from '@mui/x-data-grid'
import { Button } from '@/shared'
import Image from 'next/image'
import AddRole from './AddRole/AddRole'
import RolesPermissionTable from './RolesPermissionTable/RolesPermissionTable'

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
        icon: '/svgs/admin-svg 2.svg'
    },
]

const RolesPermission = () => {
    const [openModal, setOpenModal] = useState(false)
    return (
        <div className={styles.container}>
            <div className={styles.body}>
                <div className={styles.header}>

                    <div className={styles.header_title}>
                        <HeaderSubText title="Roles & Permissions" variant='main' />
                    </div>

                    <Button
                        buttonType="primary"
                        className={`${styles.transparent_btn} ${styles.btn}`}
                        onClick={() => setOpenModal(true)}
                    >
                        <span className={styles.icon}>
                            <GridAddIcon className={styles.icon} />{" "}
                        </span>
                        New role
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
                <RolesPermissionTable />
            </div>
            <AddRole openModal={openModal} setOpenModal={setOpenModal} />
        </div>
    )
}

export default RolesPermission