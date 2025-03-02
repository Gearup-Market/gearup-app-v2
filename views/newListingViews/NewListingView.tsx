"use client";

import React, { useEffect, useState } from "react";
import styles from "./NewListingViews.module.scss";
import { Button, Logo } from "@/shared";
import Image from "next/image";
import { AddSearchbox, AddedItem } from "@/components/newListing";
import { useDispatch, useSelector } from "react-redux";
import { AppState, useAppSelector } from "@/store/configureStore";
import { clearNewListing, updateNewListing } from "@/store/slices/addListingSlice";
import { useRouter } from "next/navigation";
import { Item } from "@/interfaces/Listing";
import Link from "next/link";

const NewListingView = () => {
	const newListing = useAppSelector(s => s.newListing);
	const router = useRouter();
	const dispatch = useDispatch();
	const { items } = newListing;
	const [isProduct, setIsProduct] = useState<boolean>(false);

	const addProduct = () => {
		setIsProduct(true);
	};

	const handleClose = () => {
		router.replace("/user/dashboard");
	};

	const addItem = (item: Item) => {
		if (!item.name || !item.quantity) return;
		const _items = [...items, item];
		dispatch(updateNewListing({ items: _items }));
		setIsProduct(false);
	};

	const disabledButton = !items?.length;

	return (
		<div className={styles.section}>
			<div className={styles.header}>
				<div className={styles.small_row}>
					<Link href="/">
						<Logo type="dark" />
					</Link>
					<div className={styles.steps}>
						<div className={styles.text}>
							<p>Step 1 of 6 : Products</p>
						</div>
					</div>
				</div>
				<div
					style={{ gap: "0.8rem", cursor: "pointer", display: "flex" }}
					onClick={handleClose}
				>
					<div className={styles.text}>
						<h6>Exit</h6>
					</div>
					<div className={styles.close}>
						<span></span>
						<span></span>
					</div>
				</div>
				<span style={{ width: "16.7%" }}></span>
			</div>
			<div className={styles.body}>
				<div className={styles.details}>
					<div className={styles.text}>
						<h1>What are you renting or selling?</h1>
						<p>
							List a single item or group multiple components that belong to
							a set for a complete package
						</p>
					</div>
					<div className={styles.container}>
						{items.map((item: Item, index: number) => (
							<AddedItem item={item} key={index} />
						))}
						{isProduct ? (
							<AddSearchbox addItem={addItem} />
						) : (
							<Button
								buttonType={!!items.length ? "secondary" : "primary"}
								className={styles.button}
								onClick={addProduct}
							>
								<div className={styles.plus}>
									<span
										style={{
											backgroundColor: items.length
												? "#1B1E21"
												: "#F76039"
										}}
									></span>
									<span
										style={{
											backgroundColor: items.length
												? "#1B1E21"
												: "#F76039"
										}}
									></span>
								</div>
								{!!items.length ? "Add more to set" : "Add a product"}
							</Button>
						)}
					</div>
				</div>
				<div className={styles.image_container}>
					<div className={styles.image}>
						<Image src="/images/camera-man.png" alt="" fill sizes="100vw" />
					</div>
				</div>
			</div>
			<div className={styles.single_footer}>
				<Button
					className={styles.button}
					disabled={disabledButton}
					onClick={() => router.push("/new-listing/listing-details")}
				>
					Continue
				</Button>
			</div>
		</div>
	);
};

export default NewListingView;
