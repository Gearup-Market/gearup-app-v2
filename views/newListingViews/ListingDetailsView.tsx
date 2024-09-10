"use client";

import React, { useEffect, useState } from "react";
import styles from "./NewListingViews.module.scss";
import {
	AdvanceSelect,
	Button,
	InputField,
	Logo,
	MultipleSelect,
	TextArea
} from "@/shared";
import Image from "next/image";
import { AddSearchbox, AddedItem } from "@/components/newListing";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/store/configureStore";
import { updateNewListing } from "@/store/slices/addListingSlice";
import { allCategories, allSubCategories } from "@/mock/data.mock";
import { useRouter } from "next/navigation";

const ListingDetailsView = () => {
	const router = useRouter();
	const newListing = useSelector((state: AppState) => state.newListing);
	const dispatch = useDispatch();
	const [category, setCategory] = useState<any>();
	const [subCategory, setSubCategory] = useState<any>();
	const [otherFields, setOtherFields] = useState<any>(null);
	const [selectedFields, setSelectedFields] = useState<any[]>([]);
	const [inputValues, setInputValues] = useState<{
		title: string;
		description: string;
	}>({ title: "", description: "" });
	console.log(selectedFields);
	console.log(newListing, "newListing");

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
			fieldValues: convertArrToObj(selectedFields)
		};
		console.log(newListingData, "newListingData");
		dispatch(updateNewListing(newListingData));
		router.push("/new-listing/images");
	};

	const disabledButton =
		!inputValues.description || !inputValues.title || !category || !subCategory;

	useEffect(() => {
		if (!subCategory) {
			setOtherFields(null);
			return;
		}
		const otherCats =
			subCategory &&
			allSubCategories.filter(subCats => subCats.id === subCategory.id);
		setOtherFields(otherCats[0]);
	}, [subCategory]);

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
				<div style={{ gap: "0.8rem", cursor: "pointer", display: "flex" }}>
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
						<div className={styles.select_row}>
							<AdvanceSelect
								label="Category"
								options={allCategories}
								onOptionChange={setCategory}
								valueType="name"
							/>
							<AdvanceSelect
								label="SubCategory"
								options={category ? category.subCategories : []}
								onOptionChange={setSubCategory}
								valueType="name"
							/>
							{otherFields &&
								otherFields.fields.map((field: any, index: number) => {
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
						{otherFields &&
							otherFields.fields.map((field: any, index: number) => {
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
							placeholder="Enter Description"
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
