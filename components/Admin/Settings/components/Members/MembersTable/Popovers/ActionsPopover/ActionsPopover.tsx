"use client";
import React from "react";
import styles from "./ActionsPopover.module.scss";
import { useDeleteUserById } from "@/app/api/hooks/settings";
import Spinner from "@/shared/Spinner/Spinner";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AppRoutes } from "@/utils";

interface ActionsProps {
	row?: any;
	refetch: any;
}

enum ActionsEnum {
	PREVIEW = 1,
	DELETE = 2
}

const actions = [
	{
		id: ActionsEnum.PREVIEW,
		title: "View profile"
	},
	{
		id: ActionsEnum.DELETE,
		title: "Delete user"
	}
];

const ActionsPopover = ({ row, refetch }: ActionsProps) => {
	const { mutateAsync: deleteUser, isPending } = useDeleteUserById()
	const router = useRouter()

	const handleActions = (id: number) => {
		switch (id) {
			case ActionsEnum.PREVIEW:
				router.push(AppRoutes.userDetails(row?.userId))
				break;
			case ActionsEnum.DELETE:
				deleteUser({ userId: row?.userId }, {
					onSuccess: () => {
						refetch()
						toast.success("User deleted successfully")
					}
				})
				break;
			default:
				break;
		}
	};
	// console.log(activeFilter)
	return (
		<ul className={styles.container}>
			{actions.map(role => (
				<li
					onClick={() => handleActions(role.id)}
					key={role.id}
					className={`${styles.item} ${role.id === ActionsEnum.DELETE && styles.red
						}`}
				>
					{role.title}
					{
						isPending && role.id === ActionsEnum.DELETE && <Spinner size="small" />
					}
				</li>
			))}
		</ul>
	);
};

export default ActionsPopover;
