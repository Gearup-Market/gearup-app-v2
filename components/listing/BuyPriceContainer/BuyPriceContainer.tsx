"use client";

import { useState } from "react";
import styles from "./BuyPriceContainer.module.scss";
import { addDays } from "date-fns";
import Image from "next/image";
import { Button, DatePicker, Logo, ToggleSwitch } from "@/shared";
import format from "date-fns/format";
import { Listing } from "@/store/slices/listingsSlice";
import { AppRoutes, formatNumber, getDaysDifference } from "@/utils";
import useCart from "@/hooks/useCart";
import { TransactionType } from "@/app/api/hooks/transactions/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { useAppSelector } from "@/store/configureStore";

const BuyPriceContainer = ({ listing }: { listing: Listing }) => {
	const { addItemToCart } = useCart();
	const search = useSearchParams();
	const actionType = search.get("type");
	const router = useRouter();
	const user = useAppSelector(state => state.user);
	const pathname = usePathname();
	const [isDateSelected, setIsDateSelected] = useState<boolean>(false);
	const [inputDate, setInputDate] = useState([
		{
			startDate: new Date(),
			endDate: addDays(new Date(), 1),
			key: "selection"
		}
	]);
	const { productName, offer, listingType } = listing;

	const currency = offer.forSell?.currency;
	const pricing = offer.forSell?.pricing;
	const transactionType =
		["sell", "buy"].includes(actionType!) || listingType !== "rent"
			? TransactionType.Sale
			: TransactionType.Rental;

	const handleAddToCart = () => {
		if (transactionType === TransactionType.Rental) {
			const daysDifference = getDaysDifference(
				inputDate[0].startDate,
				inputDate[0].endDate
			);
			if (daysDifference < 1) {
				toast.error("Minimum rent duration is 0");
				return;
			}
		}
		try {
			addItemToCart({
				listing,
				type: transactionType,
				rentalPeriod:
					transactionType === TransactionType.Rental
						? {
								start: inputDate[0].startDate,
								end: inputDate[0].endDate
						  }
						: undefined
			});
		} catch (error) {
			console.log(error);
		}
	};

	const goToChat = () => {
		router.push(
			user.isAuthenticated
				? `${AppRoutes.userDashboard.messages}?participantId=${listing.user?._id}&listingId=${listing?._id}`
				: `/login?returnUrl=${pathname}`
		);
	};


	return (
		<div className={styles.container}>
			<div className={styles.price_card}>
				<div className={styles.card_header}>
					<div className={styles.text} style={{ marginBottom: "1.6rem" }}>
						<h2>{productName}</h2>
					</div>
					<div className={styles.text}>
						<h1>
							{currency}
							{formatNumber(pricing || 0)}
						</h1>
					</div>
					<div className={styles.third_party_container}>
						<span className={styles.flex_items}>
							<Image
								src="/svgs/shield.svg"
								alt="shield-icon"
								height={40}
								width={40}
							/>
							<p>Add Gearup third party check</p>
						</span>
						<span className={styles.flex_items}>
							<h3 className={styles.amount}>
								{currency}
								{formatNumber(pricing || 0)}
							</h3>
							<ToggleSwitch />
						</span>
					</div>
				</div>
				<div className={styles.buttons}>
					<Button className={styles.button} onClick={handleAddToCart}>
						Add to cart
					</Button>
					<Button
						buttonType="secondary"
						className={styles.button}
						onClick={goToChat}
					>
						Make an offer
					</Button>
					<Button
						buttonType="transparent"
						className={`${styles.button} ${styles.ask_question}`}
						onClick={goToChat}
					>
						Ask a question
					</Button>
				</div>
			</div>
			<div className={styles.additional_offers_container}>
				<h2 className={styles.title}>Additional offers</h2>
				<ul className={styles.offers_container}>
					{additionalOffers.map(item => (
						<li key={item.id} className={styles.offer}>
							<Image
								src={item.icon}
								alt={item.name}
								height={40}
								width={40}
							/>
							<h3>{item.name}</h3>
							{!!item.link && <Link href={item.link}>Learn more</Link>}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default BuyPriceContainer;

const additionalOffers = [
	{
		id: 1,
		name: "Free gearup buyer’s protection",
		icon: "/svgs/ad_protection_icon.svg",
		link: "/policy"
	},
	{
		id: 2,
		name: "48 hours return policy Learn more",
		icon: "/svgs/ad_return_icon.svg",
		link: "/policy"
	},
	{
		id: 3,
		name: "Accept local pickup",
		icon: "/svgs/ad_pickup_icon.svg",
		link: ""
	},
	{
		id: 4,
		name: "Make an offer",
		icon: "/svgs/ad_make_offer_icon.svg",
		link: ""
	}
];
