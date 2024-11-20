"use client";
import React, { useEffect, useState } from "react";
import styles from "./MembersTable.module.scss";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import Image from "next/image";
import { InputField, MobileCardContainer, Pagination, ToggleSwitch } from "@/shared";
import { customisedTableClasses } from "@/utils/classes";
import Link from "next/link";
import { membersData } from "@/mock/members.mock";
import { ListingCard } from "@/components/Admin/Listings/components";
import { useRouter } from "next/navigation";
import MembersCardMob from "../MembersCardMob/MembersCardMob";
import { Fade, Popper } from "@mui/material";
import { MoreIcon } from "@/shared/svgs/dashboard";
import { ActionsPopover, RolesPopover } from "./Popovers";

const MembersTable = () => {
    const [activeLayout, setActiveLayout] = useState("list");
    const [activeRow, setActiveRow] = useState<number | null>(null);
    const [showMoreModal, setShowMoreModal] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(7);
    const router = useRouter();
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const [anchorElAction, setAnchorElAction] = React.useState<HTMLElement | null>(null);
    const [selectedRow, setSelectedRow] = useState<any | undefined>();
    const [selectedRowAction, setSelectedRowAction] = useState<any | undefined>();
    const [openPoppover, setOpenPopover] = useState(Boolean(anchorEl));
    const [openPoppoverAction, setOpenPopoverAction] = useState(Boolean(anchorElAction));
    const [paginatedData, setPaginatedData] = useState(membersData.slice(0, limit));
    const sharedColDef: GridColDef = {
        field: "",
        sortable: true,
        flex: 1,
    };

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handlePopoverOpenAction = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElAction(event.currentTarget);
    };

    const columns: GridColDef[] = [
        {
            ...sharedColDef,

            field: "name",
            cellClassName: styles.table_cell,
            headerClassName: styles.table_header,
            headerName: "Name",
            minWidth: 250,
            renderCell: ({ row, value }) => (
                <div className={styles.container__name_container}>
                    <Image src={'https://images.unsplash.com/photo-1541752171745-4176eee47556?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1hbnxlbnwwfHwwfHx8MA%3D%3D'} alt={value || "image-icon"} width={16} height={16} />
                    <p className={styles.container__name} style={{ fontSize: "1.2rem" }}>
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
            minWidth: 150,
        },
        {
            ...sharedColDef,

            field: 'role',
            cellClassName: styles.table_cell,
            headerClassName: styles.table_header,
            headerName: 'Role',
            minWidth: 150,
            renderCell: ({ row, value }) => (
                <div className={`${styles.role_container}  options_icon`}>
                    <p style={{ fontSize: '1.2rem' }} className={styles.role} onClick={(e) => {
                        setOpenPopover(true);
                        setSelectedRow(row);
                        handlePopoverOpen(e);
                    }}>
                        {value}  <Image src='/svgs/filled-chevron.svg' height={10} width={10} alt='arrow' className={styles.icon} />
                    </p>
                    <Popper id={'simple-popover'} open={openPoppover} anchorEl={anchorEl} transition>
                        {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={200}>
                                <div className={`${styles.more_modal} popover-content`}>
                                    <RolesPopover row={selectedRow} />
                                </div>
                            </Fade>
                        )}
                    </Popper>

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
                <div className={`${styles.actions_container} options_icon`}>
                    <p style={{ fontSize: '1.2rem' }} className={`${styles.action}`}>
                        <Popper id={'simple-popover'} open={openPoppoverAction} anchorEl={anchorElAction} transition>
                            {({ TransitionProps }) => (
                                <Fade {...TransitionProps} timeout={200}>
                                    <div className={`${styles.more_modal} popover-content`}>
                                        <ActionsPopover row={selectedRow} />
                                    </div>
                                </Fade>
                            )}
                        </Popper>
                        < MoreIcon onClick={(e) => {
                            setOpenPopoverAction(true);
                            setSelectedRowAction(row);
                            handlePopoverOpenAction(e);
                        }
                        } />

                    </p>
                </div>
            ),
        },
    ];

    const handlePagination = (page: number) => {
        const start = (page - 1) * limit;
        const end = page * limit;
        setPaginatedData(membersData.slice(start, end));
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
                setAnchorElAction(null);
                setOpenPopoverAction(false);
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
            </div>

            <MobileCardContainer>
                {paginatedData.map((item, ind) => (
                    <MembersCardMob key={item.id} item={item} ind={ind} lastEle={(ind + 1) === paginatedData.length ? true : false} />
                ))}
            </MobileCardContainer>
            <Pagination
                currentPage={1}
                onPageChange={handlePagination}
                totalCount={paginatedData.length}
                pageSize={5}
            />
        </div>
    );
};

export default MembersTable;
