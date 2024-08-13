"use client";

import React, { useState } from "react";
import styles from "./NewListingViews.module.scss";
<<<<<<< HEAD
import { Button, DetailContainer, Logo, Select } from "@/shared";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/store/configureStore";
import { clearNewListing, updateNewListing } from "@/store/slices/addListingSlice";
import { useRouter } from "next/navigation";
import { ListingType } from "@/components/newListing";
import { ImageSlider } from "@/components/listing";
import { formatNum } from "@/utils";
import { addListing } from "@/store/slices/listingsSlice";
=======
import { Button, Logo, Select } from "@/shared";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/store/configureStore";
import { updateNewListing } from "@/store/slices/addListingSlice";
import { useRouter } from "next/navigation";
import { ListingType } from "@/components/newListing";
>>>>>>> ef3643d0d0927c1731578b17d8df37e087c513fe

const SummaryView = () => {
	const router = useRouter();
	const newListing = useSelector((state: AppState) => state.newListing);
	const dispatch = useDispatch();
	const [type, setType] = useState<string[]>([]);
	const [checked, setChecked] = useState<{ rent: boolean; sell: boolean }>({
		rent: false,
		sell: false,
	});

	const nextPage = () => {
		const newListingData = {};
		dispatch(updateNewListing(newListingData));
<<<<<<< HEAD
		dispatch(addListing(newListing));
		router.push("/");
=======
		router.push("/new-listing/pricing");
>>>>>>> ef3643d0d0927c1731578b17d8df37e087c513fe
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
<<<<<<< HEAD
							<p>Step 6 of 6 : Summary</p>
						</div>
					</div>
				</div>
				<div style={{ gap: "0.8rem", cursor: "pointer", display: "flex" }}>
=======
							<p>Step 4 of 5 : Products</p>
						</div>
					</div>
				</div>
				<div
					className={styles.small_row}
					style={{ gap: "0.8rem", cursor: "pointer" }}
				>
>>>>>>> ef3643d0d0927c1731578b17d8df37e087c513fe
					<div className={styles.text}>
						<h6>Exit</h6>
					</div>
					<div className={styles.close}>
						<span></span>
						<span></span>
					</div>
				</div>
<<<<<<< HEAD
				<span style={{ width: "100%" }}></span>
=======
				<span style={{ width: "80%" }}></span>
>>>>>>> ef3643d0d0927c1731578b17d8df37e087c513fe
			</div>
			<div className={styles.body}>
				<div className={styles.details}>
					<div className={styles.text}>
						<h1>Review & Submit</h1>
						<p>Review your listing, hit submit, and you’re done!</p>
					</div>
<<<<<<< HEAD
					<div className={styles.container}>
						<ImageSlider images={newListing.images} />
						<div className={styles.block}>
							<div className={styles.text}>
								<h2>{newListing.title}</h2>
							</div>
							<DetailContainer
								title="Category"
								value={newListing.category.name}
							/>
							{newListing.fieldValues.map(
								(fieldValue: any, index: number) => {
									return fieldValue.fieldType === "single" &&
										fieldValue.name !== "Brand" ? (
										<DetailContainer
											title={fieldValue.name}
											value={fieldValue.selectedValues[0].name}
											key={index}
										/>
									) : null;
								}
							)}
							<div className={styles.divider}></div>
							<DetailContainer
								title="Sub category"
								value={newListing.subCategory.name}
							/>
							<DetailContainer
								title="Brand"
								value={
									newListing.fieldValues.find(
										(value: any) => value.name === "Brand"
									).selectedValues[0].name
								}
							/>
							<div className={styles.text} style={{ marginTop: "3.2rem" }}>
								<p>Use cases</p>
							</div>
							<div className={styles.row}>
								{newListing.fieldValues
									.find((value: any) => value.name === "Good for")
									.selectedValues.map((values: any, index: number) => (
										<Button key={index} className={styles.button}>
											{values.name}
										</Button>
									))}
							</div>
							<div className={styles.text} style={{ marginTop: "3.2rem" }}>
								<p>Mount</p>
							</div>
							<div className={styles.row}>
								{newListing.fieldValues
									.find((value: any) => value.name === "Mount")
									.selectedValues.map((values: any, index: number) => (
										<Button key={index} className={styles.button}>
											{values.name}
										</Button>
									))}
							</div>
							<div className={styles.text} style={{ marginTop: "3.2rem" }}>
								<h6 style={{ marginBottom: "1rem" }}>FOR SALE PERKS</h6>
								<p style={{ marginBottom: "0.6rem" }}>Accepts offers</p>
								<p style={{ marginBottom: "0.6rem" }}>Offers shipping</p>
								<p style={{ marginBottom: "0.6rem" }}>
									Cover shipping costs
								</p>
								<p style={{ marginBottom: "0.6rem" }}>
									Offer local pick up
								</p>
							</div>
							<div className={styles.text} style={{ marginTop: "3.2rem" }}>
								<h6 style={{ marginBottom: "1rem" }}>PRICING</h6>
							</div>
							<DetailContainer
								title="Amount(including VAT)"
								value={formatNum(newListing.buyPrice)}
								prefix="₦"
							/>
						</div>
					</div>
=======
					<div className={styles.container}></div>
>>>>>>> ef3643d0d0927c1731578b17d8df37e087c513fe
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
<<<<<<< HEAD
					Edit
=======
					Back
>>>>>>> ef3643d0d0927c1731578b17d8df37e087c513fe
				</Button>
				<Button
					className={styles.button}
					onClick={nextPage}
<<<<<<< HEAD
					// disabled={disabledButton}
				>
					Submit
=======
					disabled={disabledButton}
				>
					Continue
>>>>>>> ef3643d0d0927c1731578b17d8df37e087c513fe
				</Button>
			</div>
		</div>
	);
};

export default SummaryView;
