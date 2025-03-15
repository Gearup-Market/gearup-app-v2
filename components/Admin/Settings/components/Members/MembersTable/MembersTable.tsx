"use client";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./MembersTable.module.scss";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import { InputField, MobileCardContainer, Pagination } from "@/shared";
import { customisedTableClasses } from "@/utils/classes";
import MembersCardMob from "../MembersCardMob/MembersCardMob";
import { Fade, Popper } from "@mui/material";
import { MoreIcon } from "@/shared/svgs/dashboard";
import { ActionsPopover } from "./Popovers";
import { debounce } from "lodash";

const MembersTable = ({ members, refetch }: any) => {

	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
	const [anchorElAction, setAnchorElAction] = React.useState<HTMLElement | null>(null);
	const [selectedRowAction, setSelectedRowAction] = useState<any | undefined>();
	const [openPoppover, setOpenPopover] = useState(Boolean(anchorEl));
	const [openPoppoverAction, setOpenPopoverAction] = useState(Boolean(anchorElAction));
	const [searchInput, setSearchInput] = useState("");
	const [currentPage, setCurrentPage] = useState<number>(1);
	const pageSize: number = 7;

	const sharedColDef: GridColDef = {
		field: "",
		sortable: true,
		flex: 1
	};

	const handlePopoverOpenAction = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElAction(event.currentTarget);
	};

	const reset = () => {
		setAnchorEl(null);
		setAnchorElAction(null);
		setOpenPopoverAction(false);
		setOpenPopover(false);
	}

	const columns: GridColDef[] = [
		{
			...sharedColDef,

			field: "userName",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Name",
			minWidth: 250,
			renderCell: ({ row, value }) => (
				<div className={styles.container__name_container}>
					<Image
						src={"/svgs/user.svg"}
						alt={value || "image-icon"}
						width={16}
						height={16}
					/>
					<p className={styles.container__name} style={{ fontSize: "1.2rem" }}>
						{value || "N/A"}
					</p>
				</div>
			)
		},
		{
			...sharedColDef,

			field: "email",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Email",
			minWidth: 150
		},
		{
			...sharedColDef,

			field: "role",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Role",
			minWidth: 150,
			renderCell: ({ row, value }) => (
				<div className={`${styles.role_container}  options_icon`}>
					<p
						style={{ fontSize: "1.2rem" }}
						className={styles.role}
					// onClick={e => {
					// 	setOpenPopover(true);
					// 	setSelectedRow(row);
					// 	handlePopoverOpen(e);
					// }}
					>
						{value && value !== "N/A" ? value.roleName : "N/A"}{" "}
						{/* <Image
							src="/svgs/filled-chevron.svg"
							height={10}
							width={10}
							alt="arrow"
							className={styles.icon}
						/> */}
					</p>
					{/* <Popper
						id={"simple-popover"}
						open={openPoppover}
						anchorEl={anchorEl}
						transition
					>
						{({ TransitionProps }) => (
							<Fade {...TransitionProps} timeout={200}>
								<div className={`${styles.more_modal} popover-content`}>
									<RolesPopover row={selectedRow} />
								</div>
							</Fade>
						)}
					</Popper> */}
				</div>
			)
		},
		{
			...sharedColDef,
			field: "actions",
			cellClassName: styles.table_cell,
			headerClassName: styles.table_header,
			headerName: "Actions",
			maxWidth: 150,
			renderCell: ({ row, value }) => (
				<div className={`${styles.actions_container} options_icon`}>
					<p style={{ fontSize: "1.2rem" }} className={`${styles.action}`}>
						<Popper
							id={"simple-popover"}
							open={openPoppoverAction}
							anchorEl={anchorElAction}
							transition
						>
							{({ TransitionProps }) => (
								<Fade {...TransitionProps} timeout={200}>
									<div
										className={`${styles.more_modal} popover-content`}
									>
										<ActionsPopover row={selectedRowAction} refetch={() => {
											refetch()
											reset()
										}
										} />
									</div>
								</Fade>
							)}
						</Popper>
						<MoreIcon
							onClick={e => {
								setOpenPopoverAction(true);
								setSelectedRowAction(row);
								handlePopoverOpenAction(e);
							}}
						/>
					</p>
				</div>
			)
		}
	];

	const filteredUsers = useMemo(() => {
		if (!searchInput) return members;
		return members.filter((member: any) =>
			member.email.toLowerCase().includes(searchInput.toLowerCase())
		);
	}, [searchInput, members]);

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * pageSize;
		const lastPageIndex = firstPageIndex + pageSize;
		return filteredUsers.slice(firstPageIndex, lastPageIndex);
	}, [currentPage, filteredUsers]);

	const startNumber = (currentPage - 1) * pageSize + 1;
	const endNumber = Math.min(
		startNumber + currentTableData?.length - 1,
		filteredUsers?.length
	);

	const debouncedSearch = useMemo(
		() =>
			debounce((value: string) => {
				setSearchInput(value);
			}, 300),
		[]
	);

	useEffect(() => {
		return () => {
			debouncedSearch.cancel();
		};
	}, [debouncedSearch]);



	useEffect(() => {
		// Function to handle click events
		const handleClick = (event: MouseEvent) => {
			const target = event.target as HTMLElement;

			// Check if the click happened outside the specified elements
			if (!target.closest(".options_icon") && !target.closest(".popover-content")) {
				reset()
			}
		};

		// Add event listener to the document
		document.addEventListener("click", handleClick);

		// Clean up the event listener
		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.container__input_filter_container}>
				<InputField
					placeholder="Search"
					icon="/svgs/icon-search-dark.svg"
					iconTitle="search-icon"
				// onChange={e => debouncedSearch(e.target.value)}
				/>
			</div>

			<div
				className={styles.container__table}
				style={{ width: "100%", height: "100%" }}
			>
				<DataGrid
					rows={currentTableData}
					columns={columns}
					hideFooterPagination={true}
					paginationMode="server"
					hideFooter
					autoHeight
					sx={customisedTableClasses}
					getRowId={row => row.id}
				/>
			</div>

			<MobileCardContainer>
				{currentTableData.map((item: any, ind: number) => (
					<MembersCardMob
						key={item.id}
						item={item}
						ind={ind}
						lastEle={ind + 1 === currentTableData.length ? true : false}
					/>
				))}
			</MobileCardContainer>
			<Pagination
				currentPage={currentPage}
				totalCount={members?.length}
				pageSize={pageSize}
				onPageChange={(page: any) => setCurrentPage(page)}
				startNumber={startNumber}
				endNumber={endNumber}
			/>
		</div>
	);
};

export default MembersTable;
