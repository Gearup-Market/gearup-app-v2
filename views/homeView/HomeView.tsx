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
	Faq,
} from "@/components/home";
import dynamic from "next/dynamic";
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
			<Faq />
		</>
	);
};

export default HomeView;
