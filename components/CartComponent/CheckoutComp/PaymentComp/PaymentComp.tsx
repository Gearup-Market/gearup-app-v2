"use client";
import React, { useMemo, useState } from "react";
import styles from "./PaymentComp.module.scss";
import { HeaderSubText } from "@/components/UserDashboard";
import Image from "next/image";
import { ChevronIcon } from "@/shared/svgs/dashboard";
import SuccessModal from "../SuccessModal/SuccessModal";
import { Listing } from "@/store/slices/listingsSlice";
import { useStellarWallet, useWallet } from "@/hooks";
import { SmallLoader } from "@/shared/loaders";
import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import toast from "react-hot-toast";
import { usePostTransaction } from "@/app/api/hooks/transactions";
import { RentalPeriod } from "@/app/api/hooks/transactions/types";
import { resetCheckout } from "@/store/slices/checkoutSlice";
import useCart from "@/hooks/useCart";
import { PaystackPaymentButton } from "@/shared";
import { PaystackProps } from "react-paystack/dist/types";
import { formatNum } from "@/utils";

export enum PaymentMethod {
	Wallet = "wallet",
	Paystack = "paystack",
	XLM = "xlm"
}
const paystackConfig = {
	reference: new Date().getTime().toString(),
	publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUB_KEY!
};

const PaymentComp = ({
	item,
	amount,
	type,
	rentalPeriod
}: {
	item: Listing;
	amount: number;
	type: string;
	rentalPeriod?: RentalPeriod;
}) => {
	const { walletResult, isFetching } = useWallet();
	const { data: xlmWallet, isFetching: xlmWalletFetching } = useStellarWallet();
	const user = useAppSelector(s => s.user);
	const { mutateAsync: postTransaction, isPending } = usePostTransaction();
	const { removeItemFromCart } = useCart();
	const saleProps = useAppSelector(s => s.checkout.saleProps);
	const dispatch = useAppDispatch();

	const preparedPayload = {
		item: item._id,
		seller: item.user._id,
		buyer: user.userId,
		amount,
		type,
		rentalPeriod,
		metadata: {
			...saleProps,
			thirdPartyCheckup: false
		}
	};

	const walletBalance = useMemo(
		() => (walletResult?.data.balance || 0) - (walletResult?.data.pendingDebit || 0),
		[walletResult]
	);

	const [openModal, setOpenModal] = useState(false);

	const onPaystackSuccess = async ({ reference, status }: any) => {
		if (status === "success") {
			try {
				const res = await postTransaction({
					...preparedPayload,
					reference,
					method: PaymentMethod.Paystack
				});

				if (res.data) {
					toast.success("Request submitted");
					dispatch(resetCheckout());
					removeItemFromCart(item._id);
					setOpenModal(true);
				}
			} catch (error: any) {
				toast.error(
					error?.response?.data?.message ||
						"Could not complete transaction. Your funds will be deposited to wallet"
				);
			}
		}
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

	const payWithWallet = async () => {
		if (walletBalance < amount) {
			toast.error("Insufficient funds in wallet");
			return;
		}

		const res = await postTransaction({
			...preparedPayload,
			method: PaymentMethod.Wallet,
			reference: new Date().getTime().toString()
		});

		if (res.data) {
			toast.success("Request submitted");
			dispatch(resetCheckout());
			removeItemFromCart(item._id);
			setOpenModal(true);
		}
	};

	const handlePayment = async (type: "fiat" | "xlm" | "paystack") => {
		try {
			switch (type) {
				case "xlm":
					toast.error("Crypto payment via ramp will be supported soon!");
					break;
				case "fiat":
					payWithWallet();
					break;
				default:
					console.log("select a payment stype");
			}
		} catch (error: any) {
			toast.error(
				error?.data?.response?.message ||
					error?.message ||
					"An unexpected error occurred"
			);
		}
	};

	return (
		<div className={styles.container}>
			<HeaderSubText title="Choose payment option" variant="main" />
			<div className={styles.container__form_container}>
				<PaymentOption
					title="Pay from fiat wallet"
					balance={walletBalance}
					icon="/svgs/fiat-wallet.svg"
					isLoading={isFetching}
					hasBalance
					disabled={isPending || amount <= 0}
					onClick={() => handlePayment("fiat")}
				/>
				<PaymentOption
					title="Pay from XLM wallet"
					balance={xlmWallet?.xlmBalance}
					icon="/svgs/xlm-wallet.svg"
					isLoading={xlmWalletFetching}
					hasBalance
					onClick={() => handlePayment("xlm")}
				/>
				<PaystackPaymentButton {...paystackComponentProps} disabled={amount <= 0}>
					<PaymentOption
						title="Pay with paystack"
						icon="/svgs/paystack-wallet.svg"
					/>
				</PaystackPaymentButton>
			</div>
			<SuccessModal openModal={openModal} setOpenModal={setOpenModal} />
		</div>
	);
};

export default PaymentComp;

interface PaymentOptionsProps {
	readonly title: string;
	readonly balance?: string | number;
	readonly hasBalance?: boolean;
	readonly icon: string;
	readonly isLoading?: boolean;
	onClick?: () => void;
	disabled?: boolean;
}

function PaymentOption({
	title,
	balance,
	icon,
	hasBalance,
	isLoading,
	onClick,
	disabled
}: PaymentOptionsProps) {
	return (
		<div
			className={styles.payment_container}
			onClick={() => {
				if (disabled) return;

				onClick?.();
			}}
			aria-disabled={disabled}
		>
			<div className={styles.payment_container__left}>
				<Image src={icon} alt="icon-payment" height={30} width={30} />
				<div className={styles.name_amount}>
					<h2 className={styles.name}>{title}</h2>
					{hasBalance && (
						<div className={styles.balance_container}>
							Wallet balance:{" "}
							{Number(balance) >= 0 ? (
								<span className={styles.balance}>
									{formatNum(balance)}
								</span>
							) : isLoading ? (
								<SmallLoader />
							) : (
								""
							)}
						</div>
					)}
				</div>
			</div>
			<span className={styles.icon}>
				<ChevronIcon color="#A3A7AB" />
			</span>
		</div>
	);
}
