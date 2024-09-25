"use client";
import React, { useCallback, useState } from "react";
import InputField from "../inputField/InputField";
import styles from "./SearchBox.module.scss";
import { Button } from "..";
import Image from "next/image";

interface Props {
	className?: string;
	options?: any;
	onClick?: (e?: any) => void;
}

enum ActiveButton {
	RENT = "rent",
	BUY = "buy",
}

const SearchBox = ({ className, onClick }: Props) => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [activeButton, setActiveButton] = useState<ActiveButton>(ActiveButton.RENT);

	return (
		<div className={`${styles.searchBox} ${className}`} onClick={onClick}>
			<div className={styles.small_button_container}>
				<Button
					buttonType="transparent"
					className={styles.small_button}
					onClick={() => setActiveButton(ActiveButton.RENT)}
					data-active={activeButton === ActiveButton.RENT}
				>
					Rent
				</Button>
				<Button
					buttonType="transparent"
					className={styles.small_button}
					onClick={() => setActiveButton(ActiveButton.BUY)}
					data-active={activeButton === ActiveButton.BUY}
				>
					Buy
				</Button>
			</div>
			<div className={styles.row}>
				<div className={styles.small_row}>
					<div className={`${styles.input}`}>
						<div className={styles.input_wrapper}>
							<figure className={styles.input_icon}>
								<Image
									src="/svgs/icon-search-normal.svg"
									fill
									sizes="100vw"
									alt=""
								/>
							</figure>
							<input
								className={styles.input_field}
								type="text"
								autoComplete="off"
								placeholder="Try e.g Nikon SR ..."
							/>
						</div>
					</div>
					<div className={`${styles.input}`}>
						<div className={styles.input_wrapper}>
							<figure className={styles.input_icon}>
								<Image
									src="/svgs/icon-location.svg"
									fill
									sizes="100vw"
									alt=""
								/>
							</figure>
							<input
								className={styles.input_field}
								type="text"
								autoComplete="off"
								placeholder="Choose a city"
							/>
						</div>
					</div>
				</div>
				<Button className={styles.button}>Search</Button>
			</div>
		</div>
	);
};

export default SearchBox;
