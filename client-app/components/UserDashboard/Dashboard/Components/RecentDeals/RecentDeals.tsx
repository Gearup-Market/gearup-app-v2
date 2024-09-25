'use client';
import React, { useState } from 'react'
import styles from './RecentDeals.module.scss'
import { DataGrid, GridAddIcon, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import Image from 'next/image';
import { AddBtn, Button, InputField, MobileCardContainer, Pagination } from '@/shared';
import RecentDealsCard from './components/RecentDealsCard/RecentDealsCard';
import { MoreIcon, TransactionNavIcon } from '@/shared/svgs/dashboard';
import { customisedTableClasses } from '@/utils/classes';
import Link from 'next/link';
import { recentDeals } from '@/mock/RecentDealsData.mock';
const sharedColDef: GridColDef = {
    field: "",
    sortable: true,
    flex: 1,
};
const RecentDeals = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [paginatedTransactions, setPaginatedTransactions] = useState<GridRowsProp>(
        recentDeals.slice(0, limit)
    );


    const handlePagination = (page: number) => {
        const start = (page - 1) * limit;
        const end = start + limit;
        setPaginatedTransactions(recentDeals.slice(start, end));
        setPage(page);
    };


    const columns: GridColDef[] = [
        {
            ...sharedColDef,
            field: 'title',
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
            field: 'price',
            cellClassName: styles.table_cell,
            headerClassName: styles.table_header,
            headerName: 'Amount',
            minWidth: 200,
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
            field: 'type',
            cellClassName: styles.table_cell,
            headerClassName: styles.table_header,
            headerName: 'Type',
            minWidth: 150,
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
            headerAlign: 'center',
            align: 'center',
            minWidth: 150,
            renderCell: ({ value }) => (
                <Link href={`/user/transactions/${value}`} className={styles.container__action_btn} >
                    <Button>View details</Button>
                </Link>
            ),
        },
    ];

    const handleClickMore = (id: number) => {
        console.log('More clicked', id)
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.container__title}> RecentDeals</h2>
            <div className={styles.container__input_filter_container}>
                <InputField placeholder='Search' icon='/svgs/icon-search-dark.svg' iconTitle='search-icon' />
                <div className={styles.filter_icon_container}>
                    <Image src="/svgs/icon-filter.svg" alt="filter" width={16} height={16} />
                    <p>Filter</p>
                </div>
            </div>

            {
                paginatedTransactions.length < 1 ?
                    <div className={styles.empty_rows}>
                        <span className={styles.transaction_icon}>
                            <TransactionNavIcon color='#FFB30F' />
                        </span>
                        No data available

                        <AddBtn />
                    </div>
                    :
                    <>
                        <div className={styles.container__table} style={{ width: '100%' }}>
                            <DataGrid rows={paginatedTransactions} columns={columns}
                                hideFooterPagination={true} hideFooter paginationMode="server"
                                sx={customisedTableClasses} autoHeight
                            />
                        </div>

                        <MobileCardContainer>
                            {
                                paginatedTransactions.map((item, ind) => (
                                    <RecentDealsCard key={item.id} item={item} ind={ind} lastEle={(ind + 1) === paginatedTransactions.length ? true : false} />
                                ))
                            }
                        </MobileCardContainer>

                        <Pagination
                            currentPage={page}
                            onPageChange={handlePagination}
                            totalCount={recentDeals.length}
                            pageSize={limit}
                        />
                    </>
            }
        </div>
    )
}

export default RecentDeals