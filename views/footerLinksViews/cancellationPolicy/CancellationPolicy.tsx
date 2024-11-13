import { DetailBlock } from "@/components/footerPagesComponent";
import { SecondaryHero } from "@/shared";
import React from "react";

const list = [
	{
		title: "Cancellation Window",
		description:
			"You can cancel your reservation up to 48 hours before your rental period starts for a full refund."
	},
	{
		title: "Late Cancellations",
		description:
			"Cancellations made less than 48 hours before the rental period will incur a cancellation fee equivalent to 25% of the total rental cost."
	},
	{
		title: "No-Shows",
		description:
			"If you fail to pick up the gear without prior notice, no refund will be issued."
	}
];

const CancellationPolicy = () => {
	return (
		<>
			<SecondaryHero
				title="Cancellation Policy"
				description="Plans change? Our cancellation policy ensures a smooth process with fair terms for both renters and lenders"
			/>
			<DetailBlock
				title="What Are The Rules For Cancellation?"
				list={list}
				description="We understand that plans can change. Here’s our cancellation policy:"
			/>
		</>
	);
};

export default CancellationPolicy;
