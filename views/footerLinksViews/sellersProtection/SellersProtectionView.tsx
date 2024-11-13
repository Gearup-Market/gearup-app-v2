import { DetailBlock } from "@/components/footerPagesComponent";
import { SecondaryHero } from "@/shared";
import React from "react";

const list = [
	{
		title: "Secure Payments",
		description:
			"Payments are processed through our secure payment system, ensuring that your financial information is safe throughout the transaction"
	},
	{
		title: "Quality Checks",
		description:
			"All listings undergo a review process to ensure they meet our standards before being published, reducing the risk of disputes."
	},
	{
		title: "Return Policy Support",
		description:
			"If a buyer returns an item due to issues like misrepresentation, we assist sellers in the return process while protecting their interests."
	},
	{
		title: "Dispute Resolution",
		description:
			"Our dedicated support team is available to help resolve any disputes that may arise between sellers and buyers, ensuring fair treatment for both parties."
	},
	{
		title: "Feedback",
		description:
			"Sellers can build their reputation through buyer reviews, which enhances credibility and trust within the community."
	}
];

const SellersProtectionView = () => {
	return (
		<>
			<SecondaryHero
				title="Seller’s Protection"
				description="Learn more about our seller’s protections"
			/>
			<DetailBlock
				title="How Do We Protect The Seller?"
				list={list}
				description="We prioritize the safety and satisfaction of our sellers with great protection measures:"
			/>
		</>
	);
};

export default SellersProtectionView;
