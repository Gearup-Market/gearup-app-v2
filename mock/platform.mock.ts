import { Platfom } from "@/interfaces";

export const platformList: Platfom[] = [
	{
		title: "Renting gear",
		description:
			"Earn money renting out your gears. We ensured all renters are 100% ID verified!",
		url: "/listings?type=rent",
		urlLabel: "Browse available rentals",
		id: 1
	},
	{
		title: "Buying gear",
		description: "Buy film gears from local creators to fuel your creative journey",
		url: "/listings?type=buy",
		urlLabel: "Explore all listings",
		id: 2
	},
	{
		title: "Selling gear",
		description:
			"Sell your gears with confidence. Our secure escrow system ensures worry-free transaction with verified buyers only",
		url: "/new-listing",
		urlLabel: "List your gear for sale",
		id: 3
	},
	{
		title: "Taking a course",
		description:
			"Take courses led by industry experts and elevate your skills to new heights",
		url: "/courses",
		urlLabel: "Explore courses",
		id: 4
	}
];
