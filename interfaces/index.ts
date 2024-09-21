// navlink interfaces

export interface NavLinkMenu {
	label: string;
	id?: string;
	href: string;
	external: boolean;
	icon?: string;
}

export interface NavLinkSub {
	label: string;
	menu: NavLinkMenu[];
}

export interface NavLink {
	label: string;
	id?: string;
	href: string;
	external: boolean;
	videoUrl?: string;
	subMenu?: NavLinkSub[];
	title?: string;
	description?: string;
	button?: string;
	icon: string;
}

// platform

export interface Platfom {
	title: string;
	description: string;
	url: string;
	urlLabel: string;
	id: number;
}

// categories

export interface Categories {
	title: string;
	image: string;
	url: string;
}

// listings

export interface Listings {
	label: string;
	type: "rent" | "buy";
	image: string;
	user: string;
	avatar: string;
	reviews: number;
	price: number;
}

// courses

export interface Courses {
	label: string;
	image: string;
	user: string;
	avatar: string;
	reviews: number;
	price: number;
	type: "ebook" | "live" | "audio" | "video";
}

export enum ListingType {
	Buy = "buy",
	Rent = "rent",
	Both = 'both'
}
