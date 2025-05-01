"use client";
import React, { useEffect, useState } from "react";
import styles from "./WishlistComponent.module.scss";
import HeaderSubText from "../HeaderSubText/HeaderSubText";
import { CloseIcon } from "@/shared/svgs/dashboard";
import Image from "next/image";
import { Button, Pagination } from "@/shared";
import Link from "next/link";
import WishlistCard from "./WishlistCard/WishlistCard";
import {
	useGetUserWishlists,
	useRemoveItemFromWishlist
} from "@/app/api/hooks/wishlists";
import { Box } from "@mui/material";
import { CircularProgressLoader } from "@/shared/loaders";
import toast from "react-hot-toast";
import { useAppSelector } from "@/store/configureStore";

interface Props {
	showWishList: boolean;
	setShowWishList: React.Dispatch<React.SetStateAction<boolean>>;
}

const WishlistComponent = ({ showWishList, setShowWishList }: Props) => {
	const wishlists = [] as any;
	const [page, setPage] = useState(1);
	const { userId } = useAppSelector(state => state.user);

	const { data, isLoading, refetch } = useGetUserWishlists(userId as string, {
		enabled: !!showWishList && !!userId
	});

	const { mutateAsync: removeWishlist, isPending } = useRemoveItemFromWishlist();

	const listings = data?.data?.listings || [];

	const onPageChange = () => {
		console.log(page);
	};

	useEffect(() => {
		// Function to handle click events
		const handleClick = (event: MouseEvent) => {
			const target = event.target as HTMLElement;

			// Check if the click happened outside the specified elements
			if (
				!target.closest(".wishlist_content") &&
				!target.closest(".wishlist_icon")
			) {
				setShowWishList(false);
			}
		};

		// Add event listener to the document
		document.addEventListener("click", handleClick);

		// Clean up the event listener
		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, []);

	const onDeleteItem = async (wishlistId: string) => {
		if (!wishlistId) return;
		const data = {
			userId: userId,
			listingId: wishlistId
		};
		await removeWishlist(data, {
			onSuccess: () => {
				toast.success("Item removed from wishlist");
				refetch();
			},
			onError: error => {
				toast.error("Could not remove item, try again!!!");
			}
		});
	};

	return (
		<div className={styles.container} data-show={showWishList}>
			<div className={`${styles.content} wishlist_content`}>
				<div className={styles.header}>
					<HeaderSubText variant="medium" title="Wishlist" />
					<span
						className={styles.close_icon}
						onClick={() => setShowWishList(false)}
					>
						<CloseIcon />
					</span>
				</div>
				<div className={styles.mobile_header}>
					<HeaderSubText variant="medium" title="Wishlist" />
				</div>

				{isLoading ? (
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						height="30rem"
					>
						<CircularProgressLoader color="#F76039" size={30} />
					</Box>
				) : (
					<>
						{listings.length === 0 ? (
							<EmptyWishlist />
						) : (
							<div className={styles.cards_wrapper}>
								<div className={styles.cards_container}>
									{listings.map((item: any, ind: number) => (
										<WishlistCard
											key={ind}
											item={item}
											ind={ind}
											lastEle={
												ind + 1 === wishlists.length
													? true
													: false
											}
											setShowWishList={setShowWishList}
											onDeleteItem={onDeleteItem}
											deletingItem={isPending}
										/>
									))}
								</div>
								<Pagination
									currentPage={page}
									onPageChange={onPageChange}
									totalCount={wishlists.length}
									pageSize={10}
								/>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default WishlistComponent;

const EmptyWishlist = () => {
	const [showExplore, setShowExplore] = useState(false);
	return (
		<div className={styles.empty_wishlist_container}>
			<span className={styles.image_container}>
				<Image
					src="/svgs/empty-wishlist-star.svg"
					alt="empty-wishlist"
					height={52}
					width={52}
				/>
			</span>
			<h2>No Item added Yet</h2>
			<p>Browse through the marketplace to bookmark an item for later</p>
			<div className={styles.btn_container}>
				<Button
					onClick={() => setShowExplore(prev => !prev)}
					iconSuffix={
						showExplore ? "/svgs/chevron-up.svg" : "/svgs/chevron-down.svg"
					}
				>
					Explore marketplace
				</Button>
				<ul className={styles.explore_container} data-show={showExplore}>
					{exploreList.map(item => (
						<Link
							href={item.link}
							key={item.id}
							className={styles.explore_item}
						>
							<Image
								src={item.icon}
								alt={item.name}
								height={40}
								width={40}
							/>
							<p>{item.name}</p>
						</Link>
					))}
				</ul>
			</div>
		</div>
	);
};

const exploreList = [
	{
		id: 1,
		name: "Gears",
		icon: "/svgs/explore-video.svg",
		link: "/listings?type=gears"
	},
	{
		id: 2,
		name: "Courses",
		icon: "/svgs/explore-book.svg",
		link: "/listings?type=courses"
	}
];
