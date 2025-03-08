"use client";
import React, { useState } from "react";
import styles from "./ListingCardMob.module.scss";
import Image from "next/image";
import { Button, MobileCard, ToggleSwitch } from "@/shared";
import { formatDate, formatNum } from "@/utils";
import Link from "next/link";
import { useAppSelector } from "@/store/configureStore";
import { usePostRemoveListing } from "@/app/api/hooks/listings";
import toast from "react-hot-toast";
import { useDeleteCourse } from "@/app/api/hooks/courses";
import ConfirmPin from "@/components/UserDashboard/Settings/components/confirmPin/ConfirmPin";

interface Props {
	item: any;
	ind?: number;
	lastEle?: boolean;
	activeFilter?: string;
	onToggleHideListing: (id: string, status: string) => void;
	refetch?: () => void;
	onClickEdit?: (id: string) => void;
}

const ListingCardMob = ({
	item,
	ind,
	lastEle,
	activeFilter,
	onToggleHideListing,
	refetch,
	onClickEdit
}: Props) => {
	const [openModal, setOpenModal] = useState<boolean>(false);
	const { userId } = useAppSelector(s => s.user);
	const { mutateAsync: postRemoveListing, isPending: isPendingRemoval } =
		usePostRemoveListing();

	const { mutateAsync: postRemoveCourse, isPending: isPendingCourseRemoval } =
		useDeleteCourse();

	const onDeleteListing = async () => {
		try {
			const payload = { userId, listingId: item.id };
			const res = await postRemoveListing(payload);
			if (res.data) {
				toast.success("Listing deleted");
				refetch!();
			}
		} catch (error) {}
	};

	const onDeleteCourse = async () => {
		try {
			const payload = { userId, courseId: item.id };
			const res = await postRemoveCourse(payload);
			if (res.data) {
				toast.success("Course deleted");
				refetch!();
			}
		} catch (error) {}
	};
	return (
		<MobileCard
			mainHeaderImage={item.image || item.cover || "/images/admin-img.jpg"}
			mainHeaderText={item.title}
			subHeaderText={activeFilter !== "courses" ? item.price : ""}
			lastEle={lastEle}
			ind={ind}
		>
			{activeFilter === "courses" ? (
				<>
					<div className={styles.container__details__detail_container}>
						<p className={styles.key}>Price</p>
						<p className={styles.value}>₦{formatNum(item.price)}</p>
					</div>
					<div className={styles.container__details__detail_container}>
						<p className={styles.key}>Sold</p>
						<p className={`${styles.value}`}>{item.sold_count}</p>
					</div>
					<div className={styles.container__details__detail_container}>
						<p className={styles.key}>Revenue</p>
						<p className={`${styles.value}`}>{item.revenue}</p>
					</div>
					<div className={styles.container__details__detail_container}>
						<p className={styles.key}>Status</p>
						<p className={`${styles.value} ${styles.courses_status}`}>
							{item.status}
						</p>
					</div>
					<Link href={`/user/courses/${item.id}`}>
						<Button buttonType="secondary" className={styles.button}>
							See Details
						</Button>
					</Link>

					<p className={`${styles.courses_action_icons}`}>
						<span>
							<Image
								src={"/svgs/share.svg"}
								alt={item.title}
								width={16}
								height={16}
							/>
							Share
						</span>
						<span>
							<Image
								src={"/svgs/edit.svg"}
								alt={item.title}
								width={16}
								height={16}
							/>
							Edit
						</span>
						<span
							className={styles.delete}
							onClick={() => setOpenModal(true)}
						>
							<Image
								src={"/svgs/red-trash.svg"}
								alt={item.title}
								width={16}
								height={16}
							/>
							Delete
						</span>
					</p>
				</>
			) : (
				<>
					<div className={styles.container__details__detail_container}>
						<p className={styles.key}>Category</p>
						<p className={styles.value}>{item.category}</p>
					</div>
					<div className={styles.container__details__detail_container}>
						<p className={styles.key}>Status</p>
						<div className={styles.status_container}>
							<ToggleSwitch
								checked={item.status?.toLowerCase() === "available"}
								onChange={() => onToggleHideListing(item.id, item.status)}
							/>
							<p
								style={{ fontSize: "1.4rem" }}
								className={styles.container__status_container__status}
							>
								{item.status?.toLowerCase() === "ongoing"
									? "Live"
									: "Draft"}
							</p>
						</div>
					</div>
					<div className={styles.container__details__detail_container}>
						<p className={styles.key}>Date</p>
						<p className={`${styles.value}`}>{formatDate(item.date)}</p>
					</div>
					<div className={styles.container__details__detail_container}>
						<p className={styles.key}>Availability</p>
						<p className={`${styles.value} ${styles.rental}`}>
							{item.availability}
						</p>
					</div>
					<Link href={`/user/listings/${item.id}`}>
						<Button className={styles.button} buttonType="secondary">
							See Details
						</Button>
					</Link>
					{onClickEdit && (
						<div className={styles.container__details__detail_container}>
							<p className={styles.key}>Actions</p>
							<p className={`${styles.value} ${styles.action_icons}`}>
								<Image
									src={"/svgs/edit.svg"}
									alt={item.title}
									width={16}
									height={16}
									onClick={() => onClickEdit(item.id)}
								/>
								<Image
									onClick={() => setOpenModal(true)}
									src={"/svgs/red-trash.svg"}
									alt={item.title}
									width={16}
									height={16}
								/>
							</p>
						</div>
					)}
				</>
			)}
			{openModal && (
				<ConfirmPin
					openModal={openModal}
					setOpenModal={setOpenModal}
					onSuccess={
						activeFilter === "courses" ? onDeleteCourse : onDeleteListing
					}
				/>
			)}
		</MobileCard>
	);
};

export default ListingCardMob;
