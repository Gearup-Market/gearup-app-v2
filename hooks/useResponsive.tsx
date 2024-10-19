'use client';
import { useState, useEffect } from "react";

// Define screen size ranges
const breakpoints = {
	mobile: 0,
	tablet: 768,
	laptop: 1024,
	desktop: 1280,
	largeDesktop: 1600
};

export const useResponsive = () => {
	const [isMobile, setIsMobile] = useState(false);
	const [isTablet, setIsTablet] = useState(false);
	const [isLaptop, setIsLaptop] = useState(false);
	const [isDesktop, setIsDesktop] = useState(false);
	const [isLargeDesktop, setIsLargeDesktop] = useState(false);

	const updateScreenType = (width: number) => {
		setIsMobile(width >= breakpoints.mobile && width < breakpoints.tablet);
		setIsTablet(width >= breakpoints.tablet && width < breakpoints.laptop);
		setIsLaptop(width >= breakpoints.laptop && width < breakpoints.desktop);
		setIsDesktop(width >= breakpoints.desktop && width < breakpoints.largeDesktop);
		setIsLargeDesktop(width >= breakpoints.largeDesktop);
	};

	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;
			updateScreenType(width);
		};

		// Set initial value
		handleResize();

		// Add event listener to track window resize
		window.addEventListener("resize", handleResize);

		// Clean up the event listener on component unmount
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return { isMobile, isTablet, isLaptop, isDesktop, isLargeDesktop };
};
