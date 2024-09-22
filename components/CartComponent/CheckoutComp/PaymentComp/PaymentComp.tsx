"use client";
import React, { useState } from "react";
import styles from "./PaymentComp.module.scss";
import { HeaderSubText } from "@/components/UserDashboard";
import Image from "next/image";
import { ChevronIcon } from "@/shared/svgs/dashboard";
import SuccessModal from "../SuccessModal/SuccessModal";
import { Listing } from "@/store/slices/listingsSlice";
import { useStellarWallet, useWallet } from "@/hooks";
import { SmallLoader } from "@/shared/loaders";
import { usePaystackPayment } from "react-paystack";
import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import toast from "react-hot-toast";
import { usePostTransaction } from "@/app/api/hooks/transactions";
import { RentalPeriod } from "@/app/api/hooks/transactions/types";
import { resetCheckout } from "@/store/slices/checkoutSlice";
import useCart from "@/hooks/useCart";

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
	const { mutateAsync: postTransaction } = usePostTransaction();
	const { removeItemFromCart } = useCart();
	const initializePayment = usePaystackPayment(paystackConfig);
	const dispatch = useAppDispatch();

	const preparedPayload = {
		item: item._id,
		seller: item.user._id,
		buyer: user.userId,
		amount,
		type,
		rentalPeriod
	};

	const [openModal, setOpenModal] = useState(false);

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

	const onPaystackSuccess = async ({reference, status}: any) => {
		if(status === 'success') {
			setTimeout(async function(){
				try {
					const res = await postTransaction({
						...preparedPayload,
						reference,
						method: PaymentMethod.Paystack
					});
			
					if (res.data) {
						console.log(res.data, "res.data");
						toast.success("Item submitted");
						dispatch(resetCheckout())
						removeItemFromCart(item._id);
					}
				} catch (error) {
					
				}
			}, 10000)
		}
	};

	const onClosePaymentModal = () => {
		toast.error("Paystack modal closed");
	};

	const handlePayment = async (type: "fiat" | "xlm" | "paystack") => {
		try {
			if (type === "paystack") {
				onClickPaystack();
			} else if (type === "xlm") {
				toast.error("Crypto payment will be supported soon!");
			} else {
				if(!walletResult?.data.balance || walletResult?.data.balance  < amount) {
					toast.error("Insufficient funds in wallet");
					return;
				}

				const res = await postTransaction({
					...preparedPayload,
					method: PaymentMethod.Wallet
				});
		
				if (res.data) {
					console.log(res.data, "res.data");
					toast.success("Item submitted");
					dispatch(resetCheckout())
					removeItemFromCart(item._id);
				}
			}
		} catch (error: any) {
			toast.error(error?.data?.response?.message || error?.message)
		}
	};

	return (
		<div className={styles.container}>
			<HeaderSubText title="Choose payment option" variant="main" />
			<div className={styles.container__form_container}>
				<PaymentOption
					title="Pay from fiat wallet"
					balance={walletResult?.data.balance}
					icon="/svgs/fiat-wallet.svg"
					isLoading={isFetching}
					hasBalance
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
				<PaymentOption
					title="Pay with paystack"
					icon="/svgs/paystack-wallet.svg"
					onClick={() => handlePayment("paystack")}
				/>
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
	onClick: () => void;
}

function PaymentOption({
	title,
	balance,
	icon,
	hasBalance,
	isLoading,
	onClick
}: PaymentOptionsProps) {
	return (
		<div className={styles.payment_container} onClick={onClick}>
			<div className={styles.payment_container__left}>
				<Image src={icon} alt="icon-payment" height={30} width={30} />
				<div className={styles.name_amount}>
					<h2 className={styles.name}>{title}</h2>
					{hasBalance && (
						<p className={styles.balance_container}>
							Wallet balance:{" "}
							<span className={styles.balance}>
								{isLoading ? <SmallLoader /> : balance}
							</span>
						</p>
					)}
				</div>
			</div>
			<span className={styles.icon}>
				<ChevronIcon color="#A3A7AB" />
			</span>
		</div>
	);
}
