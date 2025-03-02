import React from "react";

interface Props {
	color?: string;
}

const CheckmarkIcon = ({ color = "#1B1E21" }: Props) => {
	return (
		<svg
			width="15"
			height="12"
			style={{ width: "100%", height: "100%" }}
			viewBox="0 0 15 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M14.7367 1.25891L4.92015 11.0755L0.420898 6.57621L1.57434 5.42276L4.92015 8.76039L13.5832 0.105469L14.7367 1.25891Z"
				fill={color}
			/>
		</svg>
	);
};

export default CheckmarkIcon;
