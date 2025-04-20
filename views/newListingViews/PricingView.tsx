"use client";

import React, { useEffect, useMemo, useState } from "react";
import styles from "./NewListingViews.module.scss";
import { Button, CheckBox, InputField, Logo, RangeInput, Select } from "@/shared";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/store/configureStore";
import { updateNewListing } from "@/store/slices/addListingSlice";
import { useRouter } from "next/navigation";
import { ListingType } from "@/components/newListing";
import RentOffer from "@/components/newListing/rentOffer/RentOffer";
import {
	DayOfferEnum,
	RentingOffer,
	RentingOfferRates,
	SellingOffer
} from "@/interfaces/Listing";
import Link from "next/link";
import { RevealDetails } from "@/components/UserDashboard/GetStarted/components";

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
	currency: "₦",
	pricing: undefined,
	acceptOffers: false,
	shipping: {
		shippingOffer: false,
		offerLocalPickup: false,
		shippingCosts: false
	}
};

const initialForRentDetails: RentingOffer = {
	currency: "₦",
	rates: [],
	overtimePercentage: 0,
	totalReplacementValue: 0
};

interface ErrorFieldsProp {
	isRentPriceStructure: boolean;
}

const PricingView = () => {
	const router = useRouter();
	const newListing = useSelector((state: AppState) => state.newListing);
	const dispatch = useDispatch();
	const [view, setView] = useState<View>(View.Rent);
	const [hasBoth, setHasBoth] = useState<boolean>(false);
	const [forSellDetails, setForSellDetails] = useState<SellingOffer>(
		newListing.offer.forSell ?? initialForSellDetails
	);
	const [forRentDetails, setForRentDetails] = useState<RentingOffer>(
		newListing.offer.forRent || initialForRentDetails
	);
	const [multiOwnership, setMultiOwnership] = useState<MultiOwnershipState>({
		allowsMultiOwnership: newListing.allowsMultiOwnership as boolean,
		maxSharePurchase: newListing.maxSharePurchase,
		minSharePurchase: newListing.minSharePurchase,
		totalShares: newListing.totalShares,
		reservedShares: newListing.reservedShares
	});
	const [errorFields, setErrorFields] = useState<ErrorFieldsProp>({
		isRentPriceStructure: false
	});
	const nextPage = () => {
		const data = {
			offer: {
				forSell: newListing.listingType === "rent" ? undefined : forSellDetails,
				forRent: newListing.listingType === "sell" ? undefined : forRentDetails
			},
			...multiOwnership
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

	// const disabledButton = useMemo(() => {
	// 	if (!newListing.listingType.length) return true;

	// 	if (view === View.Sell) {
	// 		return !forSellDetails.pricing;
	// 	}

	// 	if (view === View.Rent) {
	// 		const baseRate = forRentDetails.rates.find(rate => rate.quantity === 1);
	// 		if (!baseRate?.duration) return true;

	// 		const hasInvalidPrices = forRentDetails.rates.some(rate => rate.price < 1);
	// 		if (hasInvalidPrices) return true;

	// 		if (!forRentDetails.totalReplacementValue) return true;
	// 		return false;
	// 	}
	// 	if (multiOwnership.allowsMultiOwnership) {
	// 		if (
	// 			!multiOwnership.maxSharePurchase ||
	// 			!multiOwnership.minSharePurchase ||
	// 			!multiOwnership.totalShares ||
	// 			!multiOwnership.reservedShares
	// 		)
	// 			return true;
	// 		return false;
	// 	}

	// 	return true;
	// }, [
	// 	newListing.listingType,
	// 	view,
	// 	forSellDetails.pricing,
	// 	forRentDetails.rates,
	// 	forRentDetails.totalReplacementValue,
	// 	multiOwnership
	// ]);

	const disabledButton = useMemo(() => {
		if (!newListing.listingType.length) return true;

		let isDisabled = false;

		if (view === View.Rent) {
			const baseRate = forRentDetails.rates.find(rate => rate.quantity === 1);
			const hasInvalidPrices = forRentDetails.rates.some(rate => rate.price < 1);

			if (
				!baseRate?.duration ||
				hasInvalidPrices ||
				!forRentDetails.totalReplacementValue
			) {
				isDisabled = true;
			}
		}

		if (view === View.Sell) {
			if (!forSellDetails.pricing) {
				isDisabled = true;
			}
		}

		if (multiOwnership.allowsMultiOwnership) {
			if (
				!multiOwnership.maxSharePurchase ||
				!multiOwnership.minSharePurchase ||
				!multiOwnership.totalShares ||
				!multiOwnership.reservedShares
			) {
				isDisabled = true;
			}
		}

		return isDisabled;
	}, [
		newListing.listingType,
		view,
		forSellDetails.pricing,
		forRentDetails.rates,
		forRentDetails.totalReplacementValue,
		multiOwnership
	]);

	return (
		<div className={styles.section}>
			<div className={styles.header}>
				<div className={styles.small_row}>
					<Link href="/">
						<Logo type="dark" />
					</Link>
					<div className={styles.steps}>
						<div className={styles.text}>
							<p>Step 5 of 6 : Pricing</p>
						</div>
					</div>
				</div>
				<div
					style={{ gap: "0.8rem", cursor: "pointer", display: "flex" }}
					onClick={() => router.push("/user/dashboard")}
				>
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
						<BuyView
							forSellDetails={forSellDetails}
							setForSellDetails={setForSellDetails}
							multiOwnership={multiOwnership}
							setMultiOwnership={setMultiOwnership}
						/>
					)}
					{view === View.Rent && (
						<RentView
							forRentDetails={forRentDetails}
							setForRentDetails={setForRentDetails}
							errorFields={errorFields}
							setErrorFields={setErrorFields}
							multiOwnership={multiOwnership}
							setMultiOwnership={setMultiOwnership}
						/>
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

const BuyView = ({
	forSellDetails,
	setForSellDetails,
	multiOwnership,
	setMultiOwnership
}: {
	forSellDetails: SellingOffer;
	setForSellDetails: React.Dispatch<React.SetStateAction<SellingOffer>>;
	multiOwnership: MultiOwnershipState;
	setMultiOwnership: React.Dispatch<React.SetStateAction<MultiOwnershipState>>;
}) => {
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
				<Select
					label="Currency"
					options={["₦"]}
					defaultOptionIndex={0}
					onOptionChange={value =>
						setForSellDetails(prev => ({ ...prev, currency: value }))
					}
				/>
				<div className={styles.block}>
					<div className={styles.text}>
						<h3>Pricing</h3>
						<p>
							Multiple pricing options help your listings get sold faster.
						</p>
					</div>
					<div className={styles.input}>
						<InputField
							prefix="₦"
							placeholder="0"
							label="Amount"
							min={1}
							type="number"
							value={forSellDetails?.pricing}
							onChange={(e: any) => {
								setForSellDetails(prev => ({
									...prev,
									pricing: Number(e.target.value)
								}));
							}}
						/>
					</div>
					<ListingType
						title="Accept offers"
						type="buy"
						checked={forSellDetails?.acceptOffers || false}
						handleToggle={() =>
							setForSellDetails(prev => ({
								...prev,
								acceptOffers: !prev?.acceptOffers
							}))
						}
						tipDescription="Allow buyer to make an offer."
						showToolTip={true}
					/>
				</div>
				<MultiOwnershipView
					multiOwnership={multiOwnership}
					setMultiOwnership={setMultiOwnership}
				/>
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
						handleToggle={() =>
							setForSellDetails(prev => ({
								...prev,
								shipping: {
									...prev?.shipping,
									shippingOffer: !prev?.shipping?.shippingOffer
								}
							}))
						}
					/>
					<ListingType
						title="Offer Local pickup"
						type="buy"
						checked={forSellDetails?.shipping?.offerLocalPickup || false}
						tipDescription="Offer to pay for shipping to buyer."
						showToolTip={true}
						handleToggle={() =>
							setForSellDetails(prev => ({
								...prev,
								shipping: {
									...prev?.shipping,
									offerLocalPickup: !prev?.shipping?.offerLocalPickup
								}
							}))
						}
					/>
					<ListingType
						title="Cover shipping costs"
						type="buy"
						checked={forSellDetails?.shipping?.shippingCosts || false}
						handleToggle={() =>
							setForSellDetails(prev => ({
								...prev,
								shipping: {
									...prev?.shipping,
									shippingCosts: !prev?.shipping?.shippingCosts
								}
							}))
						}
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

const RentView = ({
	forRentDetails,
	setForRentDetails,
	errorFields,
	setErrorFields,
	multiOwnership,
	setMultiOwnership
}: {
	forRentDetails: RentingOffer;
	setForRentDetails: React.Dispatch<React.SetStateAction<RentingOffer>>;
	errorFields: ErrorFieldsProp;
	setErrorFields: React.Dispatch<React.SetStateAction<ErrorFieldsProp>>;
	multiOwnership: MultiOwnershipState;
	setMultiOwnership: React.Dispatch<React.SetStateAction<MultiOwnershipState>>;
}) => {
	const [priceStructure, setPriceStructure] = useState<string>(
		forRentDetails.rates.length ? forRentDetails.rates[0].duration : ""
	);

	const [rates, setRates] = useState<RentingOfferRates[]>(() => {
		if (forRentDetails.rates.length) {
			return forRentDetails.rates;
		}
		return [
			{
				duration: priceStructure,
				quantity: 1,
				price: 0
			}
		];
	});

	const updateOffer = (rateQuantity: number) => {
		if (!priceStructure) {
			setErrorFields(prev => ({ ...prev, isRentPriceStructure: true }));
			return;
		}
		setRates(prevRates => {
			const isRate = prevRates.find(rate => rate.quantity === rateQuantity);
			return isRate
				? prevRates.filter(rate => rate.quantity !== rateQuantity)
				: [
						...prevRates,
						{ duration: priceStructure, quantity: rateQuantity, price: 0 }
				  ];
		});
	};

	const offerValue = (rateQuantity: number, value: "price" | "quantity") => {
		const findRate = rates.find(rate => rate.quantity === rateQuantity);
		return findRate ? findRate[value] : undefined;
	};

	const updateRate = (rateQuantity: number, price: number) => {
		setRates(prevRates => {
			const rateIndex = prevRates.findIndex(rate => rate.quantity === rateQuantity);
			const updatedRates = [...prevRates];
			updatedRates[rateIndex] = {
				...updatedRates[rateIndex],
				price
			};
			return updatedRates;
		});
	};

	useEffect(() => {
		if (!priceStructure) return;

		setRates(prevRates =>
			prevRates.map(rate => ({
				...rate,
				duration: priceStructure
			}))
		);

		setForRentDetails(prevDetails => ({
			...prevDetails,
			rates: prevDetails.rates.map(rate => ({
				...rate,
				duration: priceStructure
			}))
		}));
	}, [priceStructure, setForRentDetails]);

	useEffect(() => {
		if (!rates.length) return;

		setForRentDetails(prev => ({
			...prev,
			rates
		}));
	}, [rates, setForRentDetails, forRentDetails.rates]);

	const priceStructures = ["daily", "hourly"];

	const defaultOptionIndex =
		forRentDetails.rates.length && forRentDetails.rates[0].duration
			? priceStructures.findIndex(item => item === forRentDetails.rates[0].duration)
			: -1;

	return (
		<div>
			<div className={styles.text}>
				<h1>Set A Daily Price And Optional Offers</h1>
				<p>
					Setting multiple price options makes your listing more competitive.
					You can enable, disable, and customize the optional offers
				</p>
			</div>
			<div className={styles.container}>
				<Select
					label="Currency"
					options={["₦"]}
					defaultOptionIndex={0}
					onOptionChange={value =>
						setForRentDetails(prev => ({ ...prev, currency: value }))
					}
				/>
				<div className={styles.rental_pricing}>
					<h3 className={styles.title}>Rental pricing</h3>
					<div className={styles.content_wrapper}>
						<div>
							<InputField
								placeholder="Enter amount"
								onChange={(e: any) => updateRate(1, +e.target.value)}
								label={`Price`}
								className={`${styles.input}`}
								value={
									offerValue(1, "price") === 0
										? ""
										: offerValue(1, "price")
								}
								type="number"
								min={0}
							/>
						</div>
						<div>
							<Select
								label="Price structure"
								options={priceStructures}
								defaultOption="Select a price structure"
								onOptionChange={value => {
									setPriceStructure(
										value === "hourly" ? "hour" : "day"
									);
									setErrorFields(prev => ({
										...prev,
										isRentPriceStructure: false
									}));
								}}
								className={
									errorFields.isRentPriceStructure
										? styles.error_border
										: ""
								}
								defaultOptionIndex={defaultOptionIndex}
							/>
							{!!errorFields.isRentPriceStructure && (
								<p className={styles.error_text}>
									Please select a price structure to proceed
								</p>
							)}
						</div>

						<div className={styles.warning_container}>
							<span className={styles.icon}>
								<Image
									src="/svgs/warningIcon.svg"
									alt=""
									height={16}
									width={16}
								/>
							</span>
							<p>
								Note: Per hour pricing structure is best for{" "}
								<span className={styles.bold_text}>
									Studio Spaces Rental
								</span>
							</p>
						</div>

						<div className={styles.divider}></div>

						<div className={styles.additional_offer_container}>
							<h3 className={styles.offer_title}>
								Additional offers{" "}
								<span className={styles.optional_text}>(Optional)</span>
							</h3>
							<RentOffer
								title={3}
								value={offerValue(3, "price")}
								toggleInput={field => {
									updateOffer(field);
								}}
								checked={!!offerValue(3, "quantity")}
								name={DayOfferEnum.THREE}
								onChange={(e: any) => updateRate(3, +e.target.value)}
								priceStructure={priceStructure}
							/>
							<RentOffer
								title={7}
								value={offerValue(7, "price")}
								toggleInput={field => {
									updateOffer(field);
								}}
								checked={!!offerValue(7, "quantity")}
								name={DayOfferEnum.SEVEN}
								onChange={(e: any) => updateRate(7, +e.target.value)}
								priceStructure={priceStructure}
							/>
							{priceStructure === "day" && (
								<RentOffer
									title={30}
									value={offerValue(30, "price")}
									toggleInput={field => {
										updateOffer(field);
									}}
									checked={!!offerValue(30, "quantity")}
									name={DayOfferEnum.THIRTY}
									onChange={(e: any) => updateRate(30, +e.target.value)}
									priceStructure={priceStructure}
								/>
							)}
						</div>
					</div>
				</div>
				<div className={styles.block}>
					<div className={styles.text}>
						<h3>Overtime pricing</h3>
						<p>
							Set a price renters would pay in the advent of an overtime or
							breach of rental duration agreement
						</p>
					</div>

					<InputField
						prefix="₦"
						placeholder="0"
						type="number"
						value={forRentDetails?.totalReplacementValue}
						onChange={(e: any) =>
							setForRentDetails(prev => ({
								...prev,
								totalReplacementValue: e.target.value ?? 0
							}))
						}
						label="Total replacement value"
						className={styles.input}
					/>
					<div className={styles.range_slide}>
						<div className={styles.text}>
							<p>Percentage of the total replacement value</p>
						</div>
						<RangeInput
							value={forRentDetails?.overtimePercentage ?? 0}
							label={`${forRentDetails?.overtimePercentage?.toString()}%`}
							onChange={e =>
								setForRentDetails(prev => ({
									...prev,
									overtimePercentage: e.target.value ?? 0
								}))
							}
							min={0}
							max={100}
						/>
					</div>
				</div>
				<MultiOwnershipView
					multiOwnership={multiOwnership}
					setMultiOwnership={setMultiOwnership}
				/>
			</div>
		</div>
	);
};

interface MultiOwnershipState {
	allowsMultiOwnership: boolean;
	maxSharePurchase?: number;
	minSharePurchase?: number;
	totalShares?: number;
	reservedShares?: number;
}

const MultiOwnershipView = ({
	multiOwnership,
	setMultiOwnership
}: {
	multiOwnership: MultiOwnershipState;
	setMultiOwnership: React.Dispatch<React.SetStateAction<MultiOwnershipState>>;
}) => {
	useEffect(() => {
		if (!multiOwnership.allowsMultiOwnership) {
			setMultiOwnership(prev => ({
				...prev,
				maxSharePurchase: undefined,
				minSharePurchase: undefined,
				totalShares: undefined,
				reservedShares: undefined
			}));
		}
	}, [multiOwnership.allowsMultiOwnership]);
	return (
		<div className={styles.block}>
			<div className={styles.text}>
				<h3>Multi-ownership</h3>
			</div>
			<CheckBox
				className={styles.checkbox}
				label="Allow multiple ownership"
				checked={multiOwnership.allowsMultiOwnership}
				onChange={() =>
					setMultiOwnership(prev => ({
						...prev,
						allowsMultiOwnership: !prev.allowsMultiOwnership
					}))
				}
			/>
			{multiOwnership.allowsMultiOwnership && (
				<div className={styles.multi_ownership_form}>
					<RevealDetails
						question="What is Multi Ownership?"
						answer="Multi-ownership allows you to sell ownership rights of your gear to multiple users at once. You can set the total number of shares you want to be available for purchase and the percentage of shares reserved for the owner. When a user purchases a share, they become a co-owner of the gear and any profit accrued from the gear is shared among all co-owners. You'll need to send your gear to gearup"
					/>
					<InputField
						label="Total shares"
						placeholder="0"
						type="number"
						value={multiOwnership.totalShares}
						onChange={(e: any) =>
							setMultiOwnership(prev => ({
								...prev,
								totalShares: e.target.value ?? 0
							}))
						}
						description="The total number of shares available for purchase should be equivalent to the cost of the gear"
					/>
					<InputField
						label="Reserved shares"
						placeholder="0"
						type="number"
						value={multiOwnership.reservedShares}
						onChange={(e: any) =>
							setMultiOwnership(prev => ({
								...prev,
								reservedShares: e.target.value ?? 0
							}))
						}
						suffix="%"
						description="The percentage of shares reserved for the owner"
					/>
					<InputField
						label="Max share purchase"
						placeholder="0"
						type="number"
						value={multiOwnership.maxSharePurchase}
						onChange={(e: any) =>
							setMultiOwnership(prev => ({
								...prev,
								maxSharePurchase: e.target.value ?? 0
							}))
						}
						suffix="%"
						description="The maximum number of shares a user can purchase"
					/>
					<InputField
						label="Min share purchase"
						placeholder="0"
						type="number"
						value={multiOwnership.minSharePurchase}
						onChange={(e: any) =>
							setMultiOwnership(prev => ({
								...prev,
								minSharePurchase: e.target.value ?? 0
							}))
						}
						suffix="%"
						description="The minimum number of shares a user can purchase"
					/>
				</div>
			)}
		</div>
	);
};
