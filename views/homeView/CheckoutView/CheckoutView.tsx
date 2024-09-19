"use client";
import React, { useState } from "react";
import styles from "./CheckoutView.module.scss";
import { BackNavigation } from "@/shared";
import { useSearchParams } from "next/navigation";
import { PaymentComp } from "@/components/CartComponent/CheckoutComp";
import ShippingAddress from "@/components/CartComponent/CheckoutComp/ShippingAddress/ShippingAddress";
import ShippingType from "@/components/CartComponent/CheckoutComp/ShippingType/ShippingType";
import ThirdPartyCheck from "@/components/CartComponent/CheckoutComp/ThirdPartyCheck/ThirdPartyCheck";

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
	const searchParams = useSearchParams();
	const type = searchParams.get("type");
	const [step, setStep] = useState(1);

	const nextStep = () => {
		setStep(prev => prev + 1);
	};

	const prevStep = () => {
		setStep(prev => prev + 1);
	};

	return (
		<div className={styles.container}>
			<div className={styles.body}>
				<BackNavigation />
				{(type === "rental" || type === "course") && <PaymentComp />}
				<div>
					{type === "gear-sale" && (
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
								{step === 4 && <PaymentComp />}
							</>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default CheckoutView;
