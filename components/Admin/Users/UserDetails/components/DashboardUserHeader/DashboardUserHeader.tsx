"use client";

import HeaderSubText from "@/components/Admin/HeaderSubText/HeaderSubText";
import React, { useState } from "react";
import styles from "./DashboardUserHeader.module.scss";
import { Button, Ratings } from "@/shared";
import Image from "next/image";
import Link from "next/link";
import Modal from "@/shared/modals/modal/Modal";
import { usePostDeactivateUser } from "@/app/api/hooks/Admin/users";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const DashboardUserHeader = ({ data }: any) => {
	const [showModal, setShowModal] = useState<boolean>(false);
	const router = useRouter();
	const { mutateAsync: postDeactivateUser, isPending } = usePostDeactivateUser({
		userId: data._id
	});
	const handleSubmit = async () => {
		try {
			const res = await postDeactivateUser({
				userId: data._id
			});
			if (res?.data?.token) {
				toast.success("Successfully deactivated user");
				router.back();
				// window.location.reload();
			}
		} catch (error: any) {
			console.log(
				"error occurred....",
				error.response.data.message,
				error.response?.status
			);
			toast.error(error.response.data.message || "Failed to delete user");
		}
	};
	return (
		<div className={styles.wrapper}>
			<HeaderSubText title="User Information" />
			<div className={styles.container}>
				<div className={styles.container__left}>
					<div className={styles.left_top}>
						<div className={styles.image_container}>
							<Image
								src={data.avatar || "/svgs/user.svg"}
								width={100}
								height={100}
								alt="user avatar"
								className={styles.user_image}
							/>
							<span className={styles.active_status}></span>
						</div>
						<div>
							<div className={styles.name_container}>
								<h3 className={styles.user_name}>{data.userName}</h3>
								<span
									className={styles.verification_status}
									data-verified={data.isVerified}
								>
									{data.isVerified ? "Verified" : "Not verified"}
								</span>
							</div>
							<p className={styles.faded_text}>{data.email}</p>
							<p className={styles.faded_text}>{data.address}</p>
							<div className={styles.flex_item}>
								<p className={styles.faded_text}>20 Deals </p>
								<p className={styles.divider}>|</p>
								<span className={styles.rating_item}>
									<Ratings rating={data.rating} />
									<p> {data.rating}</p>
								</span>
							</div>
							<div className={styles.flex_item}>
								<p className={styles.faded_text}>Date joined :</p>
								<p className={styles.date_text}>
									{" "}
									{data.createdAt.split("T")[0]}
								</p>
							</div>
						</div>
					</div>
					<div className={styles.socials_container}>
						{data.twitter && (
							<Link
								target="_blank"
								rel="noopener noreferrer"
								href={data.twitter}
							>
								<Image
									src="/svgs/twitter.svg"
									width={50}
									height={50}
									alt="social icon"
								/>
							</Link>
						)}
						{data.instagram && (
							<Link
								target="_blank"
								rel="noopener noreferrer"
								href={data.instagram}
							>
								<Image
									src="/svgs/insta.svg"
									width={50}
									height={50}
									alt="social icon"
								/>
							</Link>
						)}
						{data.linkedin && (
							<Link
								target="_blank"
								rel="noopener noreferrer"
								href={data.linkedin}
							>
								<Image
									src="/svgs/linkedin.svg"
									width={50}
									height={50}
									alt="social icon"
								/>
							</Link>
						)}
						{data.facebook && (
							<Link
								target="_blank"
								rel="noopener noreferrer"
								href={data.facebook}
							>
								<Image
									src="/svgs/facebook.svg"
									width={50}
									height={50}
									alt="social icon"
								/>
							</Link>
						)}
					</div>
				</div>
				<div className={styles.btns_container}>
					{/* <Button buttonType="secondary" className={styles.view_profile} onClick={()=>router.push('/')}>
						View profile
					</Button> */}
					<Button
						buttonType="secondary"
						className={styles.deactivate_btn}
						onClick={() => setShowModal(true)}
					>
						Deactivate user
					</Button>
				</div>
				{showModal && (
					<Modal
						title="Deactivate user"
						openModal={showModal}
						setOpenModal={setShowModal}
						className={styles.modal}
						description={`Are you sure you want to deactivate ${
							data.userName || data.email
						}?`}
					>
						<Button
							className={styles.button}
							disabled={isPending}
							onClick={handleSubmit}
						>
							Confirm
						</Button>
					</Modal>
				)}
			</div>
		</div>
	);
};

export default DashboardUserHeader;
