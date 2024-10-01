"use client";

import React, { useState } from "react";
import styles from "./NewListingViews.module.scss";
import { Button, Logo, Select } from "@/shared";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/store/configureStore";
import { updateNewListing } from "@/store/slices/addListingSlice";
import { useRouter } from "next/navigation";
import { ListingType } from "@/components/newListing";
import toast from "react-hot-toast";

const gearConditions = [
	"new",
	"like new",
	"excellent",
	"good",
	"well used",
	"heavily used",
	"for parts"
];

const ListingTypeView = () => {
	const router = useRouter();
	const newListing = useSelector((state: AppState) => state.newListing);
	const dispatch = useDispatch();
	const [type, setType] = useState<string[]>([]);
	const [checked, setChecked] = useState<{ rent: boolean; sell: boolean }>({
		rent: false,
		sell: false
	});
	const [condition, setCondition] = useState<string>("");

	const nextPage = () => {
		if (!condition) {
			toast.error("Please select a gear condition");
			return;
		}
		const newListingData = { condition, listingType: type.length === 2 ? "both" : type[0] };
		dispatch(updateNewListing(newListingData));
		router.push("/new-listing/pricing");
	};

	const handleToggle = (title: string) => {
		const _type = type;
		const isIncluded: boolean = _type.includes(title);
		const filteredType = isIncluded
			? [...type.filter(item => item !== title)]
			: [..._type, title];
		setType(filteredType);
		setChecked(prev => ({ ...prev, [title]: !isIncluded }));
	};

	const disabledButton = !type.length;
	return (
		<div className={styles.section}>
			<div className={styles.header}>
				<div className={styles.small_row}>
					<Logo type="dark" />
					<div className={styles.steps}>
						<div className={styles.text}>
							<p>Step 4 of 5 : Type</p>
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
				<span style={{ width: "66.8%" }}></span>
			</div>
			<div className={styles.body}>
				<div className={styles.details}>
					<div className={styles.text}>
						<h1>Are you Renting, Selling or Both?</h1>
						<p>You can put your listing for sale, for rent, or both.</p>
					</div>
					<div className={styles.container}>
						<ListingType
							src="/svgs/for-rent.svg"
							title="rent"
							toggle={handleToggle}
							checked={checked.rent}
							type="listingView"
						/>
						<ListingType
							src="/svgs/for-sell.svg"
							title="sell"
							toggle={handleToggle}
							checked={checked.sell}
							type="listingView"
						/>
						{!disabledButton && type.includes("sell") && (
							<Select
								label="Gear condition"
								required={true}
								options={gearConditions}
								onOptionChange={setCondition}
							/>
						)}
					</div>
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

export default ListingTypeView;
