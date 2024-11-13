import { DetailBlock } from "@/components/footerPagesComponent";
import { SecondaryHero } from "@/shared";
import React from "react";

const list = [
	{
		title: "Funds Held Securely",
		description:
			"When you book your gear, your payment is held in escrow until the rental period is completed. This protects both parties involved."
	},
	{
		title: "Release of Funds",
		description:
			"Once the gear is returned in good condition, the funds are released to the owner. If there are any disputes regarding damage or late returns, funds may be withheld until resolved."
	},
	{
		title: "Transparency",
		description:
			"This system provides transparency and peace of mind, knowing that your payment is secure throughout the rental process."
	}
];

const EscrowPayment = () => {
	return (
		<>
			<SecondaryHero
				title="Secure Escrow Payment?"
				description="Your funds are held securely until the job is completed, ensuring trust and reliability in every transaction."
			/>
			<DetailBlock
				title="Why Escrow Payment"
				list={list}
				description="To ensure a secure transaction for both renters and gear owners, we make use of an escrow payment system. Here’s how it works:"
			/>
		</>
	);
};

export default EscrowPayment;
