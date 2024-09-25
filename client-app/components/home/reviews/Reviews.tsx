"use client";

import React from "react";
import { Ratings, Title } from "@/shared";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import styles from "./Reviews.module.scss";
import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";

const reviews = [
	{
		review: "Joining this platform has been a game-changer for my creative journey. The seamless process of buying and renting gears, coupled with the enriching courses in the Academy, has elevated my skills and expanded my creative horizons.",
		user: "Kelly Williams",
		avatar: "/svgs/avatar.svg",
		role: "cinematographer",
		rating: 5,
	},
	{
		review: "Joining this platform has been a game-changer for my creative journey. The seamless process of buying and renting gears, coupled with the enriching courses in the Academy, has elevated my skills and expanded my creative horizons.",
		user: "Kelly Williams",
		avatar: "/svgs/avatar.svg",
		role: "cinematographer",
		rating: 5,
	},
	{
		review: "Joining this platform has been a game-changer for my creative journey. The seamless process of buying and renting gears, coupled with the enriching courses in the Academy, has elevated my skills and expanded my creative horizons.",
		user: "Kelly Williams",
		avatar: "/svgs/avatar.svg",
		role: "cinematographer",
		rating: 5,
	},
	{
		review: "Joining this platform has been a game-changer for my creative journey. The seamless process of buying and renting gears, coupled with the enriching courses in the Academy, has elevated my skills and expanded my creative horizons.",
		user: "Kelly Williams",
		avatar: "/svgs/avatar.svg",
		role: "cinematographer",
		rating: 5,
	},
];

const Reviews = () => {
	return (
		<section className={styles.section}>
			<div className={styles.center}>
				<Title
					title="Don’t Just take our word for it"
					description="See what other creators has to say"
					className={styles.title}
					titleClassName={styles.title__title}
					descriptionClassName={styles.title__description}
				/>
			</div>
			<div className={`${styles.slider} reviews_slider`}>
				<Swiper
					slidesPerView={1}
					pagination={{
						clickable: true,
					}}
					modules={[Pagination]}
				>
					{reviews.map((review: any, index: number) => (
						<SwiperSlide key={index}>
							<div className={styles.slide}>
								<div className={styles.quote}>
									<Image
										src="/svgs/quote.svg"
										fill
										alt=""
										sizes="100vw"
									/>
								</div>
								<div className={styles.text}>
									<h2>{review.review}</h2>
								</div>
								<div className={styles.avatar}>
									<Image
										src={review.avatar}
										alt={review.user}
										fill
										sizes="100vw"
									/>
								</div>
								<div className={styles.text}>
									<h3>{review.user}</h3>
									<p>{review.role}</p>
								</div>
								<div className={styles.rating}>
									<Ratings readOnly />
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
};

export default Reviews;
