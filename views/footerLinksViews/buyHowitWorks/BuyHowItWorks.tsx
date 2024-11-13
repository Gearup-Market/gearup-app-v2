import { Benefits, Platform } from "@/components/footerPagesComponent";
import { Gears } from "@/components/home";
import { buyBenefits } from "@/mock/benefits.mock";
import { SecondaryHero } from "@/shared";
import React from "react";

const platform = [
	{
		title: "Explore Our Inventory",
		description:
			"Browse our extensive catalog of gear, which includes both new and used items.",
		id: 1
	},
	{
		title: "Select Your Item",
		description:
			"Once you find the gear you want to buy, click on the listing for more information, including specifications, pricing, and seller ratings.",
		id: 2
	},
	{
		title: "Add to Cart",
		description:
			"If you decide to purchase, add the item to your cart. You can continue shopping or proceed to checkout.",
		id: 3
	},
	{
		title: "Checkout Process",
		description:
			" Review your cart, enter your shipping information, and select your preferred payment method.",
		id: 4
	},
	{
		title: "Receive Your Gear",
		description:
			"Your purchased gear will be shipped directly to your specified address or made available for local pickup, depending on the seller's preferences.",
		id: 5
	}
];

const BuyHowItWorks = () => {
	return (
		<>
			<SecondaryHero
				smallTitle="I want To Buy Gears"
				title="Buy Gear That Fits Your Vision"
				description="Find the perfect gear for your projects with options for every skill level and budget."
			/>
			<Platform
				title="Buy gears with confidence"
				description="Find the perfect gear for your projects"
				data={platform}
				image="/images/HIW-buy.png"
				type="buy"
				href="/buy"
				button="Explore marketplace"
			/>
			<Benefits
				title="What’s In It For Buyers?"
				description="We make it super easy for you to buy gears with confidence"
				cards={buyBenefits}
			/>
			<Gears />
		</>
	);
};

export default BuyHowItWorks;
