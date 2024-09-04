"use client";

import React from "react";
import styles from "./AddedItem.module.scss";
import { Button } from "@/shared";
import Image from "next/image";
import {  updateNewListing } from "@/store/slices/addListingSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/store/configureStore";
import { Item } from "@/interfaces/Listing";

interface Props {
	item: Item;
}

const AddedItem = ({ item }: Props) => {
	const newListing = useSelector((state: AppState) => state.newListing);
	const dispatch = useDispatch();
	const items = newListing.items;

	const deleteItem = () => {
		const filteredItems = items.filter(
			(singularItem: Item) => singularItem.name !== item.name
		);
		dispatch(updateNewListing({ items: filteredItems }));
	};
	return (
		<div className={styles.container}>
			<div className={styles.small_row}>
				<Button className={styles.row_button}>{item.quantity}</Button>
				<div className={styles.text}>
					<p>{item.name}</p>
				</div>
			</div>
			<Button
				buttonType="transparent"
				className={styles.button}
				onClick={deleteItem}
			>
				<Image src="/svgs/add-circle.svg" alt="" fill sizes="100vw" />
			</Button>
		</div>
	);
};

export default AddedItem;
