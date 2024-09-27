"use client";
import React, { useState } from "react";
import styles from "./RecentActivities.module.scss";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import Image from "next/image";
import { InputField, Pagination, ToggleSwitch } from "@/shared";
import { customisedTableClasses } from "@/utils/classes";
import Link from "next/link";
import { membersData } from "@/mock/members.mock";
import { ListingCard } from "@/components/Admin/Listings/components";
import { useRouter } from "next/navigation";
import HeaderSubText from "@/components/Admin/HeaderSubText/HeaderSubText";
import { activitiesData } from "@/mock/activities.mock";

const RecentActivitiesTable = () => {
    const [activeLayout, setActiveLayout] = useState("list");
    const [activeRow, setActiveRow] = useState<number | null>(null);
    const [showMoreModal, setShowMoreModal] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(7);
    const router = useRouter();
    const [paginatedData, setPaginatedData] = useState(activitiesData.slice(0, limit));
    const sharedColDef: GridColDef = {
        field: "",
        sortable: true,
        flex: 1,
    };

    const columns: GridColDef[] = [
        {
            ...sharedColDef,
            field: "activity",
            cellClassName: styles.table_cell,
            headerClassName: styles.table_header,
            headerName: "Activity",
            minWidth: 250,
            renderCell: ({ row, value }) => (
                <div className={styles.container__name_container}>
                    <p className={styles.container__name} style={{ fontSize: "1.2rem" }}>
                        {value}
                    </p>
                </div>
            ),
        },
        {
            ...sharedColDef,
            field: 'date',
            cellClassName: styles.table_cell,
            headerClassName: styles.table_header,
            headerName: 'Date',
            minWidth: 150,
        },
        {
            ...sharedColDef,
            field: 'time',
            cellClassName: styles.table_cell,
            headerClassName: styles.table_header,
            headerName: 'time',
            minWidth: 150,
            renderCell: ({ value }) => (
                <div className={styles.role_container}>
                    <p style={{ fontSize: '1.2rem' }}>
                        {value}
                    </p>
                </div>
            ),
        },
        {
            ...sharedColDef,
            field: 'actions',
            cellClassName: styles.table_cell,
            headerClassName: styles.table_header,
            headerName: 'Actions',
            maxWidth: 150,
            renderCell: ({ row, value }) => (
                <div className={styles.actions_container}>
                    <p style={{ fontSize: '1.2rem' }} className={styles.action}>
                        <Image src='/svgs/trash.svg' height={10} width={10} alt='arrow' className={styles.icon} />
                    </p>
                </div>
            ),
        },
    ];

    const handlePagination = (page: number) => {
        const start = (page - 1) * limit;
        const end = page * limit;
        setPaginatedData(activitiesData.slice(start, end));
    }

    return (
        <div className={styles.container}>
            <HeaderSubText title="Recent Activities" variant='normal' />
            <div className={styles.container__input_filter_container}>
                <InputField
                    placeholder="Search"
                    icon="/svgs/icon-search-dark.svg"
                    iconTitle="search-icon"
                />
            </div>

            <div
                className={styles.container__table}
                style={{ width: "100%", height: "100%" }}
            >
                <DataGrid
                    rows={paginatedData}
                    columns={columns}
                    hideFooterPagination={true}
                    paginationMode="server"
                    hideFooter
                    autoHeight
                    sx={customisedTableClasses}
                />
                <Pagination
                    currentPage={1}
                    onPageChange={handlePagination}
                    totalCount={paginatedData.length}
                    pageSize={5}
                />
            </div>

            <ul className={styles.container__cards_container}>
                {membersData.map(item => (
                    <ListingCard key={item.id} props={item} />
                ))}
            </ul>
        </div>
    );
};

export default RecentActivitiesTable;
