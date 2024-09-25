"use client";

import React, { useState } from "react";
import styles from "./AddSearchbox.module.scss";
import Image from "next/image";
import { Button } from "@/shared";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/store/configureStore";
import {  updateNewListing } from "@/store/slices/addListingSlice";
import { Item } from "@/interfaces/Listing";

interface Option {
	name: string;
	id: number;
}

const options: Option[] = [
	{ name: "camera", id: 1 },
	{ name: "drone", id: 2 },
	{ name: "lense", id: 3 },
	{ name: "gimbal", id: 4 },
];

interface Props {
	addItem: (e: Item) => void;
}

const AddSearchbox = ({ addItem }: Props) => {
	const [item, setItem] = useState<Item>({
		quantity: 1,
		name: "",
		id: 0,
	});
	const [isTyping, setIsTyping] = useState<boolean>(false);

	const counter = (type: "increase" | "decrease") => {
		if (type === "increase") setItem({ ...item, quantity: ++item.quantity });
		if (type === "decrease") {
			if (item.quantity < 2) return;
			setItem({ ...item, quantity: --item.quantity });
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.small_row}>
				<div className={styles.icon} onClick={() => counter("decrease")}>
					<Image src="/svgs/minus-circle.svg" alt="" fill sizes="100vw" />
				</div>
				<div className={styles.text}>
					<p>{item.quantity}</p>
				</div>
				<div className={styles.icon} onClick={() => counter("increase")}>
					<Image src="/svgs/add-circle.svg" alt="" fill sizes="100vw" />
				</div>
			</div>
			<input
				autoFocus
				type="text"
				className={styles.input}
				value={item.name}
				onChange={(e: any) => {
					setItem({ ...item, name: e.target.value });
					setIsTyping(true);
				}}
			/>
			<Button
				className={styles.button}
				disabled={!item.name}
				onClick={() => addItem(item)}
			>
				<div className={styles.check}>
					<Image src="/svgs/check.svg" alt="" fill sizes="100vw" />
				</div>
			</Button>
			{isTyping && (
				<div className={styles.body}>
					<ul className={styles.select_listContainer}>
						{options.map((option: Option, index) => (
							<li
								onClick={() => {
									setItem({
										...item,
										name: option.name,
										id: option.id,
									});
									setIsTyping(false);
								}}
								key={index}
								className={styles.select_listItem}
							>
								<div className={`${styles.select_row} ${styles.text}`}>
									<p>{option.name}</p>
								</div>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default AddSearchbox;
