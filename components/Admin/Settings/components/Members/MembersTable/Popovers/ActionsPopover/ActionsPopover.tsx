"use client";
import React from "react";
import styles from "./ActionsPopover.module.scss";

interface ActionsProps {
	row?: any;
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

const ActionsPopover = ({ row }: ActionsProps) => {
	const handleActions = (id: number) => {
		switch (id) {
			case ActionsEnum.PREVIEW:
				console.log(`previewing ${row.userId}`);
				break;
			case ActionsEnum.DELETE:
				console.log(`deleting ${row.userId}`);
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
					className={`${styles.item} ${
						role.id === ActionsEnum.DELETE && styles.red
					}`}
				>
					{role.title}
				</li>
			))}
		</ul>
	);
};

export default ActionsPopover;
