import React from "react";
import styles from "./CircularProgressLoader.module.scss";
import { CircularProgress } from "@mui/material";

interface CircularProgressLoaderProps {
	color?: string;
	size?: number;
}

const CircularProgressLoader = ({ size, color }: CircularProgressLoaderProps) => {
	return <CircularProgress size={size} style={{ color: color }} />;
};

export default CircularProgressLoader;
