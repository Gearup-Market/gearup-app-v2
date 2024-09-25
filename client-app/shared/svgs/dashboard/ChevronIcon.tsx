import React from "react";
interface Props {
	color?: string;
}
const ChevronIcon = ({ color = "#4B525A" }: Props) => {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M13 6L8 11L3 6"
				stroke={color}
				strokeWidth="3.0"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default ChevronIcon;
