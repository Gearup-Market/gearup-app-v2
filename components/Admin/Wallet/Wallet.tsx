"use client";
import React, { useState } from "react";
import HeaderSubText from "../HeaderSubText/HeaderSubText";
import styles from "./Wallet.module.scss";
import { Button, InputField } from "@/shared";
import {
	CustomWalletIcon,
	SettingsNavIcon,
	TransactionNavIcon,
	WithdrawIcon
} from "@/shared/svgs/dashboard";
import { DashboardCard } from "../Dashboard/Components";
import Image from "next/image";
import {
	ConfirmWithdrawalModal,
	WalletTransactionsTable,
	WithdrawalModal
} from "./components";
import AlertModal from "./components/AlertModal/AlertModal";
import { GridAddIcon } from "@mui/x-data-grid";
import Link from "next/link";
import { useGetAllWithdrawals } from "@/app/api/hooks/Admin/withdrawals";

const Wallet = () => {
	const [isWithdrawal, setIsWithdrawal] = useState(false);
	const [confirmWithdrawal, setConfirmWithdrawal] = useState(false);
	const [showAlertModal, setShowAlertModal] = useState(false);
	const isRequests = true;

	const openModalHandler = () => {
		setIsWithdrawal(true);
	};

	const openConfirmModal = () => {
		setIsWithdrawal(true);
	};

	const closeWithdrawalModal = () => {
		setIsWithdrawal(false);
	};

	const closeConfirmModal = () => {
		setConfirmWithdrawal(false);
	};

	return (
		<div className={styles.container}>
			<div className={styles.container__header_container}>
				<div
					className={`${styles.container__header_container__item} ${styles.left}`}
				>
					<div>
						<p className={styles.name}>Escrow Wallet</p>
						<h3 className={styles.amount}>$0.00</h3>
					</div>
					<div className={styles.btn_container}>
						<Button
							buttonType="secondary"
							className={`${styles.transparent_btn} ${styles.btn}`}
						>
							<span className={styles.icon}>
								<GridAddIcon className={styles.icon} />{" "}
							</span>
							Deposit
						</Button>
						<Button
							onClick={openModalHandler}
							buttonType="primary"
							className={styles.btn}
						>
							<span className={styles.icon}>
								<WithdrawIcon />
							</span>
							Withdraw
						</Button>
					</div>
				</div>
				<>
					{isRequests ? (
						<div
							className={`${styles.container__header_container__item} ${styles.pending_requests}`}
						>
							<div>
								<p className={styles.title}>Withdrawal requests</p>
								<h3 className={styles.description}>
									Review all pending withdrawal request
								</h3>
							</div>
							<Button
								buttonType="secondary"
								iconSuffix="/svgs/chevron2-right.svg"
								className={styles.pending_request_btn}
							>
								<Link href={`/admin/wallet/withdrawal-requests`}>
									Review pending withdrawals
								</Link>
							</Button>
						</div>
					) : (
						<div
							className={`${styles.container__header_container__item} ${styles.no_requests}`}
						>
							<span className={styles.icon}>
								<TransactionNavIcon />
							</span>
							<p className={styles.title}>No Withdrawal Request</p>
						</div>
					)}
				</>
			</div>
			<div className={styles.table_section}>
				<HeaderSubText title="Transaction History" variant="normal" />
				<WalletTransactionsTable />
			</div>
		</div>
	);
};

export default Wallet;
