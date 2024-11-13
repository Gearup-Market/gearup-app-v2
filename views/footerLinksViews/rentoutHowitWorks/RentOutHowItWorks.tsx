import { Platform, SecondaryCategories } from "@/components/footerPagesComponent";
import { Gears } from "@/components/home";
import { SecondaryHero } from "@/shared";
import React from "react";

const platform = [
	{
		title: "List your gear",
		description:
			"Showcase your inventory by creating listings and get rental requests.",
		id: 1
	},
	{
		title: "Receive Rental Requests",
		description:
			"Once a request is received and approved, proceed to prepare the gear for handover.",
		id: 2
	},
	{
		title: "Get insured and handover",
		description:
			"Provide the renter with your rental agreement and sign the contract together",
		id: 3
	},
	{
		title: "Return & feedback",
		description:
			"Get your gear back and give the renter feedback on your experience.",
		id: 4
	}
];

const RentOutHowItWorks = () => {
	return (
		<>
			<SecondaryHero
				smallTitle="I want To Rent Out"
				title="Earn by Renting Out Your Gear"
				description="Put your unused gear to work. List, rent out, and start earning while helping fellow creators"
			/>
			<Platform
				title="You can money renting out your gears "
				description="Easy steps to making money"
				data={platform}
				image="/images/HIW-rentout.png"
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

export default RentOutHowItWorks;
