"use client";
import React, { useEffect, useState } from "react";
import styles from "./CheckoutView.module.scss";
import { BackNavigation } from "@/shared";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ShippingAddress from "@/components/CartComponent/CheckoutComp/ShippingAddress/ShippingAddress";
import ShippingType from "@/components/CartComponent/CheckoutComp/ShippingType/ShippingType";
import ThirdPartyCheck from "@/components/CartComponent/CheckoutComp/ThirdPartyCheck/ThirdPartyCheck";
import { useAppSelector } from "@/store/configureStore";
import { TransactionType } from "@/app/api/hooks/transactions/types";
import { useStellarWallet, useWallet } from "@/hooks";
import { useAuth } from "@/contexts/AuthContext";
import dynamic from 'next/dynamic';

const PaymentComp = dynamic(() => import('@/components/CartComponent/CheckoutComp').then(mod => mod.PaymentComp), { ssr: false });

enum BuyTimeLineEnum {
	THIRD_PARTY_CHECK = "THIRD_PARTY_CHECK",
	SHIPPING_TYPE = "SHIPPING_TYPE",
	SHIPPING_ADDRESS = "SHIPPING_ADDRESS",
	PAYMENT = "PAYMENT"
}

const buyTimeline = [
	{
		id: 1,
		name: "Third party check",
		value: BuyTimeLineEnum.THIRD_PARTY_CHECK
	},
	{
		id: 2,
		name: "Shipping type",
		value: BuyTimeLineEnum.SHIPPING_TYPE
	},
	{
		id: 3,
		name: "Shipping address",
		value: BuyTimeLineEnum.SHIPPING_ADDRESS
	},
	{
		id: 4,
		name: "Payment",
		value: BuyTimeLineEnum.PAYMENT
	}
];

const CheckoutView = () => {
	const router = useRouter();
	const { isAuthenticated } = useAuth();
	const pathname = usePathname();
	const { userId } = useAppSelector(s => s.user);
	const { checkout } = useAppSelector(s => s.checkout);
	const [step, setStep] = useState(1);

	const nextStep = () => {
		setStep(prev => prev + 1);
	};

	const prevStep = () => {
		setStep(prev => prev + 1);
	};

	useEffect(() => {
		if (!checkout) {
			router.back();
		}
	}, []);

	useEffect(() => {
		if (!isAuthenticated || !userId) router.push(`/login?returnUrl=${pathname}`);
	}, [isAuthenticated]);

	return (
		<div className={styles.container}>
			<div className={styles.body}>
				<BackNavigation />
				{checkout?.type === TransactionType.Rental && (
					<PaymentComp
						item={checkout.item}
						amount={checkout.amount}
						type={checkout.type}
						rentalPeriod={checkout.rentalPeriod}
					/>
				)}
				<div>
					{checkout?.type === TransactionType.Sale && (
						<>
							<ul className={styles.timeline_container}>
								{buyTimeline.map(item => (
									<div key={item.id} className={styles.item_container}>
										<div className={styles.id_line_container}>
											<span
												className={styles.id_container}
												data-active={step >= item.id}
											>
												{item.id}
											</span>
											{item.id != buyTimeline.length && (
												<span
													className={styles.id_line}
													data-active={step >= item.id}
												></span>
											)}
										</div>
										<h3 className={styles.name}>{item.name}</h3>
									</div>
								))}
							</ul>
							<>
								{step === 1 && <ThirdPartyCheck handleNext={nextStep} />}
								{step === 2 && (
									<ShippingType
										handleNext={nextStep}
										handlePrev={prevStep}
									/>
								)}
								{step === 3 && (
									<ShippingAddress
										handleNext={nextStep}
										handlePrev={prevStep}
									/>
								)}
								{step === 4 && (
									<PaymentComp
										item={checkout.item}
										amount={checkout.amount}
										type={checkout.type}
									/>
								)}
							</>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default CheckoutView;
