"use client";

import React, { useEffect, useState } from "react";
import styles from "./NewListingViews.module.scss";
import {
	AdvanceSelect,
	Button,
	InputField,
	LocationAutoComplete,
	Logo,
	MultipleSelect,
	TextArea
} from "@/shared";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppState, useAppSelector } from "@/store/configureStore";
import { updateNewListing } from "@/store/slices/addListingSlice";
import { useRouter } from "next/navigation";
import { useGetCategories } from "@/app/api/hooks/listings";
import { iCategory } from "@/app/api/hooks/listings/types";

const ListingDetailsView = () => {
	const router = useRouter();
	const { isFetching: loading, data: allCategories } = useGetCategories();
	const newListing = useAppSelector(s => s.newListing);
	const dispatch = useDispatch();
	const [category, setCategory] = useState<iCategory>();
	const [subCategory, setSubCategory] = useState<iCategory>();
	const [selectedFields, setSelectedFields] = useState<any[]>([]);
	const [location, setLocation] = useState<{
		city: string;
		country: string;
		state: string;
		coords: {
			latitude: number;
			longitude: number;
		};
		address: string;
	}>({
		city: "",
		country: "",
		state: "",
		address: "",
		coords: {
			latitude: 0,
			longitude: 0
		}
	});
	const [inputValues, setInputValues] = useState<{
		title: string;
		description: string;
	}>({
		title: newListing.productName || "",
		description: newListing.description || ""
	});

	const convertArrToObj = (arr: any[]) => {
		return arr?.reduce((acc, field) => {
			const selectedNames = field.selectedValues.map((value: any) => value.name);
			acc[field.name] = selectedNames.length > 1 ? selectedNames : selectedNames[0];
			return acc;
		}, {} as Record<string, string | string[]>);
	};

	const handleSelectedFields = (item: any) => {
		const tempArr = [
			...selectedFields.filter(field => field.name !== item.name),
			item
		];
		setSelectedFields(tempArr);
	};

	const nextPage = () => {
		const newListingData = {
			productName: inputValues.title,
			description: inputValues.description,
			category,
			subCategory,
			fieldValues: convertArrToObj(selectedFields),
			location
		};

		dispatch(updateNewListing(newListingData));
		router.push("/new-listing/images");
	};

	useEffect(() => {
		let _c: iCategory | undefined;
		if (newListing.category) {
			_c = allCategories?.data.find(c => c._id === newListing.category?._id);
			setCategory(_c);
		}
		if (newListing.subCategory) {
			const _b = _c?.subCategories.find(c => c._id === newListing.subCategory?._id);
			setSubCategory(_b);
		}
	}, [newListing, allCategories]);

	useEffect(() => {
		if (newListing.items.length === 1) {
			setInputValues({
				...inputValues,
				title: newListing.items[0].name
			});
		}
	}, [newListing]);

	const disabledButton =
		!inputValues.description ||
		!inputValues.title ||
		!category ||
		!subCategory ||
		!location.address;

	return (
		<div className={styles.section}>
			<div className={styles.header}>
				<div className={styles.small_row}>
					<Logo type="dark" />
					<div className={styles.steps}>
						<div className={styles.text}>
							<p>Step 2 of 6 : Description</p>
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
				<span style={{ width: "33.4%" }}></span>
			</div>
			<div className={styles.body}>
				<div className={styles.details}>
					<div className={styles.text}>
						<h1>What Makes Your Offering Stand Out?</h1>
						<p>
							Adding more unique properties of your product is important to
							make your listing easily discoverable to your audience
						</p>
					</div>
					<div className={styles.container}>
						{newListing.items.length > 1 && (
							<InputField
								label="Package title"
								placeholder="E.g Zhiyun Weebill Lab Creator Accessory Kit"
								value={inputValues.title}
								onChange={(e: any) =>
									setInputValues((prev: any) => ({
										...prev,
										title: e.target.value
									}))
								}
							/>
						)}
						<div className={styles.select_row}>
							<AdvanceSelect
								label="Category"
								options={allCategories?.data ?? []}
								defaultOption={category?.name}
								onOptionChange={setCategory}
								valueType="name"
							/>
							<AdvanceSelect
								label="SubCategory"
								options={category ? category.subCategories : []}
								defaultOption={subCategory?.name}
								onOptionChange={setSubCategory}
								valueType="name"
							/>
							{subCategory &&
								subCategory.fields.map((field: any, index: number) => {
									return field.fieldType === "single" ? (
										<AdvanceSelect
											label={field.name}
											options={field.values}
											onOptionChange={handleSelectedFields}
											valueType="name"
											key={index}
											objectOption={field.name}
										/>
									) : null;
								})}
						</div>
						{subCategory &&
							subCategory.fields.map((field: any, index: number) => {
								return field.fieldType === "multiple" ? (
									<MultipleSelect
										label={field.name}
										title={field.name}
										options={field.values}
										onOptionChange={handleSelectedFields}
										key={index}
										objectOption={field.name}
									/>
								) : null;
							})}
						<TextArea
							value={inputValues.description}
							onChange={(e: any) =>
								setInputValues((prev: any) => ({
									...prev,
									description: e.target.value
								}))
							}
							label="Description"
							placeholder="Enter Description..."
						/>

						<LocationAutoComplete
							className={styles.location}
							label="Listing Location"
							placeholder="Enter location"
							onAddressSelect={setLocation}
						/>
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

export default ListingDetailsView;
