"use client";
import React, { useMemo, useState } from "react";
import styles from "./RolesPermissionTable.module.scss";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CustomRadioButton, InputField } from "@/shared";
import { customisedTableClasses } from "@/utils/classes";
import { permissionsData } from "@/mock/permissionsData.mock";
import RolesPermissionCardMob from "../RolesPermissionCardMob/RolesPermissionCardMob";
import { useGetAdminRoles } from "@/app/api/hooks/Admin/users";
import { RoleProps } from "@/app/api/hooks/Admin/users/types";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

type RolePermissions = Record<string, Record<string, boolean>>;


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

    const extraColumns: GridColDef[] = rolesAndPermissions.map((role, index) => ({
        ...sharedColDef,
        field: `${role.roleName.toUpperCase().replace(/\s+/g, "_")}-${index}`,
        cellClassName: styles.table_cell,
        headerClassName: styles.table_header,
        headerName: `${role.roleName}`,
        minWidth: 150,
        renderCell: ({ row }: { row: any }) => {
            return (
                <div className={styles.super_admin}>
                    <ul>
                        {row.permissions.map((permission: string, i: number) => {
                            const rolePermissions: any = role.permissions;
                            
                            const rowTitle: string = row?.title?.toLowerCase() ?? "";
                            
                            const availablePermissions = Object.keys(rolePermissions); // Get valid keys
                            
                            const isPermissionAvailable = availablePermissions.includes(rowTitle);
                            
                            const currentPermission = permission.split(" ")[0]?.toLowerCase(); // Extract first word of permission
                            
                            const isPermitted = isPermissionAvailable 
                                ? rolePermissions[rowTitle]?.[currentPermission] ?? false 
                                : false;
            
                            return (
                                <li key={i} className={styles.permission}>
                                    <CustomRadioButton 
                                        onChange={() => handleToggle(role.roleName, permission)} 
                                        checked={isPermitted} 
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </div>
            );

        },
    }));


    const columns = useMemo<GridColDef[]>(() => [
        {
            ...sharedColDef,
            field: "permissions",
            cellClassName: styles.table_cell,
            headerClassName: styles.table_header,
            headerName: "Permissions",
            minWidth: 250,
            pinnable: true,
            renderCell: ({ row }) => (
                <div className={styles.container__permissions_wrapper}>
                    <h2 className={styles.permission_title} style={{ fontWeight: 700 }}>{row.title}</h2>
                    <ul className={styles.permissions_container}>
                        {row.permissions.map((permission: string) => (
                            <li style={{ fontSize: "1.2rem", color: "#4B525A", fontWeight: 400 }} key={permission}>
                                {permission}
                            </li>
                        ))}
                    </ul>
                </div>
            ),
        },
        ...extraColumns
    ], [rolesAndPermissions]);


    const closeConfirmModal = () => {
        setShowConfirmModal(false)
    }

    const handleSetPermissions = () => {
        setShowConfirmModal(false)
    }

    const handleToggle = (roleName: string, permission: string) => {
        const role = getPermissionsByRoleName(roleName)
        setShowConfirmModal(true)
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
                    <RolesPermissionCardMob key={item.id} item={item} handleToggle={handleToggle} />
                ))}
            </ul>
            <ConfirmModal openModal={showConfirmModal} onClose={closeConfirmModal} onConfirm={handleSetPermissions} />
        </div>
    );
};

export default RolesPermissionTable;
