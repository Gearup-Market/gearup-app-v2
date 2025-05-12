"use client";
import React, { useMemo, useState } from "react";
import styles from "./WithdrawalRequests.module.scss";
import HeaderSubText from "../../HeaderSubText/HeaderSubText";
import { CheckmarkIcon, ChevronIcon, CloseIcon } from "@/shared/svgs/dashboard";
import { withdrawalRequests } from "@/mock/withdrawal-requests";
import { Button, InputField, Pagination } from "@/shared";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
	useGetAllWithdrawals,
	usePostWithdrawalRequest
} from "@/app/api/hooks/Admin/withdrawals";
import { formatNum } from "@/utils";
import toast from "react-hot-toast";
import Modal from "@/shared/modals/modal/Modal";
import NoTransactions from "@/components/UserDashboard/Transactions/components/NoTransactions/NoTransactions";

const pageSize: number = 12;

const WithdrawalRequests = () => {
	const { data: withdrawalHistory, isLoading, refetch } = useGetAllWithdrawals();
	const { mutateAsync: postWithdrawalRequest, isPending } = usePostWithdrawalRequest();
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [rejectReason, setRejectReason] = useState<string>("");
	const [rejectedItemId, setRejectedItemId] = useState<string>("");
	const [showModal, setShowModal] = useState<boolean>(false);
	const [isRequestLoading, setIsRequestLoading] = useState<boolean>(false);
	const router = useRouter();

	const pendingWithdrawal = useMemo(() => {
		if (!withdrawalHistory) return [];
		return withdrawalHistory.data.filter(
			withdrawal => withdrawal.status === "pending"
		);
	}, [withdrawalHistory]);

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * pageSize;
		const lastPageIndex = firstPageIndex + pageSize;
		return pendingWithdrawal.slice(firstPageIndex, lastPageIndex);
	}, [currentPage, pendingWithdrawal]);

	const startNumber = (currentPage - 1) * pageSize + 1;
	const endNumber = Math.min(
		startNumber + currentTableData?.length - 1,
		pendingWithdrawal?.length
	);

	const handleSubmit = async (status: "approved" | "rejected", id: string) => {
		try {
			const res = await postWithdrawalRequest({
				status,
				...(rejectReason && { reason: rejectReason }),
				id
			});
			setIsRequestLoading(true);
			if (res?.data) {
				toast.success(`The withdrawal request has been ${status} successfully`);
				setRejectedItemId("");
				setShowModal(false);
				refetch();
			}
		} catch (error: any) {
			toast.error(error.response.data.message || "Withdrawal Response failed");
		} finally {
			setIsRequestLoading(false);
		}
	};

	const handleBack = () => {
		router.back();
	};
	return (
		<div className={styles.container}>
			<div className={styles.nav_container} onClick={handleBack}>
				<span className={styles.icon}>
					<ChevronIcon color="#4E5054" />
				</span>
				<p>Back</p>
			</div>

			<div className={styles.table_header}>
				<HeaderSubText title="Withdrawal requests" />
				{/* <p>
					{" "}
					<span className={styles.icon}>
						<CheckmarkIcon color="#fff" />{" "}
					</span>
					Accept All
				</p> */}
			</div>

			<ul className={styles.requests_container}>
				{currentTableData.length ? (
					currentTableData.map(item => (
						<li key={item.withdrawalId} className={styles.request_item}>
							<div className={styles.item_details}>
								<div className={styles.left}>
									<Image
										src="/svgs/user.svg"
										alt={"avatar"}
										width={16}
										height={16}
									/>
									<span className={styles.right}>
										<h2>{item.accountName}</h2>
										<p>₦{formatNum(item.amount)}</p>
									</span>
								</div>
							</div>
							<div className={styles.action_btns}>
								<Button
									buttonType="transparent"
									className={styles.decline_text}
									disabled={isRequestLoading}
									onClick={() => {
										setShowModal(true);
										setRejectedItemId(item._id);
									}}
								>
									{" "}
									<span className={styles.icon}>
										<CloseIcon color="#FF3729" />{" "}
									</span>{" "}
									<p>Decline</p>
								</Button>
								<Button
									buttonType="transparent"
									disabled={isRequestLoading}
									className={styles.accept_text}
									onClick={() => handleSubmit("approved", item._id)}
								>
									{" "}
									<span className={styles.icon}>
										<CheckmarkIcon color="#fff" />{" "}
									</span>{" "}
									<p>Accept</p>
								</Button>
							</div>
						</li>
					))
				) : (
					<NoTransactions />
				)}
			</ul>
			<Pagination
				currentPage={currentPage}
				totalCount={pendingWithdrawal?.length}
				pageSize={pageSize}
				onPageChange={(page: any) => setCurrentPage(page)}
				startNumber={startNumber}
				endNumber={endNumber}
			/>
			{showModal && (
				<Modal
					title="Confirm rejection"
					openModal={showModal}
					setOpenModal={setShowModal}
					className={styles.modal}
				>
					<InputField
						label="Reason for rejection"
						placeholder="Input your reason"
						value={rejectReason}
						onChange={e => setRejectReason(e.target.value)}
					/>
					<Button
						className={styles.button}
						disabled={!rejectReason || isRequestLoading}
						onClick={() => handleSubmit("rejected", rejectedItemId)}
					>
						Confirm
					</Button>
				</Modal>
			)}
		</div>
	);
};

export default WithdrawalRequests;
