"use client";
import React, { useState } from "react";
import styles from "./BlogsCategories.module.scss";
import { DataGrid, GridAddIcon, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import Image from "next/image";
import { Button, CustomImage, InputField, MobileCardContainer, Pagination } from "@/shared";
import { customisedTableClasses } from "@/utils/classes";
import Link from "next/link";
import { transactions } from "@/mock/transactions.mock";
import { blogsCategoriesData } from "@/mock/blogCategories.mock";
import { AddCategory, EditCategory } from "./components";
import BlogCategoryCardMob from "./BlogCategoryCardMob/BlogCategoryCardMob";
import AddButtonMob from "../AddButtonMob/AddButtonMob";
import { useGetAllCategories } from "@/app/api/hooks/blogs";

const BlogsCategories = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(7);
    const {data, isLoading, refetch, isFetching} = useGetAllCategories()
    const blogsCategories = data?.data || []
    const [showEditCategory, setShowEditCategory] = useState(false)
    const [showAddCategory, setShowAddCategory] = useState(false)
    const [paginatedTransactions, setPaginatedTransactions] = useState<GridRowsProp>(
        blogsCategoriesData.slice(0, limit)
    );
    const [category, setCategory] = useState("");

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

    const columns: GridColDef[] = [
        {
            ...sharedColDef,
            field: "name",
            cellClassName: styles.table_cell,
            headerClassName: styles.table_header,
            headerName: "Category Name",
            minWidth: 250,
            align: "left",
            headerAlign: "left",
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
            align: "center",
            headerAlign: "center",
            field: "tag",
            cellClassName: styles.table_cell,
            headerClassName: styles.table_header,
            headerName: "Tag",
            minWidth: 200,
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
            align: "right",
            headerAlign: "right",
            field: "id",
            cellClassName: styles.table_cell,
            headerClassName: styles.table_header,
            headerName: "Actions",
            minWidth: 150,
            renderCell: ({ row, value }) => (
                <div
                    className={styles.container__action_btn}
                >
                    <Image src="/svgs/edit.svg" alt="edit" width={16} height={16} onClick={() => setShowEditCategory(true)} />
                    <Image src="/svgs/red-trash.svg" alt="edit" width={16} height={16} />

                </div>
            ),
        },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.container__input_filter_container}>
                <InputField
                    placeholder="Search"
                    icon="/svgs/icon-search-dark.svg"
                    iconTitle="search-icon"
                />
                <Button
                    buttonType="primary"
                    className={`${styles.btn}`}
                    onClick={() => setShowAddCategory(true)}
                >
                    <span className={styles.icon}>
                        <GridAddIcon className={styles.icon} />{" "}
                    </span>
                    New Categories
                </Button>
            </div>

            <div
                className={styles.container__table}
                style={{ width: "100%", height: "100%" }}
            >
                <DataGrid
                    rows={blogsCategories}
                    getRowId={(row) => row._id}
                    columns={columns}
                    paginationMode="server"
                    sx={customisedTableClasses}
                    hideFooter
                    loading={isLoading || isFetching}
                    autoHeight
                />
            </div>

            <MobileCardContainer>
                {paginatedTransactions.map((item, ind) => (
                    <BlogCategoryCardMob key={item.id} item={item} setOpenModal={setShowEditCategory} ind={ind} lastEle={(ind + 1) === paginatedTransactions.length ? true : false} />
                ))}
            </MobileCardContainer>

            <AddButtonMob onClick={() => setShowAddCategory(true)} />
       {/*      <Pagination
                currentPage={page}
                onPageChange={handlePagination}
                totalCount={transactions.length}
                pageSize={limit}
            /> */}
            <EditCategory openModal={showEditCategory} setOpenModal={setShowEditCategory} />
            <AddCategory category={category} setCategory={setCategory} openModal={showAddCategory} setOpenModal={setShowAddCategory} refetch={refetch} />
        </div>
    );
};

export default BlogsCategories;
