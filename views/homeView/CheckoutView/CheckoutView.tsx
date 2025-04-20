"use client";
import React, { useEffect, useState } from "react";
import styles from "./CheckoutView.module.scss";
import { BackNavigation, InputField } from "@/shared";
import { usePathname, useRouter } from "next/navigation";
import ShippingAddress from "@/components/CartComponent/CheckoutComp/ShippingAddress/ShippingAddress";
import ShippingType from "@/components/CartComponent/CheckoutComp/ShippingType/ShippingType";
import ThirdPartyCheck from "@/components/CartComponent/CheckoutComp/ThirdPartyCheck/ThirdPartyCheck";
import { useAppSelector } from "@/store/configureStore";
import { TransactionType } from "@/app/api/hooks/transactions/types";
import { useAuth } from "@/contexts/AuthContext";
import dynamic from "next/dynamic";
import { useGetAllPricings } from "@/app/api/hooks/Admin/pricing";
import { updateCheckout } from "@/store/slices/checkoutSlice";
import { isListing } from "@/components/CartComponent/CartItems/CartItems";
import { formatNum } from "@/utils";
import { useAppDispatch } from "@/store/configureStore";
const PaymentComp = dynamic(
	() => import("@/components/CartComponent/CheckoutComp").then(mod => mod.PaymentComp),
	{ ssr: false }
);

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
	const { data: allPricings } = useGetAllPricings();
	const { isAuthenticated } = useAuth();
	const pathname = usePathname();
	const { userId } = useAppSelector(s => s.user);
	const { checkout } = useAppSelector(s => s.checkout);
	const dispatch = useAppDispatch();
	const [step, setStep] = useState(1);

	const nextStep = (e: any, skip: boolean = false) => {
		setStep(prev => prev + (skip ? 2 : 1));
	};

	const prevStep = () => {
		setStep(prev => prev - 1);
	};

	useEffect(() => {
		if (!checkout) {
			router.back();
		}
		if (checkout?.listingModelType === "Course") {
			setStep(4);
		}
	}, []);

	const handleSharesChange = (e: any) => {
		if (!checkout || !checkout.item) return;

		dispatch(
			updateCheckout({
				checkout: {
					...checkout,
					amount: e.target.value
				}
			})
		);
	};

	const maxSharePurchase = isListing(checkout?.item, "Listing")
		? (checkout?.item.maxSharePurchase! / 100) * checkout?.item.totalShares!
		: 0;

	const reservedShares = isListing(checkout?.item, "Listing")
		? (checkout?.item.reservedShares! / 100) * checkout?.item.totalShares!
		: 0;

	const soldShares = isListing(checkout?.item, "Listing")
		? (() => {
				const listing = checkout?.item;
				return (
					listing.ownersList
						?.filter(owner => owner.ownerId !== listing.user?._id)
						.reduce((acc, item) => acc + item.share, 0) || 0
				);
		  })()
		: 0;

	const availableShares = isListing(checkout?.item, "Listing")
		? checkout?.item.totalShares! - soldShares - reservedShares
		: 0;

	// useEffect(() => {
	// 	if (!isAuthenticated || !userId) router.push(`/login?returnUrl=${pathname}`);
	// }, [isAuthenticated]);

	return (
		<div className={styles.container}>
			<div className={styles.body}>
				<BackNavigation />
				{checkout?.type === TransactionType.Rental && (
					<PaymentComp
						item={checkout.item}
						amount={checkout.amount}
						type={checkout.type}
						rentalBreakdown={checkout.rentalBreakdown}
						listingModelType={checkout.listingModelType}
					/>
				)}
				<div>
					{checkout?.type === TransactionType.Sale && (
						<>
							{checkout?.listingModelType !== "Course" && (
								<ul className={styles.timeline_container}>
									{buyTimeline.map(item => (
										<div
											key={item.id}
											className={styles.item_container}
										>
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
							)}
							<>
								{step === 1 && (
									<ThirdPartyCheck
										thirdPartyPricing={
											allPricings?.thirdPartyPricing || 0
										}
										handleNext={nextStep}
									/>
								)}
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
										listingModelType={checkout.listingModelType}
									/>
								)}
							</>
						</>
					)}
				</div>
				{checkout?.type === TransactionType.Shares && (
					<div className={styles.shares_container}>
						<div className={styles.shares_details}>
							<div className={styles.shares_details_item}>
								<h3>Total shares</h3>
								<p>
									{formatNum(
										isListing(checkout.item, "Listing")
											? checkout.item.totalShares
											: 0
									)}
								</p>
							</div>
							<div className={styles.shares_details_item}>
								<h3>Available shares</h3>
								<p>{formatNum(availableShares)}</p>
							</div>
							<div className={styles.shares_details_item}>
								<h3>Max purchaseable shares</h3>
								<p>{formatNum(maxSharePurchase)}</p>
							</div>
						</div>
						<InputField
							label="Amount of shares to buy"
							min={0}
							value={checkout.amount}
							max={maxSharePurchase}
							type="number"
							onChange={handleSharesChange}
						/>
						<PaymentComp
							item={checkout.item}
							amount={checkout.amount}
							type={checkout.type}
							listingModelType={checkout.listingModelType}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default CheckoutView;
