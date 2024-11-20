'use client';
import React from 'react'
import styles from './UsersTable.module.scss'
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import Image from 'next/image';
import { MoreIcon, UserIcon } from '@/shared/svgs/dashboard';
import { customisedTableClasses } from '@/utils/classes';
import Link from 'next/link';
import RecentDealsCard from '@/components/UserDashboard/Dashboard/Components/RecentDeals/components/RecentDealsCard/RecentDealsCard';
import { Button, InputField, MobileCardContainer, Pagination } from '@/shared';
import UserCardMob from '../UserCardMob/UserCardMob';
import { useGetAllUsers } from '@/app/api/hooks/Admin/users';
const sharedColDef: GridColDef = {
    field: "",
    sortable: true,
    flex: 1,
};

interface Props {
    users?: GridRowsProp
    page: number
    limit: number
    handlePagination: (page: number) => void
    url?: string
    totalCount?: number
}

const UsersTable = ({  page, limit, handlePagination, url, totalCount }: Props) => {

    const {data, isLoading} = useGetAllUsers()
    const users = data?.data || []

    const columns: GridColDef[] = [
        {
            ...sharedColDef,
            field: 'username',
            cellClassName: styles.table_cell,
            headerClassName: styles.table_header,
            headerName: 'Username',
            minWidth: 250,
            renderCell: ({ row, value }) => (
                <div className={styles.container__name_container}>
                    <Image src={row.image} alt={value} width={16} height={16} />
                    <p className={styles.container__name} style={{ fontSize: '1.2rem' }}>
                        {value}
                    </p>
                </div>
            ),
        },
        {
            ...sharedColDef,
            field: 'email',
            cellClassName: styles.table_cell,
            headerClassName: styles.table_header,
            headerName: 'Email',
            minWidth: 200,
        },
        {
            ...sharedColDef,
            field: 'joined_date',
            cellClassName: styles.table_cell,
            headerClassName: styles.table_header,
            headerName: 'Joined Date',
            minWidth: 150,
        },
        {
            ...sharedColDef,
            field: 'account_status',
            cellClassName: styles.table_cell,
            headerClassName: styles.table_header,
            headerName: 'Account status',
            minWidth: 150,
            renderCell: ({ value }) => (
                <div className={styles.container__status_container}>
                    <p style={{ fontSize: '1.2rem' }} className={styles.container__status_container__status} data-status={value?.toLowerCase()}>
                        {value}
                    </p>
                </div>
            ),
        },
        {
            ...sharedColDef,
            field: 'id',
            cellClassName: styles.table_cell,
            headerClassName: styles.table_header,
            headerName: 'Actions',
            headerAlign: 'center',
            minWidth: 200,
            renderCell: ({ value }) => (
                <Link href={`/admin/${url}/${value}`} onClick={() => handleClickMore(value)} className={styles.container__action_btn}>
                    <Button>View Profile</Button>
                </Link>
            ),
        },
    ];

    const handleClickMore = (id: number) => {
        console.log('More clicked', id)
    };

    return (
        <div className={styles.container}>
            {
                !!users && users?.length < 1 ?
                    <div className={styles.empty_rows}>
                        <span className={styles.transaction_icon}>
                            <UserIcon color='#FFB30F' />
                        </span>
                        No data available
                    </div>
                    :
                    <>
                    <div className={styles.container__input_filter_container}>
                <InputField placeholder='Search' icon='/svgs/icon-search-dark.svg' iconTitle='search-icon' />
            </div>
                        <div className={styles.container__table}>
                            <DataGrid rows={users || []} columns={columns}
                                hideFooterPagination={true} hideFooter paginationMode="server"
                                sx={customisedTableClasses} autoHeight
                                scrollbarSize={20}
                                loading={isLoading}
                                getRowId={(row) => row._id}
                            />
                        </div>
                        <MobileCardContainer>
                            {
                                users?.map((item, ind) => (
                                    <UserCardMob key={item._id} item={item} url='users' lastEle={(ind + 1) === users.length ? true : false} ind={ind} />
                                ))
                            }
                        </MobileCardContainer>

                        <Pagination currentPage={page} onPageChange={handlePagination} totalCount={totalCount || 0} pageSize={limit} />
                    </>
            }
        </div>
    )
}

export default UsersTable