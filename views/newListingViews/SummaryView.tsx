"use client";

import styles from "./NewListingViews.module.scss";
import { Button, DetailContainer, Logo } from "@/shared";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppState, useAppSelector } from "@/store/configureStore";
import { clearNewListing, updateNewListing } from "@/store/slices/addListingSlice";
import { useRouter } from "next/navigation";
import { ImageSlider } from "@/components/listing";
import { formatNum } from "@/utils";
import {
	usePostCreateListing,
	usePostUpdateListing,
	useUploadFiles
} from "@/app/api/hooks/listings";
import { toast } from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

const SummaryView = () => {
	const { mutateAsync: postUploadFile, isPending: uploadingImgs } = useUploadFiles();
	const router = useRouter();
	const newListing = useSelector((state: AppState) => state.newListing);
	const { isAuthenticated } = useAuth();
	const user = useAppSelector(s => s.user);
	const { mutateAsync: createProductListing, isPending } = usePostCreateListing();
	const { mutateAsync: updateProductListing, isPending: isPendingUpdate } =
		usePostUpdateListing();
	const dispatch = useDispatch();

	const handleClose = () => {
		router.replace("/user/dashboard");
	};

	const handleSubmission = async () => {
		if (!user?.userId || !isAuthenticated) {
			toast.error("Please login to create a product");
			router.push(`/login`);
			return;
		}

		const listingId = newListing?._id;

		try {
			let listingPhotos: string[] = newListing.listingPhotos;
			if (newListing.tempPhotos && newListing.tempPhotos.length > 0) {
				try {
					const imgUploadRes = await postUploadFile(newListing.tempPhotos!);
					if (!imgUploadRes || !imgUploadRes.imageUrls) {
						throw new Error("Failed to upload images");
					}
					listingPhotos = imgUploadRes.imageUrls;
				} catch (uploadError: any) {
					toast.error(uploadError?.message || "Failed to upload images");
					return;
				}
			}
			const photos = Array.from(
				new Set([...(newListing.listingPhotos || []), ...listingPhotos])
			);
			const newListingPhotos = photos.filter(url => !url.startsWith("blob:"));

			dispatch(
				updateNewListing({
					listingPhotos: newListingPhotos
				})
			);
			const data = {
				...newListing,
				condition: newListing.condition ? newListing.condition : undefined,
				_id: undefined,
				tempPhotos: undefined,
				category: newListing.category?.id || "",
				subCategory: newListing.subCategory?.id || "",
				userId: user?.userId,
				listingPhotos: newListingPhotos,
				productionType: "renting"
			};

			if (listingId) {
				await updateProductListing({ ...data, listingId });
			} else {
				await createProductListing(data);
			}
			toast.success(`Product ${listingId ? "updated" : "created"} successfully`);
			router.push("/user/listings?type=rent");
			dispatch(clearNewListing());
		} catch (error: any) {
			console.log(error);
			toast.error(
				error?.response?.data?.message ||
					`Error ${listingId ? "updating" : "creating"} product`
			);
		}
	};
	const fieldValues = Object.entries(newListing?.fieldValues);

	return (
		<div className={styles.section}>
			<div className={styles.header}>
				<div className={styles.small_row}>
					<Link href="/">
						<Logo type="dark" />
					</Link>
					<div className={styles.steps}>
						<div className={styles.text}>
							<p>Step 6 of 6 : Summary</p>
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
				<span style={{ width: "100%" }}></span>
			</div>
			<div className={styles.body}>
				<div className={styles.details}>
					<div className={styles.text}>
						<h1>Review & Submit</h1>
						<p>Review your listing, hit submit, and you&apos;re done!</p>
					</div>
					<div className={styles.container}>
						<ImageSlider
							images={newListing?.listingPhotos as unknown as string[]}
							type={newListing.listingType}
						/>
						<div className={styles.block}>
							<div className={styles.text}>
								<h2>{newListing?.productName}</h2>
							</div>
							<DetailContainer
								title="Category"
								value={newListing.category?.name}
							/>
							<DetailContainer
								title="Sub category"
								value={newListing.subCategory?.name}
							/>
							{fieldValues?.map(([key, value]) => {
								return typeof value === "string" ? (
									<DetailContainer
										title={key}
										value={value}
										key={key}
									/>
								) : null;
							})}
							<DetailContainer
								title="Description"
								description={newListing.description}
							/>
							<DetailContainer
								title="Location"
								description={newListing.location?.address}
							/>
							<div className={styles.text} style={{ marginTop: "3.2rem" }}>
								{fieldValues?.map(([key, value]) => {
									return typeof value === "object" ? (
										<div key={key}>
											<p>{key}</p>
											<div className={styles.row}>
												{(value as unknown as string[])?.map(
													(val: string, index: number) => (
														<Button
															key={`${key}-${index}`}
															className={styles.button}
														>
															{val}
															<Image
																src="/svgs/field-values-check.svg"
																alt="checks"
																width={10}
																height={10}
															/>
														</Button>
													)
												)}
											</div>
										</div>
									) : null;
								})}
							</div>

							{newListing.offer?.forSell && (
								<>
									<div
										className={styles.text}
										style={{ marginTop: "3.2rem" }}
									>
										<h6
											className={styles.perks}
											style={{ marginBottom: "1rem" }}
										>
											{" "}
											FOR SALE PERKS
										</h6>
										{newListing.offer?.forSell?.acceptOffers &&
											newListing.offer?.forSell?.acceptOffers && (
												<p
													className={styles.perks}
													style={{ marginBottom: "0.6rem" }}
												>
													<Image
														className={styles.check}
														src="/svgs/check-icon.svg"
														alt="check"
														height={10}
														width={10}
													/>
													Accepts offers
												</p>
											)}
										{newListing.offer?.forSell?.shipping
											?.shippingOffer && (
											<p
												className={styles.perks}
												style={{ marginBottom: "0.6rem" }}
											>
												<Image
													className={styles.check}
													src="/svgs/check-icon.svg"
													alt="check"
													height={10}
													width={10}
												/>
												Offers shipping
											</p>
										)}
										{newListing.offer?.forSell?.shipping
											?.shippingCosts && (
											<p
												className={styles.perks}
												style={{ marginBottom: "0.6rem" }}
											>
												<Image
													className={styles.check}
													src="/svgs/check-icon.svg"
													alt="check"
													height={10}
													width={10}
												/>
												Cover shipping costs
											</p>
										)}
										{newListing.offer?.forSell?.shipping
											?.offerLocalPickup && (
											<p
												className={styles.perks}
												style={{ marginBottom: "0.6rem" }}
											>
												<Image
													className={styles.check}
													src="/svgs/check-icon.svg"
													alt="check"
													height={10}
													width={10}
												/>
												Offer local pick up
											</p>
										)}
									</div>
									<div
										className={styles.text}
										style={{ marginTop: "3.2rem" }}
									>
										<h6 style={{ marginBottom: "1rem" }}>
											Sale PRICING
										</h6>
									</div>
									<DetailContainer
										title="Amount(including VAT)"
										value={formatNum(
											+(newListing.offer?.forSell?.pricing || 0)
										)}
										prefix="₦"
									/>
									<div className={styles.divider}></div>
								</>
							)}
							{newListing.offer?.forRent && (
								<>
									<div
										className={styles.text}
										style={{ marginTop: "3.2rem" }}
									>
										<h6
											className={styles.perks}
											style={{ marginBottom: "1rem" }}
										>
											{" "}
											Rental Pricing
										</h6>
										{newListing.offer.forRent.rates.map(rate => (
											<DetailContainer
												title={`${rate.quantity} ${
													rate.duration
												}${
													rate.quantity > 1 ? "s" : ""
												} price(including VAT)`}
												value={formatNum(+rate.price)}
												prefix="₦"
												key={rate.quantity}
											/>
										))}
									</div>
									<DetailContainer
										title="Total replacement amount (Including VAT):"
										value={formatNum(
											+(
												newListing.offer?.forRent
													?.totalReplacementValue || 0
											)
										)}
										prefix="₦"
									/>
								</>
							)}
							{/* <div className={styles.divider}></div> */}
						</div>
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
					Edit
				</Button>
				<Button
					className={styles.button}
					onClick={handleSubmission}
					type="button"
					disabled={isPending || uploadingImgs}
				>
					{uploadingImgs
						? "Uploading images"
						: isPending
						? "Creating listing"
						: isPendingUpdate
						? "Updating listing"
						: "Submit"}
				</Button>
			</div>
		</div>
	);
};

export default SummaryView;
