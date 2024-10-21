"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./BlogsArticles.module.scss";
import { DataGrid, GridAddIcon, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import Image from "next/image";
import { Button, CustomImage, InputField, MobileCardContainer, Pagination, ToggleSwitch } from "@/shared";
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
import { useGetAllArticles, usePostUpdateBlogStatus } from "@/app/api/hooks/blogs";
import { formatDate } from "@/utils";
import toast from "react-hot-toast";

const BlogsTable = () => {
    const { data, isLoading, refetch } = useGetAllArticles()
    const { mutateAsync: postUpdateBlogStatus } = usePostUpdateBlogStatus()
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

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleOnStatusToggle = async (row: any) => {
        const status = row.status === "available" ? "unavailable" : "available";
        await postUpdateBlogStatus({ blogId: row._id, status }, {
            onSuccess: () => {
                toast.success("Status updated successfully")
                refetch()
            },
            onError: (err) => {
                toast.error("Error updating status")
            }
        });
    }


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
                    <div className={styles.blogs_img}>
                    <CustomImage src={row.bannerImage ?? ""} alt={value} width={40} height={40} className={styles.blogs_img} />
                    </div>
                    <p className={styles.container__name} style={{ fontSize: "1.2rem" }}>
                        {value}
                    </p>
                </div>
            ),
        },
        {
            ...sharedColDef,
            field: "publishedDate",
            cellClassName: styles.table_cell,
            headerClassName: styles.table_header,
            headerName: "Published Date",
            minWidth: 200,
            headerAlign: "center",
            align: "center",
            renderCell: ({ value }) => (
                <p className={styles.table_cell}>{formatDate(value)}</p>
            ),
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
            renderCell: ({ value,row }) => (
                <div className={styles.container__status_container}>
                    <ToggleSwitch checked={value === "available"} onChange={()=>handleOnStatusToggle(row)} />
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
                                <div className={`${styles.more_modal} popover-content`}><MoreModal row={selectedRow} refetch={refetch} onClose={handleModalClose} /></div>
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

    const handleModalClose=()=>{
        setOpenPopover(false)
        setAnchorEl(null)
        setSelectedRow(undefined)
    }



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
                    rows={data?.data || []}
                    getRowId={(row) => row._id}
                    columns={columns}
                    paginationMode="server"
                    sx={customisedTableClasses}
                    hideFooter
                    autoHeight
                    loading={isLoading}
                />
            </div>
            <MobileCardContainer>
                {paginatedTransactions.map((item, ind) => (
                    <BlogArticleCardMob key={item.id} item={item} ind={ind} lastEle={(ind + 1) === paginatedTransactions.length ? true : false} />
                ))}
            </MobileCardContainer>

            <AddButtonMob onClick={() => router.push('/admin/blog/new-blog')} />
            {/* <Pagination
                currentPage={page}
                onPageChange={handlePagination}
                totalCount={transactions.length}
                pageSize={limit}
            /> */}
        </div>
    );
};

export default BlogsTable;
