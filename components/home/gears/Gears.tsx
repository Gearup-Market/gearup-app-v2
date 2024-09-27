"use client";

import React from "react";
import { BackgroundBox, Title } from "@/shared";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import styles from "./Gears.module.scss";
import "swiper/css";
import "swiper/css/pagination";

const gearList = [
	{
		title: "cinematography",
		image: "/images/cinematography.png",
	},
	{
		title: "youtube",
		image: "/images/youtube.png",
	},
	{
		title: "live streaming",
		image: "/images/live.png",
	},
	{
		title: "travel",
		image: "/images/travel.png",
	},
	{
		title: "video shooting",
		image: "/images/video.png",
	},
	{
		title: "documentary",
		image: "/images/documentary.png",
	},
];

const Gears = () => {
	return (
		<section className={styles.section}>
			<div className={styles.center}>
				<Title
					title="Built For All The Gears You Need To Fuel Your Creative Journey"
					description="Rent or buy film gears that fit your purpose"
					className={styles.title}
				/>
			</div>
			<div className={styles.top_grid}>
				{gearList.slice(0, 3).map((gear: any, index: number) => (
					<BackgroundBox
						props={gear}
						className={index === 0 && styles.high_card}
						key={index}
					/>
				))}
			</div>
			<div className={styles.bottom_grid}>
				{gearList.slice(3).map((gear: any, index: number) => (
					<BackgroundBox props={gear} key={index} />
				))}
			</div>
			<div className={styles.slider}>
				<Swiper
					slidesPerView={1}
					pagination={{
						clickable: true,
					}}
					modules={[Pagination]}
				>
					{gearList.map((gear: any, index: number) => (
						<SwiperSlide key={index}>
							<BackgroundBox props={gear} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
};

export default Gears;
