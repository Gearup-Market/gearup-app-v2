import { NavLink } from "@/interfaces";

export const navLinks: NavLink[] = [
	{
		label: "rent gears",
		href: "/rent",
		external: false,
		videoUrl: "#",
		icon: "/svgs/icon-rent-gear.svg",
		subMenu: [
			{
				label: "categories",
				menu: [
					{
						label: "All gears",
						href: "/all-gears",
						icon: "/svgs/icon-all-gears.svg",
						external: false,
					},
					{
						label: "Camera",
						href: "/camera",
						icon: "/svgs/icon-camera.svg",
						external: false,
					},
					{
						label: "Lenses",
						href: "/lenses",
						icon: "/svgs/icon-lenses.svg",
						external: false,
					},
					{
						label: "Audio",
						href: "/audio",
						icon: "/svgs/icon-audio.svg",
						external: false,
					},
					{
						label: "Lighting",
						href: "/lighting",
						icon: "/svgs/icon-lighting.svg",
						external: false,
					},
					{
						label: "Gimbals",
						href: "/gimbals",
						icon: "/svgs/icon-camera.svg",
						external: false,
					},
					{
						label: "Drones",
						href: "/drones",
						icon: "/svgs/icon-drones.svg",
						external: false,
					},
					{
						label: "Grip",
						href: "/grip",
						icon: "/svgs/icon-grip.svg",
						external: false,
					},
				],
			},
			{
				label: "get started",
				menu: [
					{
						label: "How it works",
						href: "/",
						id: "faq-how-it-works",
						external: false,
					},
					{
						label: "Gearup Insurance Coverage",
						href: "/",
						id: "faq-how-it-works",
						external: false,
					},
					{
						label: "Can I cancel my rental?",
						href: "/",
						id: "faq-how-it-works",
						external: false,
					},
					{
						label: "How do I get verified?",
						href: "/",
						id: "faq-how-it-works",
						external: false,
					},
					{
						label: "How much fee do I pay?",
						href: "/",
						id: "faq-how-it-works",
						external: false,
					},
				],
			},
		],
	},
	{
		label: "buy gears",
		href: "/buy",
		external: false,
		videoUrl: "#",
		icon: "/svgs/icon-buy-gear.svg",
		subMenu: [
			{
				label: "categories",
				menu: [
					{
						label: "all gears",
						href: "/all-gears",
						icon: "/svgs/icon-all-gears.svg",
						external: false,
					},
					{
						label: "camera",
						href: "/camera",
						icon: "/svgs/icon-camera.svg",
						external: false,
					},
					{
						label: "lenses",
						href: "/lenses",
						icon: "/svgs/icon-lenses.svg",
						external: false,
					},
					{
						label: "audio",
						href: "/audio",
						icon: "/svgs/icon-audio.svg",
						external: false,
					},
					{
						label: "lighting",
						href: "/lighting",
						icon: "/svgs/icon-lighting.svg",
						external: false,
					},
					{
						label: "gimbals",
						href: "/gimbals",
						icon: "/svgs/icon-camera.svg",
						external: false,
					},
					{
						label: "drones",
						href: "/drones",
						icon: "/svgs/icon-drones.svg",
						external: false,
					},
					{
						label: "grip",
						href: "/grip",
						icon: "/svgs/icon-grip.svg",
						external: false,
					},
				],
			},
			{
				label: "get started",
				menu: [
					{
						label: "how it works",
						href: "/",
						id: "faq-how-it-works",
						external: false,
					},
					{
						label: "Gearup Insurance Coverage",
						href: "/",
						id: "faq-how-it-works",
						external: false,
					},
					{
						label: "Can I cancel my rental?",
						href: "/",
						id: "faq-how-it-works",
						external: false,
					},
					{
						label: "How do I get verified?",
						href: "/",
						id: "faq-how-it-works",
						external: false,
					},
					{
						label: "How much fee do I pay?",
						href: "/",
						id: "faq-how-it-works",
						external: false,
					},
				],
			},
		],
	},
	{
		label: "sell gears",
		href: "/new-listing",
		external: false,
		videoUrl: "#",
		title: "Selling a gear",
		description:
			"Sell your gears with confidence. Our secure escrow system ensures worry-free transaction with verified buyers only",
		button: "Create a listing",
		icon: "/svgs/icon-sell-gear.svg",
		subMenu: [
			{
				label: "get started",
				menu: [
					{
						label: "how it works",
						href: "/",
						id: "faq-how-it-works",
						external: false,
					},
					{
						label: "Gearup Insurance Coverage",
						href: "/",
						id: "faq-how-it-works",
						external: false,
					},
					{
						label: "Can I cancel my rental?",
						href: "/",
						id: "faq-how-it-works",
						external: false,
					},
					{
						label: "How do I get verified?",
						href: "/",
						id: "faq-how-it-works",
						external: false,
					},
				],
			},
		],
	},
	{
		label: "rent out",
		href: "/new-listing",
		external: false,
		title: "Rent out a gear",
		description:
			"Earn money renting out your gears. We ensured all renters are 100% ID verified!",
		button: "Create a listing",
		icon: "/svgs/icon-rent-out.svg",
		subMenu: [
			{
				label: "get started",
				menu: [
					{
						label: "how it works",
						href: "/",
						id: "faq-how-it-works",
						external: false,
					},
					{
						label: "Gearup Insurance Coverage",
						href: "/",
						id: "faq-how-it-works",
						external: false,
					},
					{
						label: "Can I cancel my rental?",
						href: "/",
						id: "faq-how-it-works",
						external: false,
					},
					{
						label: "How do I get verified?",
						href: "/",
						id: "faq-how-it-works",
						external: false,
					},
				],
			},
		],
	},
	{
		label: "courses",
		href: "/courses",
		icon: "/svgs/icon-courses.svg",
		external: false,
	},
	{
		label: "blog",
		href: "/blog",
		icon: "/svgs/icon-courses.svg",
		external: true,
	},
];

export const footerNavLink = [
	{
		label: "Rent gear",
		links: [
			{
				label: "How it works",
				href: "#",
				external: false,
			},
			{
				label: "Escrow Payment",
				href: "#",
				external: false,
			},
			{
				label: "Insurance coverage",
				href: "#",
				external: false,
			},
			{
				label: "Cancellation",
				href: "#",
				external: false,
			},
		],
	},
	{
		label: "Buy gear",
		links: [
			{
				label: "How it works",
				href: "#",
				external: false,
			},
			{
				label: "Buyer Protection",
				href: "#",
				external: false,
			},
		],
	},
	{
		label: "Sell gear",
		links: [
			{
				label: "How it works",
				href: "#",
				external: false,
			},
			{
				label: "Create listing",
				href: "#",
				external: false,
			},
			{
				label: "Seller protection",
				href: "#",
				external: false,
			},
		],
	},
	{
		label: "Rent out",
		links: [
			{
				label: "How it works",
				href: "#",
				external: false,
			},
			{
				label: "Create listing",
				href: "#",
				external: false,
			},
			{
				label: "Insurance coverage",
				href: "#",
				external: false,
			},
		],
	},
	{
		label: "Courses",
		links: [
			{
				label: "Masterclass",
				href: "#",
				external: false,
			},
			{
				label: "Learn film-making",
				href: "#",
				external: false,
			},
			{
				label: "Learn photography",
				href: "#",
				external: false,
			},
			{
				label: "Learn cinematography",
				href: "#",
				external: false,
			},
		],
	},
];

export const socialMediaLinks = [
	{
		label: "twitter",
		href: "#",
		icon: "/svgs/icon-twitter.svg",
	},
	{
		label: "linkedIn",
		href: "#",
		icon: "/svgs/icon-linkedin.svg",
	},
	{
		label: "facebook",
		href: "#",
		icon: "/svgs/icon-facebook.svg",
	},
	{
		label: "github",
		href: "#",
		icon: "/svgs/icon-github.svg",
	},
];
