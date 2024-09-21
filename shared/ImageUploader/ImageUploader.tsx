"use client";
import { useState } from "react";
import styles from "./ImageUploader.module.scss";
import Image from "next/image";

const ImageUpload: React.FC<{ imageUrl?: string; onChange?: (image: File) => void }> = ({
	imageUrl,
	onChange
}) => {
	const [selectedImage, setSelectedImage] = useState<File | null>(null);

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files && event.target.files[0];
		if (file) {
			setSelectedImage(file);
			if (onChange) onChange(file);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.image_container}>
				{selectedImage ? (
					<Image
						src={URL.createObjectURL(selectedImage)}
						alt="Uploaded Image"
						className={styles.image}
						width={150}
						height={150}
					/>
				) : imageUrl ? (
					<Image
						src={imageUrl}
						alt="Uploaded Image"
						className={styles.image}
						width={150}
						height={150}
					/>
				) : null}
				<label htmlFor="fileInput" className={styles.upload_button}>
					<input
						id="fileInput"
						type="file"
						accept="image/*"
						onChange={handleImageChange}
						className={styles.file_input}
					/>

					<span className={styles.icon}>
						<Image
							src="/svgs/camera.svg"
							alt="Upload"
							width={20}
							height={20}
						/>
					</span>
				</label>
			</div>
		</div>
	);
};

export default ImageUpload;
