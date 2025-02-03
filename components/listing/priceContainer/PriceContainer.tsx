"use client";

import { useState } from "react";
import styles from "./PriceContainer.module.scss";
import { addDays } from "date-fns";
import Image from "next/image";
import { Button, DatePicker, Logo } from "@/shared";
import format from "date-fns/format";
import { Listing } from "@/store/slices/listingsSlice";
import {
	AppRoutes,
	calculateItemPrice,
	formatNumber,
	getApplicableRate,
	getDaysDifference
} from "@/utils";
import useCart from "@/hooks/useCart";
import { TransactionType } from "@/app/api/hooks/transactions/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useAppSelector } from "@/store/configureStore";
import Link from "next/link";
import { PricingData } from "@/app/api/hooks/Admin/pricing/types";
import { RentingOfferRates } from "@/interfaces/Listing";

const PriceContainer = ({
	listing,
	allPricings
}: {
	listing: Listing;
	allPricings?: PricingData;
}) => {
	const { addItemToCart, refetchcartItems } = useCart();
	const search = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();
	const actionType = search.get("type");
	const user = useAppSelector(state => state.user);
	const [isDateSelected, setIsDateSelected] = useState<boolean>(false);
	const [inputDate, setInputDate] = useState([
		{
			startDate: new Date(),
			endDate: new Date(),
			key: "selection"
		}
	]);
	const { productName, offer, listingType } = listing;
	const forSale = !!offer?.forSell;
	const forRent = !!offer?.forRent;

	const currency = forSale ? offer.forSell?.currency : offer.forRent?.currency;
	const pricing = forRent
		? offer?.forRent?.rates.length
			? offer?.forRent?.rates[0].price
			: 0
		: offer.forSell?.pricing;
	const transactionType =
		["sell", "buy"].includes(actionType!) || listingType !== "rent"
			? TransactionType.Sale
			: TransactionType.Rental;

	const item = {
		listing,
		type: TransactionType.Rental,
		rentalPeriod: {
			start: inputDate[0].startDate,
			end: inputDate[0].endDate
		}
	};

	const price = calculateItemPrice(item);

	const startDate = new Date(inputDate[0].startDate);
	const endDate = new Date(inputDate[0].endDate);
	const timeDiff = endDate.getTime() - startDate.getTime();

	const durationInDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
	const durationInHours = Math.ceil(timeDiff / (1000 * 3600));

	const { appliedRate } = getApplicableRate(
		offer,
		offer.forRent?.rates.length
			? offer.forRent?.rates[0].duration === "hours"
				? durationInHours
				: durationInDays
			: durationInHours,
		offer.forRent?.rates.length
			? (offer.forRent?.rates[0].duration as string)
			: "hours"
	);

	const vat = (allPricings?.valueAddedTax! / 100) * price;
	const serviceFee = (allPricings?.gearLeaseFee! / 100) * price;

	const total = price + serviceFee + vat;

	const handleAddToCart = () => {
		if (!user.kyc) {
			toast.error("Please complete kyc");
			router.push("/verification");
			return;
		}
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
				...item,
				customPrice: price
			});
			refetchcartItems();
		} catch (error) {
			console.log(error);
		}
	};

	const askToAvailability = () => {
		router.push(
			user.isAuthenticated
				? `${AppRoutes.userDashboard.messages}?participantId=${listing.user?._id}&listingId=${listing?._id}`
				: `/login?returnUrl=${pathname}`
		);
	};

	const isAddToCartDisabled =
		inputDate[0].startDate.getDate() === inputDate[0].endDate.getDate();

	const [openModal, setOpenModal] = useState<boolean>(false);

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
							{forRent && (
								<span style={{ color: "#4B525A", fontWeight: 400 }}>
									/
									{offer?.forRent?.rates.length
										? offer?.forRent?.rates[0].duration
										: "day"}
								</span>
							)}
						</h1>
					</div>
				</div>
				<div className={styles.insurance_container}>
					<div className={styles.icon}>
						<Image src="/svgs/insurance.svg" fill alt="" sizes="100vw" />
					</div>
					<div className={styles.details}>
						<div className={styles.text}>
							<h3>Gearup Global Insurance coverage</h3>
							<p>
								Gearup Global Insurance coverage starts from 17:00 the day
								before the shoot and ends at 10:00 the day after the
								shoot.{" "}
							</p>
							<a href="#" target="_blank" rel="noreferrer">
								Learn more
							</a>
						</div>
					</div>
				</div>
				{(listingType !== "sell" || actionType === "rent") && (
					<div
						className={styles.input_field}
						onClick={() => setOpenModal(true)}
					>
						<div className={styles.icon}>
							<Image src="/svgs/calendar.svg" fill alt="" sizes="100vw" />
						</div>
						<div className={styles.text}>
							<p>
								{isDateSelected
									? `${format(
											inputDate[0].startDate,
											"MM/dd/yyyy"
									  )} to ${format(inputDate[0].endDate, "MM/dd/yyyy")}`
									: "Choose pickup / return dates"}
							</p>
						</div>
					</div>
				)}
				{!isAddToCartDisabled && (
					<div className={styles.price_details_container}>
						<PriceItem
							item={`Rental price (${appliedRate?.quantity} ${
								appliedRate?.duration
							}${(appliedRate?.quantity as number) > 1 ? "s offer" : ""})`}
							value={`${currency}${formatNumber(appliedRate?.price ?? 0)}`}
						/>
						<PriceItem
							item="Gearup service fee"
							value={`${currency}${formatNumber(serviceFee)}`}
						/>
						<PriceItem item="VAT" value={`${currency}${formatNumber(vat)}`} />
						<div className={styles.divider} />
						<PriceItem
							item="Total"
							value={
								<span
									className={styles.total_styles}
								>{`${currency}${formatNumber(total)}`}</span>
							}
						/>
					</div>
				)}
				<div className={styles.buttons}>
					<Button
						buttonType="secondary"
						className={styles.button}
						onClick={askToAvailability}
					>
						Ask for availability
					</Button>
					<Button
						className={styles.button}
						onClick={handleAddToCart}
						disabled={isAddToCartDisabled}
					>
						Add to cart
					</Button>
				</div>
				{openModal && (
					<DatePicker
						openModal={openModal}
						setInputDate={setInputDate}
						setOpenModal={setOpenModal}
						inputDate={inputDate}
						setIsDateSelected={setIsDateSelected}
					/>
				)}
			</div>
			<div className={styles.ad_card}>
				<Logo />
				<div className={styles.title}>
					<h1>Need Equipment Urgently?</h1>
					<p>Call us and we’ll secure it for you.</p>
				</div>
				<div className={styles.row}>
					<Link
						href="https://wa.me/+2348060226040?text=Hello%2C%20I%27d%20like%20to%20rent%20some%20gear.%20Can%20I%20have%20more%20details%20on%20how%20to%20go%20about%20it%3F"
						target="_blank"
						rel="noopener noreferrer"
						className={styles.small_row}
					>
						<div className={styles.icon}>
							<Image src="/svgs/whatsapp.svg" alt="" fill sizes="100vw" />
						</div>
						<div className={styles.title}>
							<p>Whatsapp</p>
						</div>
					</Link>
					<Link href="tel:+2348060226040" className={styles.small_row}>
						<div className={styles.icon}>
							<Image src="/svgs/phone.svg" alt="" fill sizes="100vw" />
						</div>
						<div className={styles.title}>
							<p>Phone call</p>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default PriceContainer;

const PriceItem = ({ item, value }: { item: string; value: React.ReactNode }) => {
	return (
		<div className={styles.content}>
			<h3 className={styles.price_item}>{item}</h3>
			<p className={styles.price_value}>{value}</p>
		</div>
	);
};
