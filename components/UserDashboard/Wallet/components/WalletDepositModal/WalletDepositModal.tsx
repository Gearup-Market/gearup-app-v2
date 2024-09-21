"use cient";
import React, { useMemo, useState } from "react";
import styles from "./WalletDepositModal.module.scss";
import Modal from "@/shared/modals/modal/Modal";
import Image from "next/image";
import { Button, InputField } from "@/shared";
import { CopyIcon, EditIcon } from "@/shared/svgs/dashboard";
import { useAppSelector } from "@/store/configureStore";
import { usePaystackPayment } from "react-paystack";
import { toast } from "react-toastify";
import { useWallet } from "@/hooks";

interface Props {
	openModal: boolean;
	close: () => void;
}

const fundOptions: { gateway: 'paystack' | 'flutterwave'; label: string }[] = [
	{ gateway: "flutterwave", label: "Fund with flutterwave" },
	{ gateway: "paystack", label: "Fund with paystack" }
];

const paystackConfig = {
	reference: new Date().getTime().toString(),
	publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUB_KEY!
};

const WalletDepositModal = ({ openModal, close }: Props) => {
	const { wallet } = useAppSelector(s => s.wallet);
	const user = useAppSelector(s => s.user);
	const [amount, setAmount] = useState<string | number>("");

	const onClose = () => {
		close()
	};

	const initializePayment = usePaystackPayment(paystackConfig);

	const onClickPaystack = () => {
		initializePayment({
			onSuccess: onPaystackSuccess,
			onClose: onClosePaymentModal,
			config: {
				currency: "NGN",
				email: user.email,
				amount: +amount * 100,
                metadata: {
                    userId: user?.userId,
                    custom_fields: []
                }
			}
		});
	};

	const onPaystackSuccess = (reference: string) => {
        onClose()
	};

	const onClosePaymentModal = () => {
		toast.error('Paystack modal closed')
	};

	return (
		<Modal title="Withdrawal" openModal={openModal} setOpenModal={onClose}>
			<div className={styles.container}>
				<p className={styles.header}>
					Transfer money to your <span className={styles.bold}>Gearup</span>{" "}
					account
				</p>
				{wallet?.accountNumber && (
					<>
						<div className={styles.container__details}>
							<div className={styles.container__details__detail_container}>
								<p className={styles.key}>Bank name</p>
								<p className={styles.value}>{wallet.bankName}</p>
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
										<span>{wallet.accountNumber}</span>
										<span className={styles.icon}>
											<CopyIcon />
										</span>
										Copy
									</span>
								</p>
							</div>
							<div className={styles.container__details__detail_container}>
								<p className={styles.key}>Account name</p>
								<p className={styles.value}>{wallet.accountName}</p>
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
						{fundOptions.map((option, index) => (
							<li
								key={index}
								className={styles.container__bank_details__option}
								onClick={() => {
                                    if(!amount) {
                                        return;
                                    };
                                    if(option.gateway === 'paystack') onClickPaystack()
                                }}
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
							</li>
						))}
					</ul>
				</div>
			</div>
		</Modal>
	);
};

export default WalletDepositModal;
