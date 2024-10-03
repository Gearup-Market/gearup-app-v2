"use client";
import React, { useEffect, useState } from "react";
import styles from "./WishlistComponent.module.scss";
import HeaderSubText from "../HeaderSubText/HeaderSubText";
import { CloseIcon } from "@/shared/svgs/dashboard";
import Image from "next/image";
import { Button, MobileCard, MobileCardContainer } from "@/shared";
import Link from "next/link";

interface Props {
	showWishList: boolean;
	setShowWishList: React.Dispatch<React.SetStateAction<boolean>>;
}

const WishlistComponent = ({ showWishList, setShowWishList }: Props) => {
	const wishlists = [1, 2, 3, 4, 56];
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
				{wishlists.length === 0 ? (
					<EmptyWishlist />
				) : (
                    <div>

					<MobileCardContainer>
						{wishlists.map((wishlist, ind) => (
							<MobileCard
								key={ind}
								mainHeaderImage="/images/admin-img.jpg"
								mainHeaderText={"wishlist"}
								subHeaderText={"rester"}
								lastEle={ind + 1 === wishlists.length}
								ind={ind}
							>
								<h1>{wishlist}</h1>
							</MobileCard>
						))}
					</MobileCardContainer>
                        </div>
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
			<div>
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


const WishlistCard =()=>{
    return(
        <div></div>
    )
}