import { DetailBlock } from "@/components/footerPagesComponent";
import { SecondaryHero } from "@/shared";
import React from "react";

const list = [
	{
		title: "Coverage Details",
		description:
			"Our insurance policy covers accidental damage, theft, fire, and other specified risks while the equipment is in your possession."
	},
	{
		title: "Flexible Terms",
		description:
			"You can choose coverage for short-term rentals (starting at one day) or opt for longer terms based on your needs."
	},
	{
		title: "Claims Process",
		description:
			"In case of damage or loss, you can submit a claim directly through our platform for prompt assistance."
	}
];

const InsuranceCoverage = () => {
	return (
		<>
			<SecondaryHero
				title="Insurance Protection for Your Gear"
				description="GearUp’s insurance policies protect your assets against risks, letting you rent and lend with confidence."
			/>
			<DetailBlock
				title="Insurance Coverage"
				list={list}
				description="We offer insurance coverage options for rented gear to protect against unforeseen incidents:"
			/>
		</>
	);
};

export default InsuranceCoverage;
