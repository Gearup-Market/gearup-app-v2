"use client";
import React, { useRef } from "react";
import styles from "./TotalEarnings.module.scss";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { customisedTableClasses } from "@/utils/classes";
import { EllipseIcon } from "@/shared/svgs/dashboard";
import { PieChartComponent } from "@/shared";
import TotalEarningsCard from "./Components/TotalEarningsCard/TotalEarningsCard";
import { useFetchUserSalesAnalytics } from "@/app/api/hooks/analytics";
import { GearData } from "@/app/api/hooks/analytics/types";
import { useAppSelector } from "@/store/configureStore";
import { formatNum } from "@/utils";
import { usePercentageToPixels } from "@/hooks";

const TotalEarnings = () => {
	const { userId } = useAppSelector(state => state.user);
	const { data: salesData } = useFetchUserSalesAnalytics(userId as string);
	const containerRef = useRef<HTMLDivElement>(null);

	const typeWidth = usePercentageToPixels(containerRef, 20);
	const productsWidth = usePercentageToPixels(containerRef, 20);
	const revenueWidth = usePercentageToPixels(containerRef, 20);
	const valueWidth = usePercentageToPixels(containerRef, 20);

	const sharedColDef: GridColDef = {
		field: "",
		sortable: true,
		flex: 1
	};

	const COLORS = ["#F76039", "#AF4428", "#FBB6A4"];

	const columns: GridColDef[] = [
		{
			...sharedColDef,
			field: "name",
			cellClassName: styles.table_cell,
			headerName: "Type",
			headerClassName: styles.table_header,
			minWidth: typeWidth,
			renderCell: ({ value }) => (
				<div className={styles.container__type_container}>
					<EllipseIcon
						color={
							value === "gearRentals"
								? "#F76039"
								: value === "gearSales"
								? "#AF4428"
								: "#FBB6A4"
						}
					/>
					<p style={{ fontSize: "1.2rem" }}>
						{tableEnum[value as keyof typeof tableEnum]}
					</p>
				</div>
			)
		},
		{
			...sharedColDef,
			field: "productCount",
			cellClassName: styles.table_cell,
			headerName: "No of Products",
			headerClassName: styles.table_header,
			minWidth: productsWidth
		},
		{
			...sharedColDef,
			field: "percentage",
			cellClassName: styles.table_cell,
			headerName: "% of Revenue",
			headerClassName: styles.table_header,
			minWidth: revenueWidth
		},
		{
			...sharedColDef,
			field: "amount",
			cellClassName: styles.table_cell,
			headerName: "Value",
			headerClassName: styles.table_header,
			minWidth: valueWidth
		}
	];

	const rows = convertObjToArray(salesData?.breakdown as GearData) || [];

	return (
		<div className={styles.container}>
			<div className={styles.container__pie_chart_container}>
				<PieChartComponent
					data={rows}
					colors={COLORS}
					totalEarnings={salesData?.totalEarnings}
				/>
				<ul>
					{rows?.map((item, index) => (
						<li key={index}>
							<EllipseIcon color={COLORS[index]} />
							<p>{tableEnum[item.name as keyof typeof tableEnum]}</p>
						</li>
					))}
				</ul>
			</div>
			<div style={{ width: "100%" }} className={styles.container__table}>
				<DataGrid
					rows={rows}
					sx={customisedTableClasses}
					columns={columns}
					hideFooter
					autoHeight
					paginationMode="server"
					getRowId={row => row.id}
				/>
			</div>
			<ul className={styles.container__cards}>
				{rows.map(item => (
					<TotalEarningsCard item={item} key={item.id} />
				))}
			</ul>
		</div>
	);
};

export default TotalEarnings;

export enum tableEnum {
	"gearSales" = "Gear Sales",
	"gearRentals" = "Gear Rentals",
	"productCount" = "No of Products"
}

export const convertObjToArray = (obj: GearData) => {
	if (!obj) return [];
	return Object.entries(obj).map(([key, value]) => ({
		id: key,
		name: key,
		amount: formatNum(value.amount),
		percentage: value.percentage,
		productCount: value.productCount,
		value: !!value.amount ? value.amount : 50
	}));
};
