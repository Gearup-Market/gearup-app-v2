import React from "react";

const MultiOwnership = () => {
	return (
		<svg
			viewBox="0 0 160 40"
			xmlns="http://www.w3.org/2000/svg"
			style={{ width: "100%", height: "100%" }}
			// style={{ transform: "scale(0.3)" }}
		>
			{/* <!-- Background --> */}
			<rect x="0" y="0" width="160" height="40" rx="20" fill="#1b1e21" />

			{/* <!-- Chain Link Symbol --> */}
			<g transform="translate(18, 8)">
				<path
					d="M16,12 L16,8 C16,4.686 13.314,2 10,2 C6.686,2 4,4.686 4,8 L4,12 M8,14 L8,18 C8,21.314 10.686,24 14,24 C17.314,24 20,21.314 20,18 L20,14"
					stroke="#FFFFFF"
					stroke-width="3"
					stroke-linecap="round"
					fill="none"
				/>
			</g>

			{/* <!-- Text --> */}
			<text
				x="48"
				y="24"
				// font-family="Arial, sans-serif"
				font-size="14"
				font-weight="bold"
				fill="white"
			>
				Multi-Ownership
			</text>

			{/* <!-- Web3 Sparkles --> */}
			{/* <circle cx="148" y="12" r="2" fill="#77F0ED" />
			<circle cx="144" y="20" r="1.5" fill="#77F0ED" />
			<circle cx="150" y="24" r="1" fill="#77F0ED" /> */}
		</svg>
	);
};

export default MultiOwnership;
