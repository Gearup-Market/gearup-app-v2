"use client";
import React, { useState } from "react";
import styles from "./CartItemCard.module.scss";
import { Button, CustomImage } from "@/shared";
import Image from "next/image";
import { CartItem, TransactionType } from "@/app/api/hooks/transactions/types";
import { useAppDispatch } from "@/store/configureStore";
import { updateCheckout } from "@/store/slices/checkoutSlice";
import { useRouter } from "next/navigation";
import { calculateItemPrice } from "@/utils";

interface CartItemCardContainerProps {
	mainHeaderImage?: string;
	name?: string;
	children?: React.ReactNode;
	handleDeleteItem: (id: string) => void;
	id: string;
	type: TransactionType;
	item: CartItem;
	amount: number;
}

const CartItemCardContainer = ({
	mainHeaderImage,
	id,
	name,
	handleDeleteItem,
	children,
	type,
	item,
	amount
}: CartItemCardContainerProps) => {
	const [showDetails, setShowDetails] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const router = useRouter();
	// const amount = calculateItemPrice(item)
	const placeOrder = () => {
		dispatch(
			updateCheckout({
				checkout: {
					item: item.listing,
					type,
					amount: amount || 0,
					rentalPeriod: item.rentalPeriod
				}
			})
		);
		router.push("/checkout");
	};

	return (
		<div className={styles.cart_item_card}>
			<div className={styles.container}>
				<div className={styles.container__header}>
					<div className={styles.container__header__left}>
						<div className={styles.avatar}>
							<CustomImage
								src={mainHeaderImage || "/images/admin-img.jpg"}
								alt={name || "custom-image"}
								fill
							/>
						</div>
						<div className={styles.container__header__left__name_amount}>
							<p className={styles.name}>{name}</p>
						</div>
					</div>
					<span
						className={styles.container__header__icon}
						data-rotate={showDetails}
						onClick={() => setShowDetails(prev => !prev)}
					>
						<Image
							src={"/svgs/chevron.svg"}
							alt={"toggle-icon"}
							width={16}
							height={16}
						/>
					</span>
				</div>
				{showDetails && (
					<div className={styles.container__body} data-show={showDetails}>
						{children}
						<div className={styles.buttons_container}>
							<Button
								className={styles.place_btn}
								iconSuffix="/svgs/arrow-right2.svg"
								onClick={placeOrder}
							>
								Place order
							</Button>
							<Button
								buttonType="transparent"
								className={styles.delete_btn}
								iconPrefix="/svgs/red-trash.svg"
								onClick={() => handleDeleteItem(id)}
							>
								Remove
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default CartItemCardContainer;
