"use client";

import React from "react";
import { BackgroundBox, Button, Title } from "@/shared";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import styles from "./Equipments.module.scss";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import Image from "next/image";

const gearList = [
	{
		title: "dj mixer",
		image: "/images/mixer.png",
	},
	{
		title: "guitar",
		image: "/images/guitar.png",
	},
	{
		title: "keyboard",
		image: "/images/keyboard.png",
	},
];

const Equipments = () => {
	return (
		<section className={styles.section}>
			<div className={styles.flex_row}>
				<Title
					title="Rent sound equipment from local creators"
					description="Discover a wide range of locally available sound equipment for rental and choose the ideal audio gear for your upcoming project. Enhance your sound quality like never before!"
					className={styles.title}
				/>
				<Link href="#">
					<Button buttonType="secondary" className={styles.button}>
						<p>See All Listings</p>
						<div className={styles.icon}>
							<Image src="/svgs/arrow.svg" fill alt="" sizes="100vw" />
						</div>
					</Button>
				</Link>
			</div>
			<div className={styles.grid}>
				{gearList.map((gear: any, index: number) => (
					<BackgroundBox
						props={gear}
						className={index === 1 && styles.high_card}
						key={index}
					/>
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

export default Equipments;
