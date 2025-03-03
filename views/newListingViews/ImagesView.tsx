"use client";

import React, { useCallback, useState } from "react";
import styles from "./NewListingViews.module.scss";
import { Button, CustomImage, Logo } from "@/shared";
import Image from "next/image";
import { updateNewListing } from "@/store/slices/addListingSlice";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import toast from "react-hot-toast";
import Link from "next/link";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ImagesView = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const newListing = useAppSelector(s => s.newListing);
	const [displayedImages, setDisplayedImages] = useState<File[]>([]);

	const handleClose = () => {
		router.replace("/user/dashboard");
	};

	const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files && files.length > 0) {
			const validFiles = Array.from(files).filter(file => file instanceof File);
			if (validFiles[0] && validFiles[0].size > MAX_FILE_SIZE) {
				return toast.error(
					`${validFiles[0].name} exceeds max size of ${
						MAX_FILE_SIZE / 1048576
					}mb`
				);
			}
			if (validFiles.length > 0) {
				const localArr = [...displayedImages, ...validFiles];
				setDisplayedImages(localArr);
			} else {
				toast.error("No valid File objects were selected");
			}
		} else {
			toast.error("No files selected");
		}
	};

	const deleteImage = (image: File) => {
		const localArr = displayedImages;
		const filteredImages = localArr.filter(item => item.name !== image.name);
		setDisplayedImages(filteredImages);
	};

	const removeExistingImage = (image: string) => {
		const images = [...newListing.listingPhotos.filter(x => x !== image)];
		dispatch(
			updateNewListing({
				listingPhotos: images
			})
		);
	};

	const nextPage = useCallback(async () => {
		// Create URLs for new images only if they haven't been processed yet
		const newImageUrls = displayedImages.map(file => {
			// Check if this file has already been converted to URL
			const existingUrl = newListing.listingPhotos.find(
				photo => photo === URL.createObjectURL(file)
			);
			return existingUrl || URL.createObjectURL(file);
		});

		// Combine existing and new photos without duplicates
		const combinedPhotos = Array.from(
			new Set([...newListing.listingPhotos, ...newImageUrls])
		);

		const newListingData = {
			listingPhotos: combinedPhotos,
			tempPhotos: displayedImages
		};

		dispatch(updateNewListing(newListingData));
		router.push("/new-listing/type");
	}, [newListing.listingPhotos, displayedImages, dispatch, router]);

	const disabledButton =
		displayedImages.length === 0 && newListing.listingPhotos.length === 0;

	return (
		<div className={styles.section}>
			<div className={styles.header}>
				<div className={styles.small_row}>
					<Link href="/">
						<Logo type="dark" />
					</Link>
					<div className={styles.steps}>
						<div className={styles.text}>
							<p>Step 3 of 6 : Pictures</p>
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
				<span style={{ width: "50.1%" }}></span>
			</div>
			<div className={styles.body}>
				<div className={styles.details}>
					<div className={styles.text}>
						<h1>Upload Picture Of Your Offering </h1>
						<p>
							Upload one or more pictures of your offering & drag them to
							reorder
						</p>
					</div>
					<div className={styles.container}>
						<div className={styles.addimage_container}>
							<input
								type="file"
								className={styles.file_input}
								onChange={handleIconChange}
								accept=".jpeg, .jpg, .png, .gif"
								multiple
								// required
							/>
							<div className={styles.add_image}>
								<Image
									src="/svgs/icon-add-image.svg"
									alt=""
									fill
									sizes="100vw"
								/>
							</div>
							<div className={styles.text}>
								<p>
									Drop your images here, or <span>click to upload</span>
								</p>
								<h5>1600 x 1200 (4:3) recommended, up to 10mb each</h5>
							</div>
						</div>
						<div className={styles.image_row}>
							{newListing.listingPhotos.length
								? newListing.listingPhotos.map((photo: string, index) => (
										<div key={index} className={styles.image}>
											<CustomImage
												src={photo}
												alt=""
												fill
												sizes="100vw"
											/>
											<div
												className={styles.closeModal_container}
												onClick={() => removeExistingImage(photo)}
											>
												<div className={styles.closeModal}>
													<span></span>
													<span></span>
												</div>
											</div>
										</div>
								  ))
								: displayedImages.map((displayedImage: File) => (
										<div
											key={displayedImage.name}
											className={styles.image}
										>
											<CustomImage
												src={URL.createObjectURL(displayedImage)}
												alt=""
												fill
												sizes="100vw"
											/>
											<div
												className={styles.closeModal_container}
												onClick={() =>
													deleteImage(displayedImage)
												}
											>
												<div className={styles.closeModal}>
													<span></span>
													<span></span>
												</div>
											</div>
										</div>
								  ))}
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

export default ImagesView;
