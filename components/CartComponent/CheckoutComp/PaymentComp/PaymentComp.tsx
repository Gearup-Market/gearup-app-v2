"use client";
import React, { useState } from "react";
import styles from "./PaymentComp.module.scss";
import { HeaderSubText } from "@/components/UserDashboard";
import Image from "next/image";
import { ChevronIcon } from "@/shared/svgs/dashboard";
import SuccessModal from "../SuccessModal/SuccessModal";

const PaymentComp = () => {
    const [openModal, setOpenModal] = useState(true);
	return (
		<div className={styles.container}>
			<HeaderSubText title="Choose payment option" variant="main" />
			<div className={styles.container__form_container}>
				<PaymentOption
					title="Pay from fiat wallet"
					balance={"$200"}
					icon="/svgs/fiat-wallet.svg"
				/>
				<PaymentOption
					title="Pay from XLM wallet"
					balance={"$350"}
					icon="/svgs/xlm-wallet.svg"
				/>
				<PaymentOption
					title="Pay with flutterwave"
					icon="/svgs/flutter-wallet.svg"
				/>
				<PaymentOption
					title="Pay with paystack"
					icon="/svgs/paystack-wallet.svg"
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
	readonly icon: string;
}

function PaymentOption({ title, balance, icon }: PaymentOptionsProps) {

	return (
		<div className={styles.payment_container}>
			<div className={styles.payment_container__left}>
				<Image src={icon} alt="icon-payment" height={30} width={30} />
				<div className={styles.name_amount}>
					<h2 className={styles.name}>{title}</h2>
					{!!balance && (
						<p className={styles.balance_container}>
							Wallet balance:{" "}
							<span className={styles.balance}>{balance}</span>
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
