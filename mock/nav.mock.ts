import { NavLink } from "@/interfaces";

export const navLinks: NavLink[] = [
	{
		label: "rent gears",
		href: "/listings?type=rent",
		external: false,
		videoUrl: "#",
		icon: "/svgs/icon-rent-gear.svg",
		subMenu: [
			{
				label: "categories",
				menu: [
					{
						label: "All gears",
						href: "/listings?type=rent",
						icon: "/svgs/icon-all-gears.svg",
						external: false
					},
					{
						label: "Camera",
						href: "/listings?type=rent&category=cameras",
						icon: "/svgs/icon-camera.svg",
						external: false
					},
					{
						label: "Lenses",
						href: "/listings?type=rent&category=lenses",
						icon: "/svgs/icon-lenses.svg",
						external: false
					},
					{
						label: "Audio",
						href: "/listings?type=rent&category=audio",
						icon: "/svgs/icon-audio.svg",
						external: false
					},
					{
						label: "Lighting",
						href: "/listings?type=rent&category=lighting",
						icon: "/svgs/icon-lighting.svg",
						external: false
					},
					{
						label: "Gimbals",
						href: "/listings?type=rent&category=gimbals",
						icon: "/svgs/icon-camera.svg",
						external: false
					},
					{
						label: "Drones",
						href: "/listings?type=rent&category=drones",
						icon: "/svgs/icon-drones.svg",
						external: false
					},
					{
						label: "Grip",
						href: "/listings?type=rent&category=grip",
						icon: "/svgs/icon-grip.svg",
						external: false
					}
				]
			},
			{
				label: "get started",
				menu: [
					{
						label: "How it works",
						href: "/how-it-works-rent",
						id: "faq-how-it-works",
						external: false
					},
					{
						label: "Gearup Insurance Coverage",
						href: "/insurance-coverage",
						id: "faq-how-it-works",
						external: false
					},
					{
						label: "Can I cancel my rental?",
						href: "/",
						id: "faq-how-it-works",
						external: false
					},
					{
						label: "How do I get verified?",
						href: "/",
						id: "faq-how-it-works",
						external: false
					},
					{
						label: "How much fee do I pay?",
						href: "/",
						id: "faq-how-it-works",
						external: false
					}
				]
			}
		]
	},
	{
		label: "buy gears",
		href: "/listings?type=buy",
		external: false,
		videoUrl: "#",
		icon: "/svgs/icon-buy-gear.svg",
		subMenu: [
			{
				label: "categories",
				menu: [
					{
						label: "all gears",
						href: "/listings?type=buy",
						icon: "/svgs/icon-all-gears.svg",
						external: false
					},
					{
						label: "camera",
						href: "/listings?type=buy&category=cameras",
						icon: "/svgs/icon-camera.svg",
						external: false
					},
					{
						label: "lenses",
						href: "/listings?type=buy&category=lenses",
						icon: "/svgs/icon-lenses.svg",
						external: false
					},
					{
						label: "audio",
						href: "/listings?type=buy&category=audio",
						icon: "/svgs/icon-audio.svg",
						external: false
					},
					{
						label: "lighting",
						href: "/listings?type=buy&category=lighting",
						icon: "/svgs/icon-lighting.svg",
						external: false
					},
					{
						label: "gimbals",
						href: "/listings?type=buy&category=gimbals",
						icon: "/svgs/icon-camera.svg",
						external: false
					},
					{
						label: "drones",
						href: "/listings?type=buy&category=drones",
						icon: "/svgs/icon-drones.svg",
						external: false
					},
					{
						label: "grip",
						href: "/listings?type=buy&category=grip",
						icon: "/svgs/icon-grip.svg",
						external: false
					}
				]
			},
			{
				label: "get started",
				menu: [
					{
						label: "how it works",
						href: "/how-it-works-buy",
						id: "faq-how-it-works",
						external: false
					},
					{
						label: "Gearup Insurance Coverage",
						href: "/insurance-coverage",
						id: "faq-how-it-works",
						external: false
					},
					{
						label: "Can I cancel my rental?",
						href: "/",
						id: "faq-how-it-works",
						external: false
					},
					{
						label: "How do I get verified?",
						href: "/",
						id: "faq-how-it-works",
						external: false
					},
					{
						label: "How much fee do I pay?",
						href: "/",
						id: "faq-how-it-works",
						external: false
					}
				]
			}
		]
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
						href: "/how-it-works-sell",
						id: "faq-how-it-works",
						external: false
					},
					{
						label: "Gearup Insurance Coverage",
						href: "/",
						id: "faq-how-it-works",
						external: false
					},
					{
						label: "Can I cancel my rental?",
						href: "/",
						id: "faq-how-it-works",
						external: false
					},
					{
						label: "How do I get verified?",
						href: "/",
						id: "faq-how-it-works",
						external: false
					}
				]
			}
		]
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
						href: "/how-it-works-rentout",
						id: "faq-how-it-works",
						external: false
					},
					{
						label: "Gearup Insurance Coverage",
						href: "/",
						id: "faq-how-it-works",
						external: false
					},
					{
						label: "Can I cancel my rental?",
						href: "/",
						id: "faq-how-it-works",
						external: false
					},
					{
						label: "How do I get verified?",
						href: "/",
						id: "faq-how-it-works",
						external: false
					}
				]
			}
		]
	},
	{
		label: "courses",
		href: "/courses",
		icon: "/svgs/icon-courses.svg",
		external: false
	},
	{
		label: "blog",
		href: "/blog",
		icon: "/svgs/icon-courses.svg",
		external: true
	}
];

export const footerNavLink = [
	{
		label: "Rent gear",
		links: [
			{
				label: "How it works",
				href: "/how-it-works-rent",
				external: false
			},
			{
				label: "Escrow Payment",
				href: "/escrow-payment",
				external: false
			},
			{
				label: "Insurance coverage",
				href: "/insurance-coverage",
				external: false
			},
			{
				label: "Cancellation",
				href: "/cancellation-policy",
				external: false
			}
		]
	},
	{
		label: "Buy gear",
		links: [
			{
				label: "How it works",
				href: "/how-it-works-buy",
				external: false
			},
			{
				label: "Buyer Protection",
				href: "/buyer-protection",
				external: false
			}
		]
	},
	{
		label: "Sell gear",
		links: [
			{
				label: "How it works",
				href: "/how-it-works-sell",
				external: false
			},
			{
				label: "Create listing",
				href: "/new-listing",
				external: false
			},
			{
				label: "Seller protection",
				href: "seller-protection",
				external: false
			}
		]
	},
	{
		label: "Rent out",
		links: [
			{
				label: "How it works",
				href: "/how-it-works-rentout",
				external: false
			},
			{
				label: "Create listing",
				href: "/new-listing",
				external: false
			},
			{
				label: "Insurance coverage",
				href: "/insurance-coverage",
				external: false
			}
		]
	},
	{
		label: "Courses",
		links: [
			{
				label: "How it works",
				href: "/how-it-works-courses",
				external: false
			},
			{
				label: "How to list a course",
				href: "/how-to-list-a-course",
				external: false
			},
			{
				label: "Becoming a mentor",
				href: "/becoming-a-mentor",
				external: false
			},
			{
				label: "Refund Policy",
				href: "/refund-policy",
				external: false
			},
			{
				label: "Types of course and duration",
				href: "/types-of-course-and-duration",
				external: false
			}
		]
	},
	{
		label: "Blog",
		links: [
			{
				label: "Masterclass",
				href: "/masterclass",
				external: false
			},
			{
				label: "Learn film-making",
				href: "/learn-film-making",
				external: false
			},
			{
				label: "Learn photography",
				href: "/learn-photography",
				external: false
			},
			{
				label: "Learn cinematography",
				href: "/learn-cinematography",
				external: false
			}
		]
	}
];

export const socialMediaLinks = [
	{
		label: "twitter",
		href: "https://x.com/gearupmarket",
		icon: "/svgs/x-footer-icon.svg"
	},
	{
		label: "linkedIn",
		href: "https://www.linkedin.com/company/gearup-market/",
		icon: "/svgs/icon-linkedin.svg"
	},
	{
		label: "facebook",
		href: "https://www.facebook.com/GearUpmarket",
		icon: "/svgs/icon-facebook.svg"
	},
	// {
	// 	label: "github",
	// 	href: "https://www.instagram.com/gearup.market",
	// 	icon: "/svgs/icon-github.svg",
	// },
	{
		label: "instagram",
		href: "https://www.instagram.com/gearup.market",
		icon: "/svgs/inst-footer-icon.svg"
	},
	{
		label: "tiktok",
		href: "hhttps://www.tiktok.com/@gearup.market",
		icon: "/svgs/tiktok-footer-icon.svg"
	}
];
