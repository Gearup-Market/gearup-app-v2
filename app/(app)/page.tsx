"use client";

import { HomeView } from "@/views";
<<<<<<< HEAD
import { useCallback, useEffect, useState } from "react";

export default function Home() {
	const [ssr, setSsr] = useState(false);

	useEffect(() => {
		setSsr(false);
	}, []);

	const init = useCallback(async () => {

		if (window === undefined) return;
=======
import { useCallback, useEffect } from "react";

export default function Home() {
	const init = useCallback(async () => {
>>>>>>> ef3643d0d0927c1731578b17d8df37e087c513fe
		// check if device is mobile
		const width = window.innerWidth;
		const ismobile: boolean = width <= 650;

		// import animations
		const App = (await import("@/animations")).App;

		// initialize new animation
		new App({ ismobile });
	}, []);

	useEffect(() => {
		init();
	}, []);
<<<<<<< HEAD
	if (ssr) return null;
=======
>>>>>>> ef3643d0d0927c1731578b17d8df37e087c513fe
	return <HomeView />;
}
