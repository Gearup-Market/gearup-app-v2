'use client';
import React, { useState } from 'react'
import styles from './Users.module.scss'
import Image from 'next/image'
import { UsersTable } from './components'
import { usersData } from '@/mock/users.mock'
import HeaderSubText from '../HeaderSubText/HeaderSubText'
import { InputField } from '@/shared'
import { GridRowsProp } from '@mui/x-data-grid';
import { useGetAllUsers, useGetUsersTotal } from '@/app/api/hooks/Admin/users';


const Users = () => {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(7)
    const {data: usersCount} = useGetUsersTotal()
    console.log(usersCount,"count")

    const [paginatedData, setPaginatedData] = useState<GridRowsProp>(usersData.slice(0, limit));

    const handlePagination = (page: number) => {
        const start = (page - 1) * limit;
        const end = start + limit;
        setPaginatedData(usersData.slice(start, end));
        setPage(page)
    }
    return (
        <div className={styles.container}>
            <div className={styles.container__item}>
                <div className={styles.container__item__left}>
                    <Image src='/svgs/user-icon-colored.svg' alt='icon' width={40} height={40} />
                    <div>
                        <p className={styles.title}>Total Users</p>
                        <p className={styles.amount}>{usersCount?.total || 0}</p>
                    </div>
                </div>
            </div>
            <HeaderSubText title='All Users' />
            
            <UsersTable  page={page} limit={limit} handlePagination={handlePagination} url='users' totalCount={usersData.length} />
        </div>
    )
}

export default Users