"use client";

import React, { useEffect, useState } from "react";
import styles from "./NewListingViews.module.scss";
import { Button, CheckBox, InputField, Logo, RangeInput, Select } from "@/shared";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/store/configureStore";
import { updateNewListing } from "@/store/slices/addListingSlice";
import { useRouter } from "next/navigation";
import { ListingType, RentOffer } from "@/components/newListing";

const enum View {
	Idle = "idle",
	Rent = "rent",
	Sell = "sell",
	singleRent = "singleRent",
	singleSell = "singleSell",
}

interface RentOffer {
	value: number;
	enabled: boolean;
}

const PricingView = () => {
	const router = useRouter();
	const newListing = useSelector((state: AppState) => state.newListing);
	const dispatch = useDispatch();
	const [type, setType] = useState<string[]>([]);
	const [view, setView] = useState<View>(View.Rent);
	const [hasBoth, setHasBoth] = useState<boolean>(false);
	const [oneDayRent, setOneDayRent] = useState<RentOffer>({ value: 0, enabled: false });
	const [amount, setAmount] = useState<number>(0);
	// const [rentOffers, setRentOffers] = useState<any>({})
	console.log(newListing,"new listing");

	const [checked, setChecked] = useState<{ rent: boolean; sell: boolean }>({
		rent: false,
		sell: false,
	});
	const nextPage = () => {
		// const newListingData = { condition, type };
		const newListingData = {
			buyPrice: amount,
			price1Day: oneDayRent,
		};
		dispatch(updateNewListing(newListingData));
		router.push("/new-listing/summary");
	};

	function checkAvailability(arr: string[]) {
		const hasRent = arr.includes("rent");
		const hasSell = arr.includes("sell");

		if (hasRent && hasSell) {
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
		checkAvailability(newListing.type);
	}, []);

	const handleToggle = (title: "rent" | "sell") => {
		const _type = type;
		const isIncluded: boolean = _type.includes(title);
		const filteredType = isIncluded
			? [...type.filter(item => item !== title)]
			: [..._type, title];
		setType(filteredType);
		setChecked(prev => ({ ...prev, [title]: !isIncluded }));
	};

	const disabledButton = !newListing.type.length;
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
				<>
					{hasBoth && (
						<div className={styles.details}>
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
							{view === View.Sell && (
								<BuyView amount={amount} setAmount={setAmount} />
							)}
							{view === View.Rent && (
								<RentView
									oneDayRent={oneDayRent}
									setOneDayRent={setOneDayRent}
								/>
							)}
						</div>
					)}

					{/* {
						!hasBoth && ({view === View.singleSell && <BuyView />}
						{view === View.singleRent && <RentView />})
					} */}
				</>
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

const BuyView = ({ amount, setAmount }: any) => {
	const toggle = () => { };
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
				<Select label="Currency" options={["NGN"]} />
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
						value={amount}
						onChange={(e: any) => setAmount(e.target.value)}
						className={styles.input}
					/>
					<ListingType title="Accept offers" checked toggle={toggle} />
				</div>
				<div className={styles.block}>
					<div className={styles.text}>
						<h3>Shipping</h3>
						<p>
							Multiple shipping options help your listings get sold faster.
						</p>
					</div>
					<ListingType title="Offer shipping" checked toggle={toggle} />
					<ListingType title="Offer Local pickup" checked toggle={toggle} />
					<ListingType title="Cover shipping costs" checked toggle={toggle} />
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

const RentView = ({ oneDayRent, setOneDayRent }: any) => {
	// const [oneDayRent, setOneDayRent] = useState<RentOffer>({ value: 0, enabled: false });
	const [threeDayRent, setThreeDayRent] = useState<RentOffer>({
		value: 0,
		enabled: false,
	});
	const [sevenDayRent, setSevenDayRent] = useState<RentOffer>({
		value: 0,
		enabled: false,
	});
	const [thirtyDayRent, setThirtyDayRent] = useState<RentOffer>({
		value: 0,
		enabled: false,
	});
	const [totalReplacementValue, setTotalReplacementValue] = useState<number>(0);
	const toggle = () => { };

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
				<Select label="Currency" options={["NGN"]} />
				<div className={styles.select_row}>
					<RentOffer title={1} value={oneDayRent} onChange={setOneDayRent} />
					<RentOffer
						title={3}
						value={threeDayRent}
						onChange={setThreeDayRent}
					/>
					<RentOffer
						title={7}
						value={sevenDayRent}
						onChange={setSevenDayRent}
					/>
					<RentOffer
						title={30}
						value={thirtyDayRent}
						onChange={setThirtyDayRent}
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
						<RangeInput value={700} min={50} max={1000} />
					</div>
					<InputField
						prefix="N"
						placeholder="0"
						type="number"
						value={totalReplacementValue}
						onChange={(e: any) => setTotalReplacementValue(e.target.value)}
						label="Total replacement value"
						className={styles.input}
					/>
				</div>
			</div>
		</div>
	);
};
