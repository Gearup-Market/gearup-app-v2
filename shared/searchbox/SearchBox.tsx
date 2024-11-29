"use client";
import React, { useCallback, useState } from "react";
import InputField from "../inputField/InputField";
import styles from "./SearchBox.module.scss";
import { Button } from "..";
import Image from "next/image";
import toast from "react-hot-toast";
import { usePostSearchListing } from "@/app/api/hooks/listings";
import { useAppDispatch } from "@/store/configureStore";
import { setListings } from "@/store/slices/listingsSlice";
import { useRouter } from "next/navigation";

interface Props {
	className?: string;
	options?: any;
	onClick?: (e?: any) => void;
}

enum ActiveButton {
	RENT = "rent",
	BUY = "buy"
}

const SearchBox = ({ className, onClick }: Props) => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [activeButton, setActiveButton] = useState<ActiveButton>(ActiveButton.RENT);
	const { mutateAsync: searchListing, isPending } = usePostSearchListing();
	const dispatch = useAppDispatch();
	const router = useRouter();

	const handleSearch = async () => {
		try {
			if (!searchTerm) {
				toast.error("Enter a search query");
				return;
			}
			const payload = {
				productName: searchTerm,
				description: searchTerm,
				listingType: activeButton === ActiveButton.BUY ? "sell" : "rent"
			};

			const res = await searchListing(payload);
			if (res.data) {
				dispatch(
					setListings({
						searchedListings: res.data.listings
					})
				);
				router.push(`/listings?type=${activeButton}`);
			}
		} catch (error: any) {
			toast.error(error?.response?.data?.message || "Failed to search");
		}
	};
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
								onChange={e => setSearchTerm(e.target.value)}
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
				<Button
					className={styles.button}
					onClick={handleSearch}
					disabled={isPending}
				>
					Search
				</Button>
			</div>
		</div>
	);
};

export default SearchBox;
