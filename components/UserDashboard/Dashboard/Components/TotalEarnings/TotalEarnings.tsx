"use client";
import React from "react";
import styles from "./TotalEarnings.module.scss";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { customisedTableClasses } from "@/utils/classes";
import { EllipseIcon } from "@/shared/svgs/dashboard";
import { PieChartComponent } from "@/shared";
import TotalEarningsCard from "./Components/TotalEarningsCard/TotalEarningsCard";
import { useFetchUserSalesAnalytics } from "@/app/api/hooks/analytics";
import { useAuth } from "@/contexts/AuthContext";
import { GearData } from "@/app/api/hooks/analytics/types";

const TotalEarnings = () => {
	const { user } = useAuth();
	const { data: salesData } = useFetchUserSalesAnalytics(user?._id as string);
	const sharedColDef: GridColDef = {
		field: "",
		sortable: true,
		flex: 1
	};

	const COLORS = ["#FFB30F", "#B57F0B", "#FFE7B5"];

	const columns: GridColDef[] = [
		{
			...sharedColDef,
			field: "name",
			cellClassName: styles.table_cell,
			headerName: "Type",
			headerClassName: styles.table_header,
			minWidth: 150,
			renderCell: ({ value }) => (
				<div className={styles.container__type_container}>
					<EllipseIcon
						color={
							value === "gearRentals"
								? "#FFB30F"
								: value === "gearSales"
								? "#B57F0B"
								: "#FFE7B5"
						}
					/>
					<p style={{ fontSize: "1.2rem" }}>
                        {
                            tableEnum[value as keyof typeof tableEnum]
                        }
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
		 	minWidth: 200
		 },
		{
			...sharedColDef,
			field: "percentage",
			cellClassName: styles.table_cell,
			headerName: "% of Revenue",
			headerClassName: styles.table_header,
			minWidth: 150
		},
		{
			...sharedColDef,
			field: "amount",
			cellClassName: styles.table_cell,
			headerName: "Value",
			headerClassName: styles.table_header,
			minWidth: 150
		}
	];

    const rows = convertObjToArray(salesData?.breakdown as GearData) || [];

	return (
		<div className={styles.container}>
			<div className={styles.container__pie_chart_container}>
				<PieChartComponent data={rows} colors={COLORS} totalEarnings={salesData?.totalEarnings}/>
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
	"productCount" = "No of Products",
}

export const convertObjToArray = (obj: GearData) => {
    if (!obj) return [];
    return Object.entries(obj).map(([key, value]) => ({
        id: key,
        name: key,
        amount: !!value.amount ? value.amount : 50,
        percentage: value.percentage,
		productCount: value.productCount
    }));
};