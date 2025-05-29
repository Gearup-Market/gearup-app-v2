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
import { RentalBreakdown } from "@/app/api/hooks/transactions/types";
import { resetCheckout } from "@/store/slices/checkoutSlice";
import useCart from "@/hooks/useCart";
import { Button, PaystackPaymentButton } from "@/shared";
import { PaystackProps } from "react-paystack/dist/types";
import { formatNum } from "@/utils";
import { useRouter } from "next/navigation";
import { Course } from "@/store/slices/coursesSlice";
import { isListing } from "../../CartItems/CartItems";
import { useGetOffRampRates, usePostOffRampPayment } from "@/app/api/hooks/wallets";
import Modal from "@/shared/modals/modal/Modal";
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
	rentalBreakdown,
	listingModelType
}: {
	item: Listing | Course;
	amount: number;
	type: string;
	rentalBreakdown?: RentalBreakdown[];
	listingModelType: string;
}) => {
	const { walletResult, isFetching } = useWallet();
	const {
		data: xlmWallet,
		isFetching: xlmWalletFetching,
		refetch: refetchXlmWallet
	} = useStellarWallet();
	const router = useRouter();
	const user = useAppSelector(s => s.user);
	const { mutateAsync: postTransaction, isPending } = usePostTransaction();
	const { mutateAsync: postOffRampPayment, isPending: isPostingOffRampPayment } =
		usePostOffRampPayment();
	const { removeItemFromCart } = useCart();
	const saleProps = useAppSelector(s => s.checkout.saleProps);
	const dispatch = useAppDispatch();

	const preparedPayload = {
		item: item._id,
		seller: isListing(item, listingModelType as string)
			? (item as Listing).user._id
			: (item as Course).author._id,
		buyer: user.userId,
		amount,
		type,
		rentalBreakdown,
		itemType: listingModelType,
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
	const [openOffRampModal, setOpenOffRampModal] = useState(false);

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
					router.push("/user/dashboard");
					removeItemFromCart(item._id as string);
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
			// currency: "₦",
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
		try {
			const res = await postTransaction({
				...preparedPayload,
				method: PaymentMethod.Wallet,
				reference: new Date().getTime().toString()
			});

			if (res.data) {
				toast.success("Request submitted");
				dispatch(resetCheckout());
				router.push("/user/dashboard");
				removeItemFromCart(item._id as string);
				setOpenModal(true);
			}
		} catch (error: any) {
			toast.error(
				error?.response?.data?.message ||
					error?.message ||
					"An unexpected error occurred"
			);
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

	const handleOffRampPayment = async (amountInUSDC: number) => {
		try {
			if (amountInUSDC < 20) {
				toast.error("Minimum order amount is 20USDC");
				return;
			}
			const res = await postOffRampPayment({
				userId: user.userId,
				amount: amountInUSDC.toFixed(3)
			});
			if (res.data) {
				const res = await postTransaction({
					...preparedPayload,
					reference: new Date().getTime().toString(),
					method: PaymentMethod.XLM
				});
				if (res.data) {
					toast.success("Request submitted successfully");
					refetchXlmWallet();
					dispatch(resetCheckout());
					router.push("/user/dashboard");
					removeItemFromCart(item._id as string);
					setOpenModal(false);
				}
			}
		} catch (error: any) {
			toast.error(
				error?.response?.data?.message ||
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
					title="Pay with Stellar USDC"
					balance={xlmWallet?.usdcBalance}
					icon="/svgs/xlm-wallet.svg"
					isLoading={xlmWalletFetching}
					hasBalance
					onClick={() => setOpenOffRampModal(true)}
				/>
				<PaystackPaymentButton {...paystackComponentProps} disabled={amount <= 0}>
					<PaymentOption
						title="Pay with paystack"
						icon="/svgs/paystack-wallet.svg"
					/>
				</PaystackPaymentButton>
			</div>
			<SuccessModal openModal={openModal} setOpenModal={setOpenModal} />
			{openOffRampModal && (
				<OffRampModal
					openModal={openOffRampModal}
					setOpenModal={setOpenOffRampModal}
					amount={amount}
					handleOffRampPayment={handleOffRampPayment}
					isPostingOffRampPayment={isPostingOffRampPayment}
				/>
			)}
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

function OffRampModal({
	openModal,
	setOpenModal,
	amount,
	handleOffRampPayment,
	isPostingOffRampPayment
}: {
	openModal: boolean;
	setOpenModal: (openModal: boolean) => void;
	amount: number;
	handleOffRampPayment: (amountInUSDC: number) => void;
	isPostingOffRampPayment: boolean;
}) {
	const { data: offRates } = useGetOffRampRates();
	const rate = offRates?.data.USDCNGN;
	const amountInUSDC = amount / rate;

	return (
		<Modal
			openModal={openModal}
			setOpenModal={setOpenModal}
			title="OffRamp"
			className={styles.modal}
		>
			<div className={styles.warning_container}>
				<span className={styles.icon}>
					<Image src="/svgs/warningIcon.svg" alt="" height={16} width={16} />
				</span>
				<p>
					Note: Mininum order amount is{" "}
					<span className={styles.bold_text}>20USDC.</span> It may take up to{" "}
					<span className={styles.bold_text}>20mins</span> before the off
					ramping transaction is completed
				</p>
			</div>
			<div className={styles.details}>
				<p>USDC/NGN rate:</p>
				<h3>₦{formatNum(rate || 0)}</h3>
			</div>
			<Button
				className={styles.button}
				onClick={() => handleOffRampPayment(amountInUSDC)}
				disabled={isPostingOffRampPayment}
			>
				Pay {formatNum(amountInUSDC || 0, true, 3)} USDC
			</Button>
		</Modal>
	);
}
