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
	getDaysDifference,
	getLastRentalDate
} from "@/utils";
import useCart, { CartPayload } from "@/hooks/useCart";
import {
	CartItem,
	RentalBreakdown,
	TransactionType
} from "@/app/api/hooks/transactions/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useAppSelector, useAppDispatch } from "@/store/configureStore";
import Link from "next/link";
import { PricingData } from "@/app/api/hooks/Admin/pricing/types";
import { RentingOfferRates } from "@/interfaces/Listing";
import HourDatePicker from "../hourDatePicker/HourDatePicker";
import { updateCheckout } from "@/store/slices/checkoutSlice";
import { useGetBookedDates } from "@/app/api/hooks/transactions";

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
	const dispatch = useAppDispatch();
	const actionType = search.get("type");
	const user = useAppSelector(state => state.user);
	const [isDateSelected, setIsDateSelected] = useState<boolean>(false);
	const [hourRentalBreakdown, setHourRentalBreakdown] = useState<RentalBreakdown[]>([]);
	const [inputDate, setInputDate] = useState([
		{
			startDate: new Date(),
			endDate: new Date(),
			key: "selection"
		}
	]);
	const { productName, offer, listingType } = listing;

	const { data: bookedDatesData } = useGetBookedDates(listing._id, "Listing");
	const bookedDates = bookedDatesData?.data.map((item: any) => item.date) || [];

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

	const startDate = new Date(inputDate[0].startDate);
	const endDate = new Date(inputDate[0].endDate);
	const totalDays = getDaysDifference(startDate, endDate) + 1;
	const timeDiff = endDate.getTime() - startDate.getTime();

	const durationInDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
	const durationInHours = Math.ceil(timeDiff / (1000 * 3600));

	const { appliedRate } = getApplicableRate(
		offer,
		offer.forRent?.rates.length
			? offer.forRent?.rates[0].duration === "hour"
				? durationInHours
				: durationInDays
			: durationInHours,
		offer.forRent?.rates.length
			? (offer.forRent?.rates[0].duration as string)
			: "hour"
	);

	const formattedHourRentalBreakdown = hourRentalBreakdown.map(period => ({
		date: period.date,
		duration: "hour",
		quantity: period.quantity,
		price: appliedRate?.price || 0
	}));

	const dayRentalBreakdown = Array.from({ length: totalDays }, (_, i) => {
		const currentDate = new Date(startDate);
		currentDate.setDate(startDate.getDate() + i);
		return {
			date: currentDate,
			duration: "day",
			quantity: 1,
			price: appliedRate?.price || 0
		};
	});

	const duration =
		offer.forRent?.rates[0].duration === "hour"
			? formattedHourRentalBreakdown.reduce(
					(total, period) => total + period.quantity,
					0
			  )
			: dayRentalBreakdown.length;

	const item: CartItem = {
		listing,
		type: TransactionType.Rental,
		rentalBreakdown:
			offer.forRent?.rates[0].duration === "hour"
				? formattedHourRentalBreakdown
				: dayRentalBreakdown
	};

	const price = calculateItemPrice(item);

	const discountedPrice = (appliedRate?.price ?? 0) * duration || 0;

	const nonDiscountedPrice = (offer.forRent?.rates[0].price ?? 0) * duration;

	const discount = nonDiscountedPrice - discountedPrice;

	const vat = (allPricings?.valueAddedTax! / 100) * price;
	const serviceFee = (allPricings?.gearRenterFee! / 100) * price;

	const total = price + serviceFee + vat;

	const handleAddToCart = () => {
		if (!user.kyc) {
			toast.error("Please complete kyc");
			router.push("/verification");
			return;
		}
		if (transactionType === TransactionType.Rental) {
			if (
				(offer.forRent?.rates[0].duration === "hour" &&
					!hourRentalBreakdown.length) ||
				(offer.forRent?.rates[0].duration !== "hour" &&
					!dayRentalBreakdown.length)
			) {
				toast.error("Minimum rent duration is 0");
				return;
			}
		}
		if (user._id === listing.user._id) return toast.error("Can not rent own listing");
		try {
			addItemToCart({
				...item,
				customPrice: price,
				listingModelType: "Listing"
			});
			refetchcartItems();
		} catch (error) {
			console.log(error);
		}
	};

	const askToAvailability = () => {
		if (user._id === listing.user._id) return toast.error("Can not rent own listing");
		router.push(
			user.isAuthenticated
				? `${AppRoutes.userDashboard.messages}?participantId=${listing.user?._id}&listingId=${listing?._id}&mobile=true`
				: `/signup`
		);
	};

	const [openModal, setOpenModal] = useState<boolean>(false);
	const modalToOpen = () => {
		if (listing.offer.forRent?.rates[0].duration !== "hour") {
			return (
				<DatePicker
					openModal={openModal}
					setInputDate={setInputDate}
					setOpenModal={setOpenModal}
					inputDate={inputDate}
					setIsDateSelected={setIsDateSelected}
					disabledDates={bookedDates}
				/>
			);
		}
		return (
			<HourDatePicker
				openModal={openModal}
				setInputDate={setInputDate}
				setOpenModal={setOpenModal}
				inputDate={inputDate}
				setHourRentalBreakdown={setHourRentalBreakdown}
				setIsDateSelected={setIsDateSelected}
				disabledDates={bookedDates}
			/>
		);
	};

	const handleOpenModal = () => {
		if (!user.isAuthenticated) {
			return router.push("/signup");
		}
		if (user._id === listing.user._id) return toast.error("Can not rent own listing");
		setOpenModal(true);
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
					<div className={styles.input_field} onClick={handleOpenModal}>
						<div className={styles.icon}>
							<Image src="/svgs/calendar.svg" fill alt="" sizes="100vw" />
						</div>
						<div className={styles.text}>
							<p>
								{isDateSelected
									? `${format(
											offer.forRent?.rates[0].duration === "hour"
												? hourRentalBreakdown[0]?.date
												: dayRentalBreakdown[0]?.date,
											"MM/dd/yyyy"
									  )} to ${format(
											getLastRentalDate(hourRentalBreakdown) ||
												getLastRentalDate(dayRentalBreakdown),
											"MM/dd/yyyy"
									  )}`
									: `${
											listing.offer.forRent?.rates[0].duration !==
											"hour"
												? "Choose pickup / return dates"
												: "Choose date(s) and rental hours"
									  }`}
							</p>
						</div>
					</div>
				)}
				{isDateSelected && (
					<div className={styles.price_details_container}>
						<PriceItem
							item={`Rental price (${duration} ${appliedRate?.duration}${
								(appliedRate?.quantity as number) > 1 ? "s" : ""
							})`}
							value={`${currency}${formatNumber(discountedPrice)}`}
						/>
						<PriceItem
							item={`Multiple days discount`}
							value={`-${currency}${formatNumber(discount)}`}
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
						disabled={!isDateSelected}
					>
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
				</div>
				{openModal && modalToOpen()}
			</div>
			{offer.forRent?.rates?.length! > 1 ? (
				<div className={styles.price_card}>
					<div className={styles.text}>
						<h3>MULTIPLE DAYS DISCOUNTS</h3>
						{offer.forRent?.rates.slice(1).map((rate, index) => (
							<PriceItem
								item={`${rate.quantity} ${rate.duration}s offer`}
								key={index}
								value={`${currency}${formatNumber(rate.price)}`}
							/>
						))}
					</div>
				</div>
			) : null}
			<div className={styles.ad_card}>
				<Logo />
				<div className={styles.title}>
					<h1>Need Equipment Urgently?</h1>
					<p>Call us and we&apos;ll secure it for you.</p>
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
