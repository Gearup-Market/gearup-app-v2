"use client";
import React, { useMemo, useState } from "react";
import styles from "./WalletDepositModal.module.scss";
import Modal from "@/shared/modals/modal/Modal";
import Image from "next/image";
import { Button, InputField, PaystackPaymentButton } from "@/shared";
import { CopyIcon, EditIcon } from "@/shared/svgs/dashboard";
import { useAppSelector } from "@/store/configureStore";
import { toast } from "react-hot-toast";
import { PaystackProps } from "react-paystack/dist/types";
import { useCopy } from "@/hooks";

interface Props {
	openModal: boolean;
	close: () => void;
	refetch: () => void;
}

const fundOptions: { gateway: "paystack" | "flutterwave"; label: string }[] = [
	// { gateway: "flutterwave", label: "Fund with flutterwave" },
	{ gateway: "paystack", label: "Fund with paystack" }
];

const paystackConfig = {
	reference: new Date().getTime().toString(),
	publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUB_KEY!
};

const WalletDepositModal = ({ openModal, close, refetch }: Props) => {
	const handleCopy = useCopy();
	const user = useAppSelector(s => s.user);
	const [amount, setAmount] = useState<string | number>("");

	const onClose = () => {
		close();
		refetch();
	};

	const onPaystackSuccess = (reference: any) => {
		onClose();
		refetch();
	};

	const onClosePaymentModal = () => {
		toast.error("Paystack modal closed");
	};

	const paystackComponentProps: PaystackProps = useMemo(
		() => ({
			...paystackConfig,
			currency: "NGN",
			email: user.email,
			amount: +amount * 100,
			metadata: {
				userId: user?.userId,
				custom_fields: []
			},
			onSuccess: onPaystackSuccess,
			onClose: onClosePaymentModal
		}),
		[user, amount]
	);

	return (
		<Modal title="Deposit" openModal={openModal} setOpenModal={onClose}>
			<div className={styles.container}>
				<p className={styles.header}>
					Transfer money to your <span className={styles.bold}>Gearup</span>{" "}
					account
				</p>
				{user?.dedicatedAccountBank && (
					<>
						<div className={styles.container__details}>
							<div className={styles.container__details__detail_container}>
								<p className={styles.key}>Bank name</p>
								<p className={styles.value}>
									{user.dedicatedAccountBank}
								</p>
							</div>
							<div className={styles.container__details__detail_container}>
								<p className={styles.key}>Account number</p>
								<p className={styles.value}>
									<span
										style={{
											display: "flex",
											alignItems: "center",
											gap: "5px"
										}}
									>
										<span>{user.dedicatedAccountNumber}</span>
										<span
											className={styles.icon}
											style={{ cursor: "pointer" }}
											onClick={() =>
												handleCopy(
													user.dedicatedAccountNumber || ""
												)
											}
										>
											<CopyIcon />
										</span>
									</span>
								</p>
							</div>
							<div className={styles.container__details__detail_container}>
								<p className={styles.key}>Account name</p>
								<p className={styles.value}>
									{user.dedicatedAccountName}
								</p>
							</div>
						</div>
						<span className={styles.divider_container}>
							<hr className={styles.divider} />
							or
							<hr className={styles.divider} />
						</span>
					</>
				)}
				<InputField
					placeholder="Enter amount"
					label="Amount"
					value={amount}
					type="number"
					min={0}
					onChange={e => setAmount(e.target.value)}
				/>
				<div>
					<ul className={styles.container__bank_details}>
						{fundOptions.map((option, index) => {
							return (
								<li
									key={index}
									className={styles.container__bank_details__option}
									onClick={() => {
										if (!amount) {
											return toast.error("Please input an amount");
										}
									}}
									data-disabled={+amount <= 0}
								>
									{option.gateway === "paystack" ? (
										<PaystackPaymentButton
											{...paystackComponentProps}
											disabled={+amount <= 0}
										>
											<div className={styles.left}>
												<span className={styles.icon}>
													<Image
														src="/svgs/deposit-icon-with.svg"
														alt="deposit icon"
														width={16}
														height={16}
													/>
												</span>
												<p>{option.label}</p>
											</div>
											<div className={styles.right}>
												<span className={styles.icon}>
													<Image
														src="/svgs/arrow-right.svg"
														alt="deposit icon"
														width={16}
														height={16}
													/>
												</span>
											</div>
										</PaystackPaymentButton>
									) : (
										<>
											<div className={styles.left}>
												<span className={styles.icon}>
													<Image
														src="/svgs/deposit-icon-with.svg"
														alt="deposit icon"
														width={16}
														height={16}
													/>
												</span>
												<p>{option.label}</p>
											</div>
											<div className={styles.right}>
												<span className={styles.icon}>
													<Image
														src="/svgs/arrow-right.svg"
														alt="deposit icon"
														width={16}
														height={16}
													/>
												</span>
											</div>
										</>
									)}
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</Modal>
	);
};

export default WalletDepositModal;
