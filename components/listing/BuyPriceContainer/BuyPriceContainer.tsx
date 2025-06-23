"use client";

import { useState } from "react";
import styles from "./BuyPriceContainer.module.scss";
import { addDays } from "date-fns";
import Image from "next/image";
import { Button, ToggleSwitch } from "@/shared";
import { Listing } from "@/store/slices/listingsSlice";
import { AppRoutes, formatNumber } from "@/utils";
import useCart from "@/hooks/useCart";
import { TransactionType } from "@/app/api/hooks/transactions/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/store/configureStore";
import { PricingData } from "@/app/api/hooks/Admin/pricing/types";
import { updateCheckout } from "@/store/slices/checkoutSlice";

const BuyPriceContainer = ({
	listing,
	allPricings
}: {
	listing: Listing;
	allPricings?: PricingData;
}) => {
	const { addItemToCart } = useCart();
	const search = useSearchParams();
	const actionType = search.get("type");
	const router = useRouter();
	const user = useAppSelector(state => state.user);
	const dispatch = useAppDispatch();
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
	const pricing = offer.forSell?.pricing || 0;

	const vat = (allPricings?.valueAddedTax! / 100) * pricing || 0;
	const serviceFee = (allPricings?.gearBuyerFee! / 100) * pricing || 0;

	const total = pricing + serviceFee + vat;
	const transactionType =
		["sell", "buy"].includes(actionType!) || listingType !== "rent"
			? TransactionType.Sale
			: TransactionType.Rental;

	const handleAddToCart = () => {
		if (!user.kyc) {
			toast.error("Please complete kyc");
			router.push("/verification");
			return;
		}
		if (user._id === listing.user._id) return toast.error("Can not buy own listing");
		try {
			addItemToCart({
				listing,
				type: transactionType,
				listingModelType: "Listing"
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleBuyShares = () => {
		dispatch(
			updateCheckout({
				checkout: {
					item: listing,
					type: TransactionType.Shares,
					amount: 0,
					listingModelType: "Listing"
				}
			})
		);
		router.push("/checkout");
	};

	const goToChat = () => {
		if (user._id === listing.user._id) return toast.error("Can not buy own listing");
		router.push(
			user.isAuthenticated
				? `${AppRoutes.userDashboard.messages}?participantId=${listing.user?._id}&listingId=${listing?._id}&fromListing=true`
				: `/signup`
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
							{formatNumber(total)}
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
								{formatNumber(allPricings?.talentServiceFee || 0)}
							</h3>
							<ToggleSwitch />
						</span>
					</div>
				</div>
				<div className={styles.buttons}>
					<Button className={styles.button} onClick={handleAddToCart}>
						Add to cart
					</Button>
					{listing.allowsMultiOwnership && (
						<Button
							className={styles.shares_button}
							onClick={handleBuyShares}
						>
							Buy shares
						</Button>
					)}
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
					{offer.forSell?.shipping?.offerLocalPickup && (
						<li className={styles.offer}>
							<Image
								src={"/svgs/ad_pickup_icon.svg"}
								alt={"Accept local pickup"}
								height={40}
								width={40}
							/>
							<h3>{"Accept local pickup"}</h3>
						</li>
					)}
					{offer.forSell?.acceptOffers && (
						<li className={styles.offer}>
							<Image
								src={"/svgs/ad_make_offer_icon.svg"}
								alt={"Make an offer"}
								height={40}
								width={40}
							/>
							<h3>{"Make an offer"}</h3>
						</li>
					)}
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
	}
	// {
	// 	id: 3,
	// 	name: "Accept local pickup",
	// 	icon: "/svgs/ad_pickup_icon.svg",
	// 	link: ""
	// },
	// {
	// 	id: 4,
	// 	name: "Make an offer",
	// 	icon: "/svgs/ad_make_offer_icon.svg",
	// 	link: ""
	// }
];
