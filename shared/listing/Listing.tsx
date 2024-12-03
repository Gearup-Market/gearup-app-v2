"use client";

import React, { useEffect } from "react";
import styles from "./Listing.module.scss";
import Image from "next/image";
import { Button, FavoriteStar } from "..";
import { formatNumber, shortenTitle } from "@/utils";
import { Listing as iListing, setListings } from "@/store/slices/listingsSlice";
import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import { useRouter } from "next/navigation";
import {
	useAddItemToWishlist,
	usePostCheckItemInWishlist
} from "@/app/api/hooks/wishlists";
import toast from "react-hot-toast";

interface Props {
	props: iListing;
	className?: string;
	actionType?: string;
}

const Listing = ({ props, className, actionType }: Props) => {
	const dispatch = useAppDispatch();
	const { mutateAsync: addFavorite } = useAddItemToWishlist();
	const { mutateAsync: checkIsFavorite } = usePostCheckItemInWishlist();
	const [isFavorite, setIsFavorite] = React.useState(false);
	const { userId } = useAppSelector(state => state.user);

	const router = useRouter();
	const {
		_id: id,
		offer,
		listingPhotos,
		productName,
		productSlug,
		listingType,
		user,
		totalReviews,
		averageRating
	} = props;
	const forSale = !!offer?.forSell;
	const forRent = !!offer?.forRent;

	const listingUrl = actionType
		? `/listings/${productSlug}?type=${actionType}`
		: `/listings/${productSlug}`;

	const onClickListing = () => {
		dispatch(
			setListings({
				currentListing: props
			})
		);
		router.push(listingUrl);
	};

	const handleToggleFavorites = async (isFavorite: boolean) => {
		const data = {
			userId,
			listingId: id
		};

		await addFavorite(data, {
			onSuccess: resp => {
				setIsFavorite(!isFavorite);
				toast.success(
					!isFavorite ? "Removed from favorites" : "Added to favorites"
				);
			}
		});
	};

	useEffect(() => {
		if (!user || !id) return;
		const checkFavorite = async () => {
			const data = {
				userId,
				listingId: id
			};
			const response = await checkIsFavorite(data);
			setIsFavorite(response.data);
		};

		checkFavorite();
	}, [id, userId]);

	return (
		<div className={`${styles.container} ${className}`} onClick={onClickListing}>
			<div className={styles.image}>
				<Image
					src={listingPhotos[0]}
					alt={productName || ""}
					fill
					sizes="100vw"
				/>
				<div className={styles.button_container} data-active={forSale}>
					{forSale && <Button className={styles.button}>Buy</Button>}
					{forRent && <Button className={styles.button}>Rent</Button>}
				</div>
				<span className={styles.fave_icon}>
					<FavoriteStar
						onToggle={handleToggleFavorites}
						isFavorite={isFavorite}
					/>
				</span>
			</div>
			<div className={styles.row} style={{ alignItems: "flex-start" }}>
				<div className={styles.text}>
					<h2>{shortenTitle(productName, 50)}</h2>
				</div>
				<div className={styles.chevron}>
					<Image src="/svgs/chevron-yellow.svg" alt="" fill sizes="100vw" />
				</div>
			</div>
			<div className={styles.pricing_container}>
				{forRent && (
					<div className={styles.pricing}>
						<p>
							{offer.forRent?.currency}
							{formatNumber(offer.forRent?.day1Offer || 0)}
							<span>/Day</span>
						</p>
					</div>
				)}
				{forSale && (
					<div className={styles.pricing}>
						<p>
							{offer.forSell?.currency}
							{formatNumber(offer.forSell?.pricing || 0)}
						</p>
					</div>
				)}
			</div>
			<div className={styles.row}>
				<div className={styles.small_row}>
					<div className={styles.avatar}>
						<Image
							src={user.avatar || "/svgs/user.svg"}
							alt={user.userName || ""}
							fill
							sizes="100vw"
						/>
					</div>
					<div className={styles.text} style={{ marginBottom: 0 }}>
						<p>{user?.name || user?.userName}</p>
					</div>
				</div>
				<div className={styles.small_row}>
					<div className={styles.verified}>
						<Image
							src={`/svgs/icon-${
								averageRating ? "filled-star" : "star"
							}.svg`}
							alt=""
							fill
							sizes="100vw"
						/>
					</div>
					<div className={styles.text} style={{ marginBottom: 0 }}>
						<span>({totalReviews || 0} reviews)</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Listing;
