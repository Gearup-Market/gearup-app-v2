import { DetailBlock } from "@/components/footerPagesComponent";
import { SecondaryHero } from "@/shared";
import React from "react";

const list = [
	{
		title: "Secure Transactions",
		description:
			"All payments are processed through our secure payment gateway, ensuring that your financial information is protected."
	},
	{
		title: "Quality Assurance",
		description:
			"We vet all sellers and their listings to ensure that the gear meets our quality standards before it goes live on the platform."
	},
	{
		title: "Return Policy",
		description:
			"Most purchases come with a 30-day return policy. If you’re not satisfied with your gear, you can return it within this period for a full refund, provided it’s in its original condition."
	},
	{
		title: "Dispute Resolution",
		description:
			"In the event of a dispute with a seller (e.g., item not as described), our dedicated support team is available to help resolve issues quickly."
	},
	{
		title: "Feedback",
		description:
			"Our feedback system allows buyers to leave reviews based on their experiences, helping future customers make informed decisions."
	}
];

const BuyerProtectionView = () => {
	return (
		<>
			<SecondaryHero
				title="Buyer’s Protection"
				description="Learn more about our buyer’s protections"
			/>
			<DetailBlock
				title="How Do We Protect The Buyer?"
				list={list}
				description="We prioritize your safety and satisfaction when buying gear. Our buyer protection program includes:"
			/>
		</>
	);
};

export default BuyerProtectionView;
