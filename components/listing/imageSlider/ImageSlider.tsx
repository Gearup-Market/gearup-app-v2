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
	images?: string[];
	type?: string;
}

const ImageSlider = ({ images, type }: ImageProps) => {
	const { isMobile } = useGlobalContext();
	const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
	const [slidesToShow, setSlidesToShow] = useState<number>(5);
	const [imageArr, setImageArr] = useState<string[]>(images || []);
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
				{imageArr.map((image: any, index: number) => (
					<SwiperSlide key={index}>
						<div className={styles.slide}>
							<CustomImage src={image} alt="" fill sizes="100vw" />
							<div className={styles.button_container}>
								{/* {props.forSale && <Button className={styles.button}>Buy</Button>}
					{props.forRent && <Button className={styles.button}>Rent</Button>} */}
								<Button className={styles.button}>{type}</Button>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
			<Swiper
				onSwiper={setThumbsSwiper}
				spaceBetween={10}
				slidesPerView={4}
				freeMode={true}
				watchSlidesProgress={true}
				modules={[FreeMode, Navigation, Thumbs]}
				className="listing-smaller-slide"
			>
				{imageArr.slice(0, slidesToShow).map((image: any, index: number) => (
					<SwiperSlide key={index}>
						<div className={styles.smaller_slide}>
							<CustomImage src={image} alt="" fill sizes="100vw" />
							{imageArr.length !== slidesToShow &&
								index === slidesToShow - 1 && (
									<div
										className={styles.slide_more}
										onClick={() => setSlidesToShow(imageArr.length)}
									>
										<p>{imageArr.length - slidesToShow} more</p>
									</div>
								)}
						</div>
					</SwiperSlide>
				))}
			</Swiper>
			{slidesToShow > 7 && (
				<div className={styles.show_less}>
					<p onClick={() => setSlidesToShow(isMobile ? 5 : 7)}>Show less...</p>
				</div>
			)}
		</div>
	);
};

export default ImageSlider;
