"use client";

import { useState, useEffect } from "react";

const usePercentageToPixels = (
	containerRef: React.RefObject<HTMLElement>,
	percentage: number
) => {
	const [pixelValue, setPixelValue] = useState<number>(0);

	useEffect(() => {
		const updateSize = () => {
			if (containerRef.current) {
				const containerWidth = containerRef.current.offsetWidth;
				setPixelValue((percentage / 100) * containerWidth);
			}
		};

		updateSize();
		window.addEventListener("resize", updateSize);
		return () => window.removeEventListener("resize", updateSize);
	}, [containerRef, percentage]);

	return pixelValue;
};

export default usePercentageToPixels;
