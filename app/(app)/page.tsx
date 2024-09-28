"use client";

import { HomeView } from "@/views";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
	const [ssr, setSsr] = useState(false);

	useEffect(() => {
		setSsr(false);
	}, []);

	// const init = useCallback(async () => {

	// 	// if (typeof window === 'undefined') return;
	// 	// check if device is mobile
	// 	// const width = window.innerWidth;
	// 	// const ismobile: boolean = width <= 650;

	// 	// import animations
	// 	const App = (await import("@/animations")).App;

	// 	// initialize new animation
	// 	new App({ ismobile });
	// }, []);

	// useEffect(() => {
	// 	init();
	// }, []);
	if (ssr) return null;
	return <HomeView />;
}
