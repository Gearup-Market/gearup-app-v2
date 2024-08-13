"use client";

import React, { useState } from "react";
import styles from "./NewListingViews.module.scss";
import { Button, Logo } from "@/shared";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/store/configureStore";
import { updateNewListing } from "@/store/slices/addListingSlice";
import { useRouter } from "next/navigation";

const ImagesView = () => {
	const router = useRouter();
	const newListing = useSelector((state: AppState) => state.newListing);
	const dispatch = useDispatch();
	const [displayedImages, setDisplayedImages] = useState<any[]>([]);

	const handleIconChange = (e: any) => {
		const file = e.target.files[0];
		const localArr = [...displayedImages, URL.createObjectURL(file)];
		setDisplayedImages(localArr);
		// if (file) {
		// 	const reader = new FileReader();
		// 	reader.onloadend = () => {
		// 		const baseUrl: any = reader.result;
		// 		const baseUrlString: any = baseUrl!.split("base64,")[1];
		// 		setInputValues({
		// 			...inputValues,
		// 			image: baseUrlString,
		// 		});
		// 	};
		// 	reader.readAsDataURL(file);
		// }
	};

	const deleteImage = (image: string) => {
		const localArr = displayedImages;
		const filteredImages = localArr.filter(item => item !== image);
		setDisplayedImages(filteredImages);
	};

	const nextPage = () => {
		const newListingData = { images: displayedImages };
		dispatch(updateNewListing(newListingData));
		router.push("/new-listing/type");
	};

	const disabledButton = !displayedImages.length;
	return (
		<div className={styles.section}>
			<div className={styles.header}>
				<div className={styles.small_row}>
					<Logo type="dark" />
					<div className={styles.steps}>
						<div className={styles.text}>
<<<<<<< HEAD
							<p>Step 3 of 6 : Pictures</p>
						</div>
					</div>
				</div>
				<div style={{ gap: "0.8rem", cursor: "pointer", display: "flex" }}>
=======
							<p>Step 3 of 5 : Products</p>
						</div>
					</div>
				</div>
				<div
					className={styles.small_row}
					style={{ gap: "0.8rem", cursor: "pointer" }}
				>
>>>>>>> ef3643d0d0927c1731578b17d8df37e087c513fe
					<div className={styles.text}>
						<h6>Exit</h6>
					</div>
					<div className={styles.close}>
						<span></span>
						<span></span>
					</div>
				</div>
<<<<<<< HEAD
				<span style={{ width: "50.1%" }}></span>
=======
				<span style={{ width: "60%" }}></span>
>>>>>>> ef3643d0d0927c1731578b17d8df37e087c513fe
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
<<<<<<< HEAD
								accept="image/*"
=======
								accept="image/png, image/jpeg"
>>>>>>> ef3643d0d0927c1731578b17d8df37e087c513fe
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
							{displayedImages.map((displayedImage: string) => (
								<div key={displayedImage} className={styles.image}>
									<Image
										src={displayedImage}
										alt=""
										fill
										sizes="100vw"
									/>
									<div
										className={styles.closeModal_container}
										onClick={() => deleteImage(displayedImage)}
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
