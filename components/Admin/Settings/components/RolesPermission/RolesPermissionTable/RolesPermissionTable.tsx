"use client";
import React, { useState } from "react";
import styles from "./RolesPermissionTable.module.scss";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import Image from "next/image";
import { CustomRadioButton, InputField, Pagination, ToggleSwitch } from "@/shared";
import { customisedTableClasses } from "@/utils/classes";
import Link from "next/link";
import { membersData } from "@/mock/members.mock";
import { ListingCard } from "@/components/Admin/Listings/components";
import { permissionsData } from "@/mock/permissionsData.mock";
import RadioBox from "@/shared/Radio/Radio";
import { Radio } from "@mui/material";
import RolesPermissionCardMob from "../RolesPermissionCardMob/RolesPermissionCardMob";
import { useGetAdminRoles } from "@/app/api/hooks/Admin/users";
import { RoleProps } from "@/app/api/hooks/Admin/users/types";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { set } from "lodash";

const RolesPermissionTable = () => {
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const { data, isLoading } = useGetAdminRoles()
    const rolesAndPermissions = data || []

    const [paginatedData, setPaginatedData] = useState(permissionsData);
    const sharedColDef: GridColDef = {
        field: "",
        sortable: true,
        flex: 1,
    };

    const getPermissionsByRoleName = (roleName: string) => {
        return rolesAndPermissions.find((role: RoleProps) => role.roleName.toLowerCase() === roleName.toLowerCase())
    }

    const columns: GridColDef[] = [
        {
            ...sharedColDef,

            field: "permissions",
            cellClassName: styles.table_cell,
            headerClassName: styles.table_header,
            headerName: "Permissions",
            minWidth: 250,

            renderCell: ({ row, value }) => (
                <div className={styles.container__permissions_wrapper} >
                    <h2 className={styles.permission_title} style={{ fontWeight: 700 }}>{row.title}</h2>
                    <ul className={styles.permissions_container}>
                        {row.permissions.map((permission: string) => (
                            <li style={{ fontSize: "1.2rem", color: "#4B525A", fontWeight: 400 }} key={permission}>{permission}</li>
                        ))}
                    </ul>
                </div>
            ),
        },
        {
            ...sharedColDef,

            field: 'super_admin',
            cellClassName: styles.table_cell,
            headerClassName: styles.table_header,
            headerName: 'Super Admin',
            minWidth: 150,
            renderCell: ({ row, value }) => {
                const superAdminPermissions = getPermissionsByRoleName("super admin")
                return (
                    <div className={styles.super_admin}>
                        <ul>
                            {
                                row.permissions.map((item: string, index: number) => {
                                    return (
                                        <li key={index} className={styles.permission}>
                                            <CustomRadioButton
                                                onChange={() => handleToggle(row.title, item)}
                                            />
                                        </li>
                                    )
                                })}
                        </ul>
                    </div>
                )
            }
        },
        {
            ...sharedColDef,

            field: 'admin',
            cellClassName: styles.table_cell,
            headerClassName: styles.table_header,
            headerName: 'Admin',
            minWidth: 150,
            renderCell: ({ row, value }) => {
                const adminPermissions = getPermissionsByRoleName("admin")
                return (
                    <div className={styles.super_admin}>
                        <ul>
                            {
                                row.permissions.map((item: string, index: number) => {
                                    return (
                                        <li key={index} className={styles.permission}>
                                            <CustomRadioButton
                                                onChange={() => handleToggle(row.title, item)}
                                            />
                                        </li>
                                    )
                                })}
                        </ul>
                    </div>
                )
            },
        },
        {
            ...sharedColDef,
            field: 'design',
            cellClassName: styles.table_cell,
            headerClassName: styles.table_header,
            headerName: 'design',
            maxWidth: 150,
            renderCell: ({ row, value }) => (
                <div className={styles.super_admin}>
                    <ul>
                        {
                            row.permissions.map((item: string, index: number) => {
                                return (
                                    <li key={index} className={styles.permission}>
                                        <CustomRadioButton
                                            onChange={() => handleToggle(row.title, item)}
                                        />
                                    </li>
                                )
                            })}
                    </ul>
                </div>
            ),
        },
    ];

    const closeConfirmModal = () => {
        setShowConfirmModal(false)
    }

    const handleSetPermissions = () => {
        setShowConfirmModal(false)
    }

    const handleToggle = (roleName: string, permission: string) => {
        const role = getPermissionsByRoleName(roleName)
        setShowConfirmModal(true)
        /*    const updatedPermissions = role.permissions.map((item: string) => {
               if(item === permission) {
                   return {
                       ...item,
                       selected: !item.selected
                   }
               }
               return item
           })
           role?.permissions = updatedPermissions */
    }

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
                    rows={permissionsData}
                    columns={columns}
                    hideFooterPagination={true}
                    paginationMode="server"
                    hideFooter
                    loading={isLoading}
                    autoHeight
                    getRowHeight={() => 120}
                    sx={customisedTableClasses}
                />
            </div>

            <ul className={styles.container__cards_container}>
                {paginatedData.map(item => (
                    <RolesPermissionCardMob key={item.id} item={item} handleToggle={handleToggle}/>
                ))}
            </ul>
            <ConfirmModal openModal={showConfirmModal} onClose={closeConfirmModal} onConfirm={handleSetPermissions} />
        </div>
    );
};

export default RolesPermissionTable;
