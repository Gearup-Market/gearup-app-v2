"use client";

import React, { useState } from "react";
import styles from "./NewListingViews.module.scss";
import { Button, DetailContainer, LoadingSpinner, Logo } from "@/shared";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/store/configureStore";
import {
	mockListing,
	updateNewListing
} from "@/store/slices/addListingSlice";
import { useRouter } from "next/navigation";
import { ImageSlider } from "@/components/listing";
import { formatNum } from "@/utils";
import { addListing } from "@/store/slices/listingsSlice";
import { usePostCreateListing } from "@/app/api/hooks/listings";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/AuthContext";

const images = [
	"https://res.cloudinary.com/demo/image/upload/sample.jpg",
	"https://res.cloudinary.com/demo/image/upload/car.jpg"
];

const SummaryView = () => {
	const router = useRouter();
	const newListing = useSelector((state: AppState) => state.newListing);
	const { user } = useAuth();
	const { mutateAsync: createProductListing, isPending } = usePostCreateListing();
	const dispatch = useDispatch();
	const [type, setType] = useState<string[]>([]);
	const [checked, setChecked] = useState<{ rent: boolean; sell: boolean }>({
		rent: false,
		sell: false
	});

	const nextPage = () => {
		const newListingData = {};
		dispatch(updateNewListing(newListingData));
		dispatch(addListing(newListing));
		router.push("/");
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
	console.log(newListing, "newListing");


	const handleSubmission = async () => {
		if (!user?._id) {
			toast.error("Please login to create a product");
			return;
		}
		const data = [{
			...mockListing,
			images,
			listingType: "renting",
			user: user?._id
		}];

		try {
			const resp = await createProductListing(newListing);
			console.log(resp, "resp");
			toast.success("Product created successfully");
		} catch (error) {
			toast.error("Error creating product");
		}
	};

	return (
		<div className={styles.section}>
			<div className={styles.header}>
				<div className={styles.small_row}>
					<Logo type="dark" />
					<div className={styles.steps}>
						<div className={styles.text}>
							<p>Step 6 of 6 : Summary</p>
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
				<span style={{ width: "100%" }}></span>
			</div>
			<div className={styles.body}>
				<div className={styles.details}>
					<div className={styles.text}>
						<h1>Review & Submit</h1>
						<p>Review your listing, hit submit, and you’re done!</p>
					</div>
					<div className={styles.container}>
						<ImageSlider images={images} />
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
									)?.selectedValues[0].name
								}
							/>
							<div className={styles.text} style={{ marginTop: "3.2rem" }}>
								<p>Use cases</p>
							</div>
							<div className={styles.row}>
								{newListing.fieldValues
									.find((value: any) => value.name === "Good for")
									?.selectedValues.map((values: any, index: number) => (
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
									?.selectedValues.map((values: any, index: number) => (
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
					Edit
				</Button>
				<Button
					className={styles.button}
					onClick={handleSubmission}
					type="button"
					// disabled={disabledButton}
				>
					{isPending ? <LoadingSpinner size="small" /> : "Submit"}
				</Button>
			</div>
		</div>
	);
};

export default SummaryView;
