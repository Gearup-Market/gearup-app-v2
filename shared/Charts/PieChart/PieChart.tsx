"use client";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";
import styles from "./PieChart.module.scss";
import { GearData, SalesAnalyticsData } from "@/app/api/hooks/analytics/types";

interface Props {
	data?: any;
	colors: any;
	totalEarnings?: number;
}

const PieChartComponent = ({ data, colors, totalEarnings }: Props) => {
	return (
		<div className={styles.container}>
			<ResponsiveContainer width={200} height={200}>
				<PieChart>
					<Pie
						data={data}
						cx="50%"
						cy="50%"
						innerRadius={70}
						outerRadius={100}
						fill="#8884d8"
						paddingAngle={10}
						dataKey="value"
						nameKey="name"
					>
						{data?.map((entry: any, index: number) => (
							<Cell
								key={`cell-${index}`}
								fill={colors[index % colors.length]}
							/>
						))}
						<Label
							content={<CustomLabel totalEarning={totalEarnings} />}
							position="center"
						/>
					</Pie>
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
};

export default PieChartComponent;

const CustomLabel = ({ viewBox, totalEarning }: any) => {
	const { cx, cy } = viewBox;
	return (
		<g>
			<text x={cx} y={cy} textAnchor="middle" dominantBaseline="central">
				<tspan x={cx} dy="-1.2em" fontSize="16" fontWeight="normal">
					Total Earnings
				</tspan>
				<tspan x={cx} dy="1.2em" fontSize="16" fontWeight="bold">
					{totalEarning}
				</tspan>
			</text>
		</g>
	);
};
