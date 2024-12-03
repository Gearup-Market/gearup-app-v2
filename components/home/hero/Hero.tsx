"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./Hero.module.scss";
import Image from "next/image";
import { SearchBox } from "@/shared";
import TextTransition, { presets } from "react-text-transition";
import { useGlobalContext } from "@/contexts/AppContext";

const words = ["Gear", "Studio Spaces", "Courses"];
const Hero = () => {
	const { setHeroHeight }: any = useGlobalContext();
	const heroRef: any = useRef(null);
	const [index, setIndex] = useState<number>(0);

	React.useEffect(() => {
		const intervalId = setInterval(
			() => setIndex(index => index + 1),
			3000 // every 3 seconds
		);
		return () => clearTimeout(intervalId);
	}, []);
	// const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);

	// useEffect(() => {
	// 	const animateNextWord = () => {
	// 		const wordElement = document.getElementById("animated-word");

	// 		gsap.to(wordElement, {
	// 			duration: 1,
	// 			y: "-100%",
	// 			ease: "ease.out",
	// 			onComplete: () => {
	// 				setCurrentWordIndex(prevIndex =>
	// 					prevIndex === words.length - 1 ? 0 : prevIndex + 1
	// 				);
	// 				gsap.to(wordElement, { duration: 1, y: "0%", ease: "ease.out" });
	// 			},
	// 		});
	// 	};

	// 	const intervalId = setInterval(animateNextWord, 3000);

	// 	return () => clearInterval(intervalId);
	// }, [currentWordIndex]);
	useEffect(() => {
		const heroHeight = heroRef.current?.offsetHeight;
		setHeroHeight(heroHeight);
	}, []);
	return (
		<div className={styles.hero} ref={heroRef}>
			<div className={styles.center}>
				<div className={styles.text}>
					<h1>
						The Marketplace For African Creators to Rent, Buy & Sell{" "}
						<TextTransition
							springConfig={presets.wobbly}
							className={styles.cta_text}
						>
							{words[index % words.length]}
						</TextTransition>
					</h1>
					<p>
						Rent, buy, or sell gears with ease within your country. Our secure
						escrow system ensures worry-free transactions
					</p>
				</div>
				<div className={styles.search}>
					<SearchBox />
				</div>
				<div className={styles.row}>
					<div className={styles.textbox}>
						<h2>100+</h2>
						<p>Trusted members (Verified)</p>
					</div>
					<div className={styles.textbox}>
						<h2>500+</h2>
						<p>Listings to choose from</p>
					</div>
					<div className={styles.textbox}>
						<h2>4.84/5</h2>
						<p>Feedbacks</p>
					</div>
				</div>
			</div>
			<div className={styles.hero_image_container}>
				<div className={styles.hero_image}>
					<Image
						src="/images/background-camera.png"
						alt="hero"
						fill
						sizes="100vw"
					/>
				</div>
			</div>
		</div>
	);
};

export default Hero;
