'use client';
import React from 'react'
import styles from './TotalEarnings.module.scss'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { customisedTableClasses } from '@/utils/classes';
import { EllipseIcon } from '@/shared/svgs/dashboard';
import { PieChartComponent } from '@/shared';
import TotalEarningsCard from './Components/TotalEarningsCard/TotalEarningsCard';

const TotalEarnings = () => {
    const sharedColDef: GridColDef = {
        field: "",
        sortable: true,
        flex: 1,
    };

    const data = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
    ];

    const COLORS = ['#FFB30F', '#B57F0B', '#FFE7B5',];

    const rows: GridRowsProp = [
        { id: 1, no_of_products: 1, type: 'Gear rental', revenue_percentage: 23, value: 530 },
        { id: 2, no_of_products: 2, type: 'Gear sales', revenue_percentage: 7, value: 700 },
        { id: 3, no_of_products: 3, type: 'Course sales', revenue_percentage: 10, value: 400 },
    ];

    const columns: GridColDef[] = [
        {
            ...sharedColDef,
            field: 'type', cellClassName: styles.table_cell, headerName: 'Type', headerClassName: styles.table_header, minWidth: 150, renderCell: ({ value }) => (
                <div className={styles.container__type_container}>
                    <EllipseIcon color={value === 'Gear rental' ? '#FFB30F' : value === 'Gear sales' ? '#B57F0B' : '#FFE7B5'} />
                    <p style={{ fontSize: '1.2rem' }}>{value}</p>
                </div>
            ),
        },
        { ...sharedColDef, field: 'no_of_products', cellClassName: styles.table_cell, headerName: 'No of Products', headerClassName: styles.table_header, minWidth: 200 },
        { ...sharedColDef, field: 'revenue_percentage', cellClassName: styles.table_cell, headerName: '% of Revenue', headerClassName: styles.table_header, minWidth: 150 },
        { ...sharedColDef, field: 'value', cellClassName: styles.table_cell, headerName: 'Value', headerClassName: styles.table_header, minWidth: 150 },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.container__pie_chart_container}>
                <PieChartComponent data={data} colors={COLORS} />
            </div>
            <div style={{ width: '100%' }} className={styles.container__table}>
                <DataGrid rows={rows} sx={customisedTableClasses} columns={columns} hideFooter autoHeight paginationMode="server"
                />
            </div>
            <ul className={styles.container__cards}>
                {
                    rows.map((item) => (
                        <TotalEarningsCard item={item} key={item.id} />
                    ))
                }
            </ul>
        </div>
    )
}

export default TotalEarnings