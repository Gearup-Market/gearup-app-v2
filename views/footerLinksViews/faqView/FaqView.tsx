import { Faq } from "@/components/home";
import { faq } from "@/mock";
import { SecondaryHero } from "@/shared";
import React from "react";

const FaqView = () => {
	return (
		<>
			<SecondaryHero
				title="Frequently Asked Questions"
				description="Check out our FAQs for details on rentals, sales, payments, and everything else"
			/>
			<Faq faq={faq} isPage />
		</>
	);
};

export default FaqView;
