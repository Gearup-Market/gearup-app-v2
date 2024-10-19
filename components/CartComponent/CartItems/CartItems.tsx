"use client";
import React from "react";
import styles from "./CartItems.module.scss";
import CartItemCardContainer from "../CartItemCard/CartItemCard";
import { CustomImage, Ratings } from "@/shared";
import useCart from "@/hooks/useCart";
import { CartItem, TransactionType } from "@/app/api/hooks/transactions/types";
import EmptyCart from "../EmptyCart/EmptyCart";
import { calculateItemPrice, formatNum, getDaysDifference } from "@/utils";
import toast from "react-hot-toast";

const CartItems = () => {
	const { getCartItems, removeItemFromCart } = useCart();
	const cartItems = getCartItems();

	// if (!cartItems) return null;

	const handleDeleteItem = async (id: string) => {
		const res = await removeItemFromCart(id);
		if (res) toast.success("Item removed from cart");
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
								>
									<RentalComp item={item} />
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
								>
									<GearSaleComp item={item} />
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

const RentalComp = ({ item }: { item: CartItem }) => {
	const price = calculateItemPrice(item)
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
			{/* <div className={styles.summary_item}>
				<h4>Gearup service fee</h4>
				<p>$400.0</p>
			</div> */}
			<div className={styles.summary_item}>
				<h4>Duration</h4>
				<p>{getDaysDifference(item.rentalPeriod?.start, item.rentalPeriod?.end)} days</p>
			</div>
			<div className={`${styles.summary_item} ${styles.total_amount}`}>
				<h4>Total</h4>
				<p>NGN {formatNum(price)}</p>
			</div>
		</div>
	);
};

const GearSaleComp = ({ item }: { item: CartItem }) => {
	const price = item.listing?.offer?.forSell?.pricing;
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
			{/* <div className={styles.summary_item}>
				<h4>Gearup service fee</h4>
				<p>$400.0</p>
			</div>
			<div className={styles.summary_item}>
				<h4>VAT</h4>
				<p>10 days</p>
			</div> */}
			<div className={`${styles.summary_item} ${styles.total_amount}`}>
				<h4>Total</h4>
				<p>NGN {formatNum(price)}</p>
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
