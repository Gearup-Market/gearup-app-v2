"use client";

import HeaderSubText from "@/components/Admin/HeaderSubText/HeaderSubText";
import React, { useState } from "react";
import styles from "./DashboardUserHeader.module.scss";
import { Button, InputField, Ratings } from "@/shared";
import Image from "next/image";
import Link from "next/link";
import Modal from "@/shared/modals/modal/Modal";
import {
	usePostDeactivateUser,
	usePostAdminUpdateKyc
} from "@/app/api/hooks/Admin/users";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Kyc } from "@/app/api/hooks/Admin/users/types";

const DashboardUserHeader = ({ data, kycData }: { data: any; kycData?: Kyc }) => {
	const [showModal, setShowModal] = useState<boolean>(false);
	const router = useRouter();
	const { mutateAsync: postUpdateKyc, isPending } = usePostAdminUpdateKyc();

	const handleSubmit = async (
		action: "approve" | "reject",
		rejectionMessage?: string
	) => {
		try {
			const res = await postUpdateKyc({
				userId: data._id,
				action,
				rejectionMessage
			});
			if (res?.message) {
				toast.success(
					action === "approve"
						? "KYC has been approved"
						: "KYC has been rejected"
				);
				router.back();
			}
		} catch (error: any) {
			console.log(error.response.data.message, error.response?.status);
			toast.error(error.response.data.message || "Failed to update user KYC");
		} finally {
			setShowModal(false);
		}
	};

	const [rejectionMessage, setRejectionMessage] = useState("");

	const rejectKyc = async () => {
		if (!rejectionMessage) {
			toast.error("Rejection message is required");
			return;
		}
		await handleSubmit("reject", rejectionMessage);
	};

	return (
		<div className={styles.wrapper}>
			<HeaderSubText title="User Information" />
			<div className={styles.container}>
				<div className={styles.container__left}>
					<div className={styles.left_top}>
						<div className={styles.image_container}>
							<Image
								src={data?.avatar || "/svgs/user.svg"}
								width={100}
								height={100}
								alt="user avatar"
								className={styles.user_image}
							/>
						</div>
						<div>
							<div className={styles.name_container}>
								<h3 className={styles.user_name}>{data?.userName}</h3>
								<span
									className={styles.verification_status}
									data-verified={data?.isVerified}
								>
									{data?.isVerified ? "Verified" : "Not verified"}
								</span>
							</div>
							<p className={styles.faded_text}>{data?.email}</p>
							<p className={styles.faded_text}>{data?.address}</p>
							<div className={styles.flex_item}>
								<p className={styles.faded_text}>Date submitted:</p>
								<p className={styles.date_text}>
									{" "}
									{kycData?.createdAt?.split("T")?.[0]}
								</p>
							</div>
						</div>
					</div>
				</div>
				{
					<div className={styles.btns_container}>
						<Button
							buttonType="secondary"
							className={styles.view_profile}
							onClick={() => handleSubmit("approve")}
						>
							Approve KYC
						</Button>
						<Button
							buttonType="secondary"
							className={styles.deactivate_btn}
							onClick={() => setShowModal(true)}
						>
							Reject KYC
						</Button>
					</div>
				}

				{showModal && (
					<Modal
						title="Reject KYC"
						openModal={showModal}
						setOpenModal={setShowModal}
						className={styles.modal}
					>
						<InputField
							name="rejectionMessage"
							placeholder="Enter the rejection message here"
							onChange={e => setRejectionMessage(e.target.value)}
						/>
						<Button
							className={styles.button}
							disabled={isPending}
							onClick={rejectKyc}
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
