"use client";

import React from "react";
import { Switch } from "@mui/material";

interface Props {
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	checked?: boolean;
	disabled?: boolean;
}
const ToggleSwitch = ({ onChange, checked, disabled }: Props) => {
	return (
		<Switch
			onChange={onChange}
			checked={checked}
			sx={{
				"& .MuiSwitch-switchBase.Mui-checked": {
					color: "#FFB514",
					"&:hover": {
						backgroundColor: "rgba(255, 64, 129, 0.08)"
					}
				},
				"& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
					backgroundColor: "transparent",
					border: "1px solid #FFB514"
				}
			}}
			disabled={disabled}
		/>
	);
};

export default ToggleSwitch;
