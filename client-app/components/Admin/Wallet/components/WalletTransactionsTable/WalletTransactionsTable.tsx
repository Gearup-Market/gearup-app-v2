'use client';
import React, { useState } from 'react'
import styles from './WalletTransactionsTable.module.scss'
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import Image from 'next/image';
import { Button, InputField, MobileCardContainer, Pagination } from '@/shared';
import { customisedTableClasses } from '@/utils/classes';
import Link from 'next/link';
import { MoreIcon, TransactionNavIcon } from '@/shared/svgs/dashboard';
import WalletTransactionCardMob from './WalletTransactionCardMob/WalletTransactionCardMob';

const WalletTransactionsTable = () => {
    const [page, setPage] = useState(1)

    const sharedColDef: GridColDef = {
        field: "",
        sortable: true,
        flex: 1,
    };

    const rows: GridRowsProp = [
        {

            id: 1, name: 'Canon EOS R5 Camera Kit', amount: '$200', transaction_date: '15 Dec, 2023', status: 'Declined', actions: 'View', image: ""
        },
        {

            id: 2, name: 'Canon EOS R5 Camera Kit', amount: '$200', transaction_date: '15 Dec, 2023', status: 'Awaiting approval', actions: 'View', image: ""
        },
        {

            id: 3, name: 'Canon EOS R5 Camera Kit', amount: '$200', transaction_date: '15 Dec, 2023', status: 'Completed', actions: 'View', image: ""
        },
        {

            id: 4, name: 'Canon EOS R5 Camera Kit', amount: '$200', transaction_date: '15 Dec, 2023', status: 'Ongoing', actions: 'View', image: ""
        },
        {

            id: 5, name: 'Canon EOS R5 Camera Kit', amount: '$200', transaction_date: '15 Dec, 2023', status: 'Declined', actions: 'View', image: ""
        },
        {

            id: 6, name: 'Canon EOS R5 Camera Kit', amount: '$200', transaction_date: '15 Dec, 2023', status: 'Completed', actions: 'View', image: ""
        },

    ];


    const columns: GridColDef[] = [
        {
            ...sharedColDef,
            field: 'name',
            cellClassName: styles.table_cell,
            headerClassName: styles.table_header,
            headerName: 'Name',
            minWidth: 250,
            renderCell: ({ value }) => (
                <div className={styles.container__name_container}>
                    <Image src="/images/admin-img.jpg" alt={value} width={16} height={16} />
                    <p className={styles.container__name} style={{ fontSize: '1.2rem' }}>
                        {value}
                    </p>
                </div>
            ),
        },
        {
            ...sharedColDef,
            field: 'transaction_date',
            cellClassName: styles.table_cell,
            headerClassName: styles.table_header,
            headerName: 'Transaction Date',
            minWidth: 150,
        },
        {
            ...sharedColDef,
            field: 'amount',
            cellClassName: styles.table_cell,
            headerClassName: styles.table_header,
            headerName: 'Amount',
            minWidth: 200,
        },
        {
            ...sharedColDef,
            field: 'status',
            cellClassName: styles.table_cell,
            headerClassName: styles.table_header,
            headerName: 'Status',
            minWidth: 150,
            renderCell: ({ value }) => (
                <div className={styles.container__status_container}>
                    <p style={{ fontSize: '1.2rem' }} className={styles.container__status_container__status} data-status={value.toLowerCase()}>
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
            minWidth: 150,
            headerAlign: 'center',
            align: 'center',
            renderCell: ({ value }) => (
                <span onClick={() => handleClickMore(value)} className={styles.action_btns}>
                    <Image src="/svgs/document-download.svg" alt='download' height={10} width={10} /> Download receipt
                </span>
            ),
        },
    ];

    const handleClickMore = (id: number) => {
        console.log('More clicked', id)
    };

    return (
        <div className={styles.container}>
            {
                rows.length < 1 ?

                    <div className={styles.empty_rows}>
                        <span className={styles.transaction_icon}>
                            <TransactionNavIcon color='#FFB30F' />
                        </span>
                        No data available
                    </div>
                    :
                    <>
                        <div className={styles.container__input_filter_container}>
                            <InputField placeholder='Search' icon='/svgs/icon-search-dark.svg' iconTitle='search-icon' />
                        </div>

                        <div className={styles.container__table} style={{ width: '100%', height: "100%", }}>
                            <DataGrid rows={rows} columns={columns}
                                paginationMode="server" sx={customisedTableClasses} hideFooter autoHeight />
                        </div>

                        <MobileCardContainer>
                            {
                                rows.map((item, ind) => (
                                    <WalletTransactionCardMob key={item.id} item={item} lastEle={(ind + 1) === rows.length ? true : false} ind={ind} />
                                ))
                            }
                        </MobileCardContainer>

                        <Pagination currentPage={1} onPageChange={setPage} totalCount={rows.length} pageSize={5} />
                    </>
            }
        </div>
    )
}

export default WalletTransactionsTable