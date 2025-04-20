"use client";

import React, { useLayoutEffect, useState } from "react";
import styles from "./ImageSlider.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useGlobalContext } from "@/contexts/AppContext";
import { Button, CustomImage } from "@/shared";
import MultiOwnership from "@/shared/svgs/MultiOwnership";

const imageList = [
	"/images/camera.png",
	"/images/audio.png",
	"/images/cinematography.png",
	"/images/drone.png",
	"/images/gimbal.png",
	"/images/grip.png",
	"/images/lense.png",
	"/images/guitar.png",
	"/images/video.png",
	"/images/camera.png",
	"/images/audio.png",
	"/images/cinematography.png",
	"/images/drone.png",
	"/images/gimbal.png",
	"/images/grip.png",
	"/images/lense.png",
	"/images/guitar.png",
	"/images/video.png"
];

interface ImageProps {
	images: string[];
	type?: string;
	multiOwnership?: boolean;
}

const ImageSlider = ({ images, type, multiOwnership }: ImageProps) => {
	const { isMobile } = useGlobalContext();
	const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
	const [slidesToShow, setSlidesToShow] = useState<number>(5);
	useLayoutEffect(() => {
		if (isMobile) {
			setSlidesToShow(5);
		} else {
			setSlidesToShow(7);
		}
	}, [isMobile]);
	return (
		<div className={`${styles.slider} listing_slider`}>
			<Swiper
				slidesPerView={1}
				navigation={true}
				thumbs={{ swiper: thumbsSwiper }}
				modules={[FreeMode, Navigation, Thumbs]}
			>
				{images.map((image: any, index: number) => (
					<SwiperSlide key={index}>
						<div className={styles.slide}>
							<CustomImage src={image} alt="" fill sizes="100vw" />
							<div className={styles.button_container}>
								{/* {props.forSale && <Button className={styles.button}>Buy</Button>}
					{props.forRent && <Button className={styles.button}>Rent</Button>} */}
								<Button
									className={styles.button}
									data-type={type?.toLowerCase()}
								>
									{type}
								</Button>

								{multiOwnership && (
									<div className={styles.multi_ownership_container}>
										<MultiOwnership />
									</div>
								)}
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
			{images.length > 1 ? (
				<Swiper
					onSwiper={setThumbsSwiper}
					spaceBetween={10}
					slidesPerView={4}
					freeMode={true}
					watchSlidesProgress={true}
					modules={[FreeMode, Navigation, Thumbs]}
					className="listing-smaller-slide"
				>
					{images.slice(0, slidesToShow).map((image: any, index: number) => (
						<SwiperSlide key={index}>
							<div className={styles.smaller_slide}>
								<CustomImage src={image} alt="" fill sizes="100vw" />
								{images.length !== slidesToShow &&
									index === slidesToShow - 1 && (
										<div
											className={styles.slide_more}
											onClick={() => setSlidesToShow(images.length)}
										>
											<p>{images.length - slidesToShow} more</p>
										</div>
									)}
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			) : null}
			{slidesToShow > 7 && (
				<div className={styles.show_less}>
					<p onClick={() => setSlidesToShow(isMobile ? 5 : 7)}>Show less...</p>
				</div>
			)}
		</div>
	);
};

export default ImageSlider;
