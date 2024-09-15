"use client";

import React, { useEffect, useState } from "react";
import styles from "./NewListingViews.module.scss";
import { Button, CheckBox, InputField, Logo, RangeInput, Select } from "@/shared";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/store/configureStore";
import { updateNewListing } from "@/store/slices/addListingSlice";
import { useRouter } from "next/navigation";
import { ListingType } from "@/components/newListing";
import RentOffer, { RentOfferProps } from "@/components/newListing/rentOffer/RentOffer";
import { DayOfferEnum, RentingOffer, SellingOffer } from "@/interfaces/Listing";

const enum View {
	Idle = "idle",
	Rent = "rent",
	Sell = "sell",
	singleRent = "singleRent",
	singleSell = "singleSell"
}

interface RentOffer {
	value: number;
	enabled: boolean;
}

const initialForSellDetails: SellingOffer = {
	currency: "",
	pricing: 0,
	acceptOffers: false,
	shipping: {
		shippingOffer: false,
		offerLocalPickup: false,
		shippingCosts: false
	}
};

const initialForRentDetails: RentingOffer = {
	currency: "",
	day1Offer: 0,
	day3Offer: 0,
	day7Offer: 0,
	day30Offer: 0,
	overtimePercentage: 0,
	totalReplacementValue: 0
};

const PricingView = () => {
	const router = useRouter();
	const newListing = useSelector((state: AppState) => state.newListing);
	const dispatch = useDispatch();
	const [view, setView] = useState<View>(View.Rent);
	const [hasBoth, setHasBoth] = useState<boolean>(false);
	const [forSellDetails, setForSellDetails] = useState<SellingOffer>(newListing.offer.forSell ?? initialForSellDetails);
	const [forRentDetails, setForRentDetails] = useState<RentingOffer>(newListing.offer.forRent ?? initialForRentDetails);

	// const [rentOffers, setRentOffers] = useState<any>({})
	console.log(newListing, "new listing");

	const nextPage = () => {
		const data = {
			offer: {
				forSell: forSellDetails,
				forRent: forRentDetails
			}
		};
		dispatch(updateNewListing(data));
		router.push("/new-listing/summary");
	};

	function checkAvailability(type: string) {
		const hasRent = type === "rent";
		const hasSell = type === "sell";
		const hasBothTypes = type === "both";

		if (hasBothTypes) {
			setHasBoth(true);
			setView(View.Rent);
		} else if (hasRent) {
			setView(View.Rent);
			setHasBoth(false);
		} else if (hasSell) {
			setView(View.Sell);
			setHasBoth(false);
		}
	}
	useEffect(() => {
		checkAvailability(newListing.listingType);
	}, []);


	const disabledButton = !newListing.listingType.length;
	return (
		<div className={styles.section}>
			<div className={styles.header}>
				<div className={styles.small_row}>
					<Logo type="dark" />
					<div className={styles.steps}>
						<div className={styles.text}>
							<p>Step 5 of 6 : Pricing</p>
						</div>
					</div>
				</div>
				<div style={{ gap: "0.8rem", cursor: "pointer", display: "flex" }}>
					<div className={styles.text}>
						<h6>Exit</h6>
					</div>
					<div className={styles.close}>
						<span></span>
						<span></span>
					</div>
				</div>
				<span style={{ width: "83.5%" }}></span>
			</div>
			<div className={styles.body}>
				<div className={styles.details}>
					{hasBoth && (
						<div className={styles.nav_button}>
							<Button
								buttonType="transparent"
								className={styles.button_container}
								onClick={() => setView(View.Rent)}
							>
								<div
									className={styles.button}
									data-active={view === View.Rent}
								>
									For rent
								</div>
							</Button>
							<Button
								buttonType="transparent"
								className={styles.button_container}
								onClick={() => setView(View.Sell)}
							>
								<div
									className={styles.button}
									data-active={view === "sell"}
								>
									For sell
								</div>
							</Button>
						</div>
					)}
					{view === View.Sell && (
						<BuyView forSellDetails={forSellDetails} setForSellDetails={setForSellDetails} />
					)}
					{view === View.Rent && (
						<RentView forRentDetails={forRentDetails} setForRentDetails={setForRentDetails} />
					)}
				</div>

				<div className={styles.image_container}>
					<div className={styles.image}>
						<Image src="/images/camera-man.png" alt="" fill sizes="100vw" />
					</div>
				</div>
			</div>
			<div className={styles.footer}>
				<Button
					buttonType="transparent"
					className={styles.button}
					onClick={() => router.back()}
				>
					Back
				</Button>
				<Button
					className={styles.button}
					onClick={nextPage}
					disabled={disabledButton}
				>
					Continue
				</Button>
			</div>
		</div>
	);
};

export default PricingView;

const BuyView = ({ forSellDetails, setForSellDetails }: { forSellDetails: SellingOffer, setForSellDetails: React.Dispatch<React.SetStateAction<SellingOffer>> }) => {

	return (
		<div>
			<div className={styles.text}>
				<h1>Set A Price And Optional Offers</h1>
				<p>
					More offers makes your listing more competitive. You can enable,
					disable, and customize the optional offers
				</p>
			</div>
			<div className={styles.container}>
				<Select label="Currency" options={["NGN"]} onOptionChange={(value) => setForSellDetails((prev) => ({ ...prev, currency: value }))} />
				<div className={styles.block}>
					<div className={styles.text}>
						<h3>Pricing</h3>
						<p>
							Multiple pricing options help your listings get sold faster.
						</p>
					</div>
					<InputField
						prefix="N"
						placeholder="0"
						label="Amount"
						type="number"
						value={forSellDetails?.pricing}
						onChange={(e: any) => setForSellDetails((prev) => ({ ...prev, pricing: e.target.value ?? 0 }))}
						className={styles.input}
					/>
					<ListingType
						title="Accept offers"
						type="buy"
						checked={forSellDetails?.acceptOffers || false}
						handleToggle={() => setForSellDetails((prev) => ({ ...prev, acceptOffers: !prev?.acceptOffers }))}
						tipDescription="Allow buyer to make an offer."
						showToolTip={true}
					/>
				</div>
				<div className={styles.block}>
					<div className={styles.text}>
						<h3>Shipping</h3>
						<p>
							Multiple shipping options help your listings get sold faster.
						</p>
					</div>
					<ListingType
						title="Offer shipping"
						type="buy"
						checked={forSellDetails?.shipping?.shippingOffer || false}
						tipDescription="Allow the buyer to choose shipping when they place an order."
						showToolTip={true}
						handleToggle={() => setForSellDetails((prev) => ({ ...prev, shipping: { ...prev?.shipping, shippingOffer: !prev?.shipping?.shippingOffer } }))}
					/>
					<ListingType
						title="Offer Local pickup"
						type="buy"
						checked={forSellDetails?.shipping?.offerLocalPickup || false}
						tipDescription="Offer to pay for shipping to buyer."
						showToolTip={true}
						handleToggle={() => setForSellDetails((prev) => ({ ...prev, shipping: { ...prev?.shipping, offerLocalPickup: !prev?.shipping?.offerLocalPickup } }))}
					/>
					<ListingType
						title="Cover shipping costs"
						type="buy"
						checked={forSellDetails?.shipping?.shippingCosts || false}
						handleToggle={() => setForSellDetails((prev) => ({ ...prev, shipping: { ...prev?.shipping, shippingCosts: !prev?.shipping?.shippingCosts } }))}
						showToolTip={true}
						tipDescription="Buyers expects having a return policy and the choice to opt for Third-Party Verification when making a purchase. Hence, we mandate that all sellers on Gearup to provide a 48-hour return policy and be open to accepting payments through Third-Party Verification from buyers."
					/>
				</div>
				<div className={styles.text}>
					<CheckBox className={styles.checkbox} />
					<p style={{ marginLeft: "3rem", fontSize: "1.4rem" }}>
						I understand and agree to the{" "}
						<a
							target="_blank"
							rel="noreferrer noopener"
							href="#"
							style={{ fontSize: "1.4rem" }}
						>
							Terms & Conditions
						</a>
						, The{" "}
						<a
							target="_blank"
							rel="noreferrer noopener"
							href="#"
							style={{ fontSize: "1.4rem" }}
						>
							48-hour return policy
						</a>{" "}
						and{" "}
						<a
							target="_blank"
							rel="noreferrer noopener"
							href="#"
							style={{ fontSize: "1.4rem" }}
						>
							Third-Party Check
						</a>
						.
					</p>
				</div>
			</div>
		</div>
	);
};

const RentView = ({ forRentDetails, setForRentDetails }: { forRentDetails: RentingOffer, setForRentDetails: React.Dispatch<React.SetStateAction<RentingOffer>> }) => {

	const [toggleValues, setToggleValues] = useState<{ oneDayRent: boolean; threeDayRent: boolean; sevenDayRent: boolean; thirtyDayRent: boolean }>({
		oneDayRent: true,
		threeDayRent: forRentDetails.day3Offer !== 0,
		sevenDayRent: forRentDetails.day7Offer !== 0,
		thirtyDayRent: forRentDetails.day30Offer !== 0
	});

	const handlePriceChange = (e: any) => {
		setToggleValues((prev) => ({ ...prev, oneDayRent: true }));
		setForRentDetails((prev) => ({ ...prev, day1Offer: e.target.value }));
		// update other enabled offers
		if (toggleValues.threeDayRent) {
			setForRentDetails((prev) => ({ ...prev, day3Offer: +e.target.value * 2 }));
		}
		if (toggleValues.sevenDayRent) {
			setForRentDetails((prev) => ({ ...prev, day7Offer: +e.target.value * 3 }));
		}
		if (toggleValues.thirtyDayRent) {
			setForRentDetails((prev) => ({ ...prev, day30Offer: +e.target.value * 9 }));
		}
	};

	const updateFieldPrice = (field: string) => {
		if (field === DayOfferEnum.THREE_DAYS) {
			setToggleValues((prev) => ({ ...prev, threeDayRent: !prev.threeDayRent }));
			setForRentDetails((prev) => ({ ...prev, day3Offer: toggleValues.threeDayRent ? 0 : +forRentDetails?.day1Offer * 2 }));
		}
		if (field === DayOfferEnum.SEVEN_DAYS) {
			setToggleValues((prev) => ({ ...prev, sevenDayRent: !prev.sevenDayRent }));
			setForRentDetails((prev) => ({ ...prev, day7Offer: toggleValues.sevenDayRent ? 0 : +forRentDetails?.day1Offer * 3 }));
		}
		if (field === DayOfferEnum.THIRTY_DAYS) {
			setToggleValues((prev) => ({ ...prev, thirtyDayRent: !prev.thirtyDayRent }));
			setForRentDetails((prev) => ({ ...prev, day30Offer: toggleValues.thirtyDayRent ? 0 : +forRentDetails?.day1Offer * 9 }));
		}
	};

	return (
		<div>
			<div className={styles.text}>
				<h1>Set A Daily Price And Optional Offers</h1>
				<p>
					Setting multiple price options makes your listing more competitive.You
					can enable, disable, and customize the optional offers
				</p>
			</div>
			<div className={styles.container}>
				<Select label="Currency" options={["NGN"]} onOptionChange={(value) => setForRentDetails((prev) => ({ ...prev, currency: value }))} />
				<div className={styles.select_row}>
					<RentOffer
						title={1}
						value={forRentDetails?.day1Offer ?? 0}
						onChange={handlePriceChange}
						name={DayOfferEnum.ONE_DAY}
						checked={true}
					/>
					<RentOffer
						title={3}
						value={forRentDetails?.day3Offer ?? 0}
						toggleInput={(field) => {
							updateFieldPrice(field);
						}}
						checked={toggleValues.threeDayRent}
						name={DayOfferEnum.THREE_DAYS}
					/>
					<RentOffer
						title={7}
						value={forRentDetails.day7Offer ?? 0}
						toggleInput={(field) => {
							updateFieldPrice(field);
						}}
						checked={toggleValues.sevenDayRent}
						name={DayOfferEnum.SEVEN_DAYS}
					/>
					<RentOffer
						title={30}
						value={forRentDetails?.day30Offer ?? 0}
						toggleInput={(field) => {
							updateFieldPrice(field);
						}}
						checked={toggleValues.thirtyDayRent}
						name={DayOfferEnum.THIRTY_DAYS}
					/>
				</div>
				<div className={styles.block}>
					<div className={styles.text}>
						<h3>Overtime pricing</h3>
						<p>
							Set a price renters would pay in the advent of an overtime or
							breach of rental duration agreement
						</p>
					</div>
					<div className={styles.range_slide}>
						<div className={styles.text}>
							<p>Percentage of the total replacement value</p>
						</div>
						<RangeInput
							value={forRentDetails?.overtimePercentage ?? 0}
							label={`${forRentDetails?.overtimePercentage?.toString()}%`}
							onChange={e => setForRentDetails((prev) => ({ ...prev, overtimePercentage: e.target.value ?? 0 }))}
							min={0}
							max={100}
						/>
					</div>
					<InputField
						prefix="N"
						placeholder="0"
						type="number"
						value={forRentDetails?.totalReplacementValue ?? 0}
						onChange={(e: any) => setForRentDetails((prev) => ({ ...prev, totalReplacementValue: e.target.value ?? 0 }))}
						label="Total replacement value"
						className={styles.input}
					/>
				</div>
			</div>
		</div>
	);
};
