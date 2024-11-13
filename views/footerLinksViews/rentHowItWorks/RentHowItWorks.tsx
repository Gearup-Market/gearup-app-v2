import React from "react";
import styles from "./RentHowItWorks.module.scss";
import { SecondaryHero } from "@/shared";
import { Gears } from "@/components/home";
import { Benefits, Platform } from "@/components/footerPagesComponent";
import { rentBenefits } from "@/mock/benefits.mock";

const platform = [
	{
		title: "Browse the Catalog",
		description:
			"Explore our extensive selection of gear available for rent, including detailed descriptions and images.",
		id: 1
	},
	{
		title: "Select Your Gear",
		description: "Choose the items you need and specify your rental dates.",
		id: 2
	},
	{
		title: "Book Online",
		description:
			"Complete your reservation through our secure online system. You'll receive a confirmation email with all the details.",
		id: 3
	},
	{
		title: "Pick Up or Delivery",
		description:
			"Depending on the item, you can either pick it up at a designated location or have it delivered to your address.",
		id: 4
	},
	{
		title: "Return the Gear",
		description:
			"After your rental period, return the gear in its original condition to avoid any additional fees.",
		id: 5
	}
];

const RentHowItWorks = () => {
	return (
		<div className={styles.section}>
			<SecondaryHero
				smallTitle="I Want To Rent Gears"
				title="Rent Gear with Ease"
				description="Discover top-quality gear for your project needs—quick, affordable, and ready for your next adventure"
			/>
			<Platform
				title="Quickly find the perfect gear at the right price."
				description="Find the perfect gear in minutes"
				data={platform}
				image="/images/categories-1.png"
				type="rent"
				href="/rent"
				button="Explore marketplace"
			/>
			<Benefits
				title="What’s In It For Renters?"
				description="We make it super easy for you to rent gears with confidence"
				cards={rentBenefits}
			/>
			<Gears />
		</div>
	);
};

export default RentHowItWorks;
