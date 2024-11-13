import { Platform, SecondaryCategories } from "@/components/footerPagesComponent";
import { Gears } from "@/components/home";
import { SecondaryHero } from "@/shared";
import React from "react";

const platform = [
	{
		title: "List your gear",
		description:
			"Showcase your inventory by creating listings and get purchase requests.",
		id: 1
	},
	{
		title: "Ship / handover",
		description: "Send the gear insured or hand over in person.",
		id: 2
	},
	{
		title: "Receive payment",
		description: "When the buyer confirms the order you receive your funds.",
		id: 3
	},
	{
		title: "feedback & Reviews",
		description: "Get and give feedback on your experience.",
		id: 4
	}
];

const SellHowitWorks = () => {
	return (
		<>
			<SecondaryHero
				smallTitle="I want To Sell My Gear"
				title="Sell Your Gear to Other Creators"
				description="Easily list and sell your equipment to those who need it, freeing up space and gaining extra cash."
			/>
			<Platform
				title="You can make money selling your gears to film makers "
				description="Easy steps to making money"
				data={platform}
				image="/images/HIW-sell.png"
				href="/new-listing"
				button="Create a listing"
			/>
			<SecondaryCategories
				title="Lender can list gears & Manage  rentals"
				description="List gears of any category and manage your rentals"
			/>
			<Gears />
		</>
	);
};

export default SellHowitWorks;
