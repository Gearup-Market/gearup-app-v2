"use client";
import React, { useMemo, useState } from "react";
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
	WalletWithdrawalModal,
	XlmDepositModal,
	XlmWithdrawalModal
} from "./components";
import AlertModal from "./components/AlertModal/AlertModal";
import { GridAddIcon } from "@mui/x-data-grid";
import XlmTransactionsTable from "./components/XlmTransactionTable/XlmTransactionTable";
import Link from "next/link";
import { useAppSelector } from "@/store/configureStore";
import { formatNumber } from "@/utils";
import { WalletStatus } from "@/app/api/hooks/wallets/types";
import { useStellarWallet } from "@/hooks";
import { SmallLoader } from "@/shared/loaders";
import dynamic from "next/dynamic";

const WalletDepositModal = dynamic(
	() => import("./components").then(mod => mod.WalletDepositModal),
	{ ssr: false }
);

enum ToggleType {
	FIAT = "Fiat",
	XLM = "Xlm"
}

const toggleOptions = [
	{
		id: 1,
		title: ToggleType.FIAT
	},
	{
		id: 2,
		title: ToggleType.XLM
	}
];

const Wallet = () => {
	const [confirmWithdrawal, setConfirmWithdrawal] = useState(false);
	const [showAlertModal, setShowAlertModal] = useState(false);
	const [showXlmDepositModal, setShowXlmDepositModal] = useState(false);
	const [showXlmWithdrawalModal, setShowXlmWithdrawalModal] = useState(false);
	const [showWalletDepositModal, setShowWalletDepositModal] = useState(false);
	const [showWalletWithdrawalModal, setShowWalletWithdrawalModal] = useState(false);
	const [activeWallet, setActiveWallet] = useState<ToggleType>(ToggleType.FIAT);
	const { wallet } = useAppSelector(s => s.wallet);
	const {
		data: stellarWallet,
		isFetching: isFetchingStellarWallet,
		refetch
	} = useStellarWallet();

	const handleToggleWallet = (type: ToggleType) => {
		setActiveWallet(type);
	};

	const isWalletFrozen = useMemo(
		() => wallet?.status === WalletStatus.Frozen,
		[wallet?.status]
	);

	const walletBalance = useMemo(
		() => (wallet?.balance || 0) - (wallet?.pendingDebit || 0),
		[wallet]
	);

	return (
		<div className={styles.wallet_wrapper}>
			<div className={styles.mobile_title_container}>
				<HeaderSubText title="Wallet" variant="normal" />
				<Link href="/user/settings?q=import-wallet">
					<Button buttonType="secondary">
						<span className={styles.icon}>
							<SettingsNavIcon />{" "}
						</span>
						Settings
					</Button>
				</Link>
			</div>
			<div className={styles.toggle_btns_container}>
				{toggleOptions.map(option => (
					<Button
						onClick={() => handleToggleWallet(option.title)}
						key={option.id}
						buttonType="secondary"
						className={`${styles.toggle_btn} ${
							activeWallet === option.title && styles.active
						}`}
					>
						{option.title}
					</Button>
				))}
			</div>
			<div className={styles.container}>
				<div
					className={styles.fiat_wallet}
					data-active={activeWallet === ToggleType.FIAT}
				>
					<div className={styles.container__header}>
						<HeaderSubText title="Fiat Wallet" variant="normal" />
						<div className={`${styles.btn_container} ${styles.desktop_btns}`}>
							<Button
								onClick={() => setShowWalletDepositModal(true)}
								disabled={isWalletFrozen}
								buttonType="primary"
								className={`  ${styles.btn}`}
							>
								<GridAddIcon className={styles.icon} />
								Deposit
							</Button>
							<Button
								onClick={() => setShowWalletWithdrawalModal(true)}
								disabled={isWalletFrozen}
								buttonType="primary"
								className={` ${styles.withdraw_btn} ${styles.btn}`}
							>
								<span className={styles.icon}>
									<WithdrawIcon color="#FFB30F" />
								</span>
								Withdraw
							</Button>
							<Link href="/user/settings?q=import-wallet">
								<Button
									buttonType="secondary"
									className={`${styles.transparent_btn} ${styles.btn}`}
								>
									<span className={styles.icon}>
										<SettingsNavIcon />{" "}
									</span>
									Settings
								</Button>
							</Link>
						</div>
					</div>

					<div className={styles.account_balance_container}>
						<BalanceSection
							balance={walletBalance}
							text="Wallet balance"
							loading={isFetchingStellarWallet}
						/>
						<BalanceSection
							balance={wallet?.pendingDebit || 0}
							text="Escrow Balance"
							loading={isFetchingStellarWallet}
						/>
					</div>
					<div className={`${styles.btn_container} ${styles.mobile_btns}`}>
						<Button
							onClick={() => setShowWalletDepositModal(true)}
							disabled={isWalletFrozen}
							buttonType="primary"
							className={` ${styles.btn}`}
						>
							<GridAddIcon className={styles.icon} />
							Deposit
						</Button>
						<Button
							onClick={() => setShowWalletWithdrawalModal(true)}
							disabled={isWalletFrozen}
							buttonType="primary"
							className={`${styles.btn} ${styles.withdraw_btn}`}
						>
							<span className={styles.icon}>
								<WithdrawIcon color="#FFB30F" />
							</span>
							Withdraw
						</Button>
					</div>
					<div className={styles.table_section}>
						<HeaderSubText title="Transaction History" variant="normal" />
						<WalletTransactionsTable />
					</div>
				</div>
				<div
					className={styles.xlm_wallet}
					data-active={activeWallet === ToggleType.XLM}
				>
					<div className={styles.container__header}>
						<HeaderSubText title="XLM wallet" variant="normal" />
					</div>
					<div className={styles.xlm_balance_container}>
						<BalanceSection
							balance={stellarWallet?.xlmBalance || 0}
							text="Wallet balance"
							loading={isFetchingStellarWallet}
							type="xlm"
						/>
						{/* <BalanceSection
							balance={stellarWallet?.xlmBalance || 0}
							text="Escrow Balance"
							loading={isFetchingStellarWallet}
						/> */}
					</div>
					<div className={`${styles.btn_container} ${styles.xlm_btn}`}>
						<Button
							buttonType="primary"
							className={` ${styles.btn}`}
							onClick={() => setShowXlmDepositModal(true)}
						>
							<GridAddIcon className={styles.icon} />
							Deposit
						</Button>
						<Button
							onClick={() => setShowXlmWithdrawalModal(true)}
							buttonType="primary"
							className={`${styles.btn} ${styles.withdraw_btn}`}
						>
							<span className={styles.icon}>
								<WithdrawIcon color="#FFB30F" />
							</span>
							Withdraw
						</Button>
					</div>
					<div className={styles.table_section}>
						<HeaderSubText title="Transaction History" variant="normal" />
						<XlmTransactionsTable />
					</div>
				</div>
				{showWalletWithdrawalModal && (
					<WalletWithdrawalModal
						openModal={showWalletWithdrawalModal}
						setOpenModal={setShowWalletWithdrawalModal}
						setConfirmWithdrawal={setConfirmWithdrawal}
					/>
				)}
				{confirmWithdrawal && (
					<ConfirmWithdrawalModal
						openModal={confirmWithdrawal}
						setOpenModal={setConfirmWithdrawal}
						setShowAlertModal={setShowAlertModal}
					/>
				)}
				{showAlertModal && (
					<AlertModal
						openModal={showAlertModal}
						setOpenModal={setShowAlertModal}
					/>
				)}
				{showXlmDepositModal && (
					<XlmDepositModal
						openModal={showXlmDepositModal}
						setOpenModal={setShowXlmDepositModal}
						wallet={stellarWallet}
						isLoading={isFetchingStellarWallet}
					/>
				)}
				{showXlmWithdrawalModal && (
					<XlmWithdrawalModal
						openModal={showXlmWithdrawalModal}
						setOpenModal={setShowXlmWithdrawalModal}
						refetch={refetch}
					/>
				)}
				{showWalletDepositModal && (
					<WalletDepositModal
						openModal={showWalletDepositModal}
						close={() => setShowWalletDepositModal(false)}
					/>
				)}
			</div>
		</div>
	);
};

export default Wallet;

const BalanceSection = ({
	balance = "0.00",
	text,
	loading,
	type = "ngn"
}: {
	balance: string | number;
	text: string;
	loading: boolean;
	type?: "xlm" | "ngn";
}) => {
	return (
		<div className={styles.balance_section}>
			<p>{text}</p>
			{loading ? (
				<SmallLoader />
			) : (
				<h2>
					{type !== "xlm" ? (
						<Image src="/svgs/ngn.svg" alt="cur" height={20} width={20} />
					) : (
						"XLM"
					)}{" "}
					{balance || "0.00"}
				</h2>
			)}
		</div>
	);
};
