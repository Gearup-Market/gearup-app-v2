"use client";

import React, { useEffect, useState } from "react";
import styles from "./ListingCard.module.scss";
import Image from "next/image";
import { formatLink, formatNum, shortenTitle } from "@/utils";
import Link from "next/link";
import { useGlobalContext } from "@/contexts/AppContext";
import { EllipseIcon, MoreIcon } from "@/shared/svgs/dashboard";
import MoreModal from "../MoreModal/MoreModal";
import { Button, CustomImage } from "@/shared";
import { Field } from "@/app/api/hooks/listings/types";
import { Filter } from "@/interfaces/Listing";

interface Props {
	props: any;
	className?: string;
	activeFilter?: Filter;
	activeRow?: number;
	setActiveRow?: React.Dispatch<React.SetStateAction<number>>;
	showMoreIcon?: boolean;
	showStatusIcon?: boolean;
	onClickEdit?: (listingId: string) => void;
	refetch?: () => void;
	closePopOver?: () => void;
	handleDelete?: (id: string) => void;
	type?: "listings" | "courses";
}

const ListingCard = ({
	props,
	className,
	activeFilter,
	activeRow,
	setActiveRow,
	showMoreIcon = true,
	showStatusIcon = true,
	onClickEdit,
	refetch,
	closePopOver,
	handleDelete,
	type = "listings"
}: Props) => {
	const [showMoreModal, setShowMoreModal] = useState(false);

	const handleMoreIconClick = (id: number) => {
		if (!setActiveRow) return;
		setActiveRow(id);
		setShowMoreModal(prev => !prev);
		// Add any additional logic for the MoreIcon click here
	};

	useEffect(() => {
		const handleBodyClick = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (target.closest(`.more-modal`) || target.closest(`.${styles.more_icon}`))
				return;
			setShowMoreModal(false);
			if (!setActiveRow) return;
			setActiveRow(0);
		};
		document.body.addEventListener("click", handleBodyClick);
		return () => {
			document.body.removeEventListener("click", handleBodyClick);
		};
	}, []);

	return (
		<div className={`${styles.container} ${className}`}>
			<div
				className={styles.image}
				data-disabled={
					props.status ? props.status.toLowerCase() === "unavailable" : false
				}
			>
				<CustomImage
					src={props?.image || props?.cover || ""}
					alt={props.title}
					fill
					sizes="100vw"
				/>
				{showMoreIcon && (
					<span
						className={styles.more_icon}
						onClick={() => handleMoreIconClick(props.id)}
					>
						<MoreIcon />
					</span>
				)}
				{showMoreModal && activeRow === props.id && (
					<div
						className={`${styles.more_modal} more-modal`}
						onClick={e => e.stopPropagation()}
					>
						{" "}
						<MoreModal
							row={props}
							activeFilter={activeFilter}
							onClickEdit={onClickEdit}
							refetch={refetch}
							closePopOver={closePopOver}
							type={type}
						/>
					</div>
				)}
				<div className={styles.button_container}>
					<Button className={styles.button}>
						{props.type || props.courseType}
					</Button>
				</div>
			</div>
			<div className={styles.row} style={{ alignItems: "flex-start" }}>
				<div className={styles.text}>
					<h2>{shortenTitle(props.title, 50)}</h2>
				</div>
				{showStatusIcon && (
					<div className={styles.chevron}>
						<EllipseIcon color="#F76039" />
					</div>
				)}
			</div>
			<div className={styles.pricing_container}>
				<div className={styles.pricing}>
					<p>₦{formatNum(props.price)}</p>
				</div>
			</div>
		</div>
	);
};

export default ListingCard;
