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
		review: "I appreciate how GearUp genuinely listens to feedback and carefully curates the gear available on the platform. It perfectly meets my needs, and because of that, I’ll continue using GearUp.",
		user: "Itojie Daniel",
		avatar: "/images/daniel.png",
		role: "portrait photographer",
		rating: 5
	},
	{
		review: "I love the flexibility of their rental process, it allows me work with my schedule and I get value for my money.",
		user: "Mildred",
		avatar: "/images/mildred.png",
		role: "portrait photographer",
		rating: 5
	},
	{
		review: "I love renting from the platform because they’re accessible and it’s easy to communicate. They help you pick the right gear for your project if you’re unsure about what you need.",
		user: "Barbra Felix",
		avatar: "/images/barbara.png",
		role: "portrait and wedding photographer",
		rating: 5
	},
	{
		review: "They’re very accessible and respond quickly. The rental process is straightforward. The condition of the gear I rent on the platform is always top notch.",
		user: "Samuel",
		avatar: "/images/samuel.png",
		role: "filmmaker, CEO weirdman films",
		rating: 5
	},
	{
		review: "I love their customer support. They’ve always assisted with any challenge that I have encountered in the past while using the equipment I rent through them. I’ll recommend them to my colleagues any time any day.",
		user: "Dominic visuals",
		avatar: "/images/dominic.png",
		role: "conceptual portrait photographer and cinematographer",
		rating: 5
	}
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
						clickable: true
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
