"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./BlogsArticles.module.scss";
import { DataGrid, GridAddIcon, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import Image from "next/image";
import { Button, InputField, MobileCardContainer, Pagination, ToggleSwitch } from "@/shared";
import { customisedTableClasses } from "@/utils/classes";
import Link from "next/link";
import { transactions } from "@/mock/transactions.mock";
import RecentDealsCard from "@/components/UserDashboard/Dashboard/Components/RecentDeals/components/RecentDealsCard/RecentDealsCard";
import { blogsData } from "@/mock/blogs.mock";
import { MoreIcon } from "@/shared/svgs/dashboard";
import MoreModal from "./MoreModal/MoreModal";
import { Fade, Popover, Popper } from "@mui/material";
import BlogArticleCardMob from "./BlogArticleCardMob/BlogArticleCardMob";
import AddButtonMob from "../AddButtonMob/AddButtonMob";
import { useRouter } from "next/navigation";

const BlogsTable = () => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const [openPoppover, setOpenPopover] = useState(Boolean(anchorEl));
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(7);
    const router = useRouter();
    const [selectedRow, setSelectedRow] = useState<any | undefined>();
    const [paginatedTransactions, setPaginatedTransactions] = useState<GridRowsProp>(
        blogsData.slice(0, limit)
    );

    const sharedColDef: GridColDef = {
        field: "",
        sortable: true,
        flex: 1,
    };

    const handlePagination = (page: number) => {
        const start = (page - 1) * limit;
        const end = start + limit;
        setPaginatedTransactions(transactions.slice(start, end));
        setPage(page);
    };
    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };


    const columns: GridColDef[] = [
        {
            ...sharedColDef,
            field: "title",
            cellClassName: styles.table_cell,
            headerClassName: styles.table_header,
            headerName: "Title",
            minWidth: 250,
            renderCell: ({ row, value }) => (
                <div className={styles.container__name_container}>
                    <Image src={"https://images.unsplash.com/photo-1623039405147-547794f92e9e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXJ0aWNsZXN8ZW58MHx8MHx8fDA%3D"} alt={value} width={40} height={40} className={styles.blogs_img} />
                    <p className={styles.container__name} style={{ fontSize: "1.2rem" }}>
                        {value}
                    </p>
                </div>
            ),
        },
        {
            ...sharedColDef,
            field: "published_date",
            cellClassName: styles.table_cell,
            headerClassName: styles.table_header,
            headerName: "Published Date",
            minWidth: 200,
            headerAlign: "center",
            align: "center",
        },
        {
            ...sharedColDef,
            field: "category",
            cellClassName: styles.table_cell,
            headerClassName: styles.table_header,
            headerName: "Category",
            minWidth: 150,
            headerAlign: "center",
            renderCell: ({ row, value }) => (
                <div className={styles.tag_container} >
                    <p >
                        {value}
                    </p>
                </div>
            ),
        },
        {
            ...sharedColDef,
            field: "status",
            cellClassName: styles.table_cell,
            headerClassName: styles.table_header,
            headerName: "Status",
            minWidth: 150,
            headerAlign: "center",
            align: "center",
            renderCell: ({ value }) => (
                <div className={styles.container__status_container}>
                    <ToggleSwitch checked={value === "published"} />
                    <p>{value}</p>
                </div>
            ),
        },
        {
            ...sharedColDef,
            field: "id",
            align: "center",
            headerAlign: "center",
            cellClassName: styles.table_cell,
            headerClassName: styles.table_header,
            headerName: "Actions",
            minWidth: 150,
            renderCell: ({ row, value }) => (
                <span
                    className={`${styles.container__action_btn} options_icon`}
                >
                    <Popper id={'simple-popover'} open={openPoppover} anchorEl={anchorEl} transition>
                        {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={200}>
                                <div className={`${styles.more_modal} popover-content`}><MoreModal row={selectedRow} /></div>
                            </Fade>
                        )}
                    </Popper>


                    < MoreIcon onClick={(e) => {
                        setOpenPopover(true);
                        setSelectedRow(row);
                        handlePopoverOpen(e);
                    }
                    } />

                </span>
            ),
        },
    ];



    useEffect(() => {
        // Function to handle click events
        const handleClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement;

            // Check if the click happened outside the specified elements
            if (
                !target.closest('.options_icon') &&
                !target.closest('.popover-content')
            ) {
                setAnchorEl(null);
                setOpenPopover(false);
            }
        };

        // Add event listener to the document
        document.addEventListener('click', handleClick);

        // Clean up the event listener
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);




    return (
        <div className={styles.container}>
            <div className={styles.container__input_filter_container}>
                <InputField
                    placeholder="Search"
                    icon="/svgs/icon-search-dark.svg"
                    iconTitle="search-icon"
                />
                <Link href="/admin/blog/new-blog">
                    <Button
                        buttonType="primary"
                        className={`${styles.transparent_btn} ${styles.btn}`}

                    >
                        <span className={styles.icon}>
                            <GridAddIcon className={styles.icon} />{" "}
                        </span>
                        New post
                    </Button>
                </Link>
            </div>

            <div
                className={styles.container__table}
                style={{ width: "100%", height: "100%" }}
            >
                <DataGrid
                    rows={paginatedTransactions}
                    columns={columns}
                    paginationMode="server"
                    sx={customisedTableClasses}
                    hideFooter
                    autoHeight
                />
            </div>
            <MobileCardContainer>
                {paginatedTransactions.map((item, ind) => (
                    <BlogArticleCardMob key={item.id} item={item} ind={ind} lastEle={(ind + 1) === paginatedTransactions.length ? true : false} />
                ))}
            </MobileCardContainer>

            <AddButtonMob onClick={() => router.push('/admin/blog/new-blog')} />
            <Pagination
                currentPage={page}
                onPageChange={handlePagination}
                totalCount={transactions.length}
                pageSize={limit}
            />
        </div>
    );
};

export default BlogsTable;
