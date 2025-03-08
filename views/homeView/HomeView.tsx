import React from "react";
import styles from "./Home.module.scss";
import {
	Hero,
	HomeInfo,
	Platform,
	Categories,
	Listings,
	Gears,
	Equipments,
	Courses,
	Reviews,
	Faq
} from "@/components/home";
import dynamic from "next/dynamic";
import { faq } from "@/mock";
const ScrollComponent = dynamic(
	() => import("@/components/home/scrollComponent/ScrollComponent")
);

const HomeView = () => {
	return (
		<>
			<Hero />
			<HomeInfo />
			<Platform />
			<Categories />
			<Listings />
			<Gears />
			<Equipments />
			<Courses />
			<Reviews />
			<ScrollComponent />
			<Faq faq={faq.slice(0, 6)} />
		</>
	);
};

export default HomeView;
