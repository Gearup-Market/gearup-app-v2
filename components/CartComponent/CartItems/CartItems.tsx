"use client";
import React from "react";
import styles from "./CartItems.module.scss";
import CartItemCardContainer from "../CartItemCard/CartItemCard";
import { CustomImage, Ratings } from "@/shared";
import useCart from "@/hooks/useCart";
import { CartItem, TransactionType } from "@/app/api/hooks/transactions/types";
import EmptyCart from "../EmptyCart/EmptyCart";
import {
	calculateItemPrice,
	formatNum,
	getApplicableRate,
	getDaysDifference,
	getLastRentalDate
} from "@/utils";
import toast from "react-hot-toast";
import { useGetAllPricings } from "@/app/api/hooks/Admin/pricing";
import { PricingData } from "@/app/api/hooks/Admin/pricing/types";

const CartItems = () => {
	const { getCartItems, removeItemFromCart, refetchcartItems } = useCart();
	const { data: allPricings } = useGetAllPricings();
	const cartItems = getCartItems();

	const calculateItemTotal = (listingId: string): number => {
		if (!cartItems?.items || !allPricings) return 0;

		const item = cartItems.items.find(item => item.listing._id === listingId);
		if (!item) return 0;

		const basePrice =
			(item.type === TransactionType.Sale
				? item.listing?.offer?.forSell?.pricing
				: calculateItemPrice(item)) || 0;

		const vat = (allPricings.valueAddedTax! / 100) * basePrice;
		const serviceFee =
			((item.type === TransactionType.Sale
				? allPricings.gearBuyerFee!
				: allPricings.gearLeaseFee!) /
				100) *
			basePrice;

		return basePrice + serviceFee + vat;
	};

	// if (!cartItems) return null;

	const handleDeleteItem = async (id: string) => {
		const res = await removeItemFromCart(id);
		if (res) {
			toast.success("Item removed from cart");
			refetchcartItems();
		}
	};

	return (
		<div className={styles.container}>
			{!cartItems?.items.length ? (
				<EmptyCart />
			) : (
				<>
					{cartItems?.items.map((item, index) => {
						if (item.type === TransactionType.Rental) {
							return (
								<CartItemCardContainer
									item={item}
									key={index}
									name={item?.listing?.productName}
									handleDeleteItem={handleDeleteItem}
									type={item?.type}
									id={item?.listing?._id}
									mainHeaderImage={item?.listing.listingPhotos[0]}
									amount={calculateItemTotal(item?.listing?._id)}
								>
									<RentalComp
										allPricings={allPricings as PricingData}
										item={item}
									/>
								</CartItemCardContainer>
							);
						}
						if (item.type === TransactionType.Sale) {
							return (
								<CartItemCardContainer
									item={item}
									key={index}
									name={item?.listing?.productName}
									handleDeleteItem={handleDeleteItem}
									type={item?.type}
									id={item?.listing?._id}
									mainHeaderImage={item?.listing.listingPhotos[0]}
									amount={calculateItemTotal(item?.listing?._id)}
								>
									<GearSaleComp
										allPricings={allPricings as PricingData}
										item={item}
									/>
								</CartItemCardContainer>
							);
						}
					})}
				</>
			)}
		</div>
	);
};

export default CartItems;

const RentalComp = ({
	item,
	allPricings
}: {
	item: CartItem;
	allPricings: PricingData;
}) => {
	const price = calculateItemPrice(item);
	const { offer } = item.listing;
	const startDate: Date = new Date(item.rentalBreakdown[0].date);
	const endDate = new Date(getLastRentalDate(item.rentalBreakdown));
	const timeDiff = endDate.getTime() - startDate.getTime();

	const durationInDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
	const durationInHours = item.rentalBreakdown.reduce(
		(total, period) => total + period.quantity,
		0
	);
	const { appliedRate } = getApplicableRate(
		offer,
		offer.forRent?.rates[0].duration === "hour" ? durationInHours : durationInDays,
		offer.forRent?.rates[0].duration as string
	);

	const vat = (allPricings?.valueAddedTax! / 100) * price;
	const serviceFee = (allPricings?.gearLeaseFee! / 100) * price;

	const total = price + serviceFee + vat;
	return (
		<div>
			<div className={styles.summary_item}>
				<h4>Author</h4>
				<div className={styles.owner}>
					<div className={styles.image}>
						{item.listing?.user?.avatar && (
							<CustomImage
								height={40}
								width={50}
								src={item?.listing?.user?.avatar}
								alt="owner"
							/>
						)}
					</div>
					<p>{item.listing?.user?.name || item.listing?.user?.userName}</p>
					<Ratings rating={item?.listing?.averageRating || 0} readOnly />
				</div>
			</div>
			<div className={styles.summary_item}>
				<h4>Type</h4>
				<p className={styles.type}>{item?.type}</p>
			</div>
			<div className={styles.summary_item}>
				<h4>Duration</h4>
				<p>
					{/* {getDaysDifference(
						item.rentalBreakdown[0].date,
						getLastRentalDate(item.rentalBreakdown)
					)}{" "} */}
					{offer.forRent?.rates[0].duration === "hour"
						? durationInHours
						: durationInDays}{" "}
					{item.rentalBreakdown[0].duration}(s)
				</p>
			</div>
			<div className={styles.summary_item}>
				<h4>
					Rental price {item.rentalBreakdown[0].duration}s{" "}
					{` (${
						offer.forRent?.rates[0].duration === "hour"
							? durationInHours
							: durationInDays
					} ${appliedRate?.duration}${
						(appliedRate?.quantity as number) > 1 ? "s offer" : ""
					})`}
				</h4>
				<p>
					₦{" "}
					{formatNum(
						appliedRate?.price! *
							(offer.forRent?.rates[0].duration === "hour"
								? durationInHours
								: durationInDays)
					)}
				</p>
			</div>

			<div className={styles.summary_item}>
				<h4>Gearup service fee:</h4>
				<p>₦ {formatNum(serviceFee)}</p>
			</div>
			<div className={styles.summary_item}>
				<h4>VAT:</h4>
				<p>₦ {formatNum(vat)}</p>
			</div>
			<div className={`${styles.summary_item} ${styles.total_amount}`}>
				<h4>Total:</h4>
				<p>₦ {formatNum(total)}</p>
			</div>
		</div>
	);
};

const GearSaleComp = ({
	item,
	allPricings
}: {
	item: CartItem;
	allPricings: PricingData;
}) => {
	const price = item.listing?.offer?.forSell?.pricing as number;

	const vat = (allPricings?.valueAddedTax! / 100) * price;
	const serviceFee = (allPricings?.gearBuyerFee! / 100) * price;

	const total = price + serviceFee + vat;
	return (
		<div>
			<div className={styles.summary_item}>
				<h4>Author</h4>
				<div className={styles.owner}>
					<div className={styles.image}>
						{item.listing?.user?.avatar && (
							<CustomImage
								height={40}
								width={50}
								src={item?.listing?.user?.avatar}
								alt="owner"
							/>
						)}
					</div>
					<p>{item.listing?.user?.name || item.listing?.user?.userName}</p>
					<Ratings rating={item?.listing?.averageRating || 0} readOnly />
				</div>
			</div>
			<div className={styles.summary_item}>
				<h4>Type</h4>
				<p className={styles.type}>{item?.type}</p>
			</div>
			<div className={styles.summary_item}>
				<h4>Price:</h4>
				<p>₦ {formatNum(price)}</p>
			</div>
			<div className={styles.summary_item}>
				<h4>Gearup service fee:</h4>
				<p>₦ {formatNum(serviceFee)}</p>
			</div>
			<div className={styles.summary_item}>
				<h4>VAT:</h4>
				<p>₦ {formatNum(vat)}</p>
			</div>
			<div className={`${styles.summary_item} ${styles.total_amount}`}>
				<h4>Total</h4>
				<p>₦ {formatNum(total)}</p>
			</div>
		</div>
	);
};

const CourseComp = ({ item }: any) => {
	return (
		<div>
			<div className={styles.summary_item}>
				<h4>Author</h4>
				<div className={styles.owner}>
					<div className={styles.image}>
						<CustomImage
							height={40}
							width={50}
							src={item?.lender?.image}
							alt="owner"
						/>
					</div>
					<p>{item.lender.name}</p>
					<Ratings rating={item?.lender?.rating} />
				</div>
			</div>
			<div className={styles.summary_item}>
				<h4>Type</h4>
				<p className={styles.type}>{item.type}</p>
			</div>
			<div className={styles.summary_item}>
				<h4>Gearup service fee</h4>
				<p>$400.0</p>
			</div>
			<div className={styles.summary_item}>
				<h4>VAT</h4>
				<p>10 days</p>
			</div>
			<div className={`${styles.summary_item} ${styles.total_amount}`}>
				<h4>Total</h4>
				<p>$400.0</p>
			</div>
		</div>
	);
};
