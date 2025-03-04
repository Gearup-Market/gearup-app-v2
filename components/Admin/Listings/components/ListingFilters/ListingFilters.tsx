"use client";
import { ReuseableFilters } from "@/components/UserDashboard";
import React, { use, useState } from "react";

const ListingFilters = () => {
	const [activeFilterId, setActiveFilterId] = useState(1);
	const [activeSubFilterId, setActiveSubFilterId] = useState(1);
	const parentFilters = [
		{
			id: 1,
			name: "Rent",
			subFilters: [
				{
					id: 1,
					name: "All categories"
				},
				{
					id: 2,
					name: "Cameras"
				},
				{
					id: 3,
					name: "Lenses"
				},
				{
					id: 4,
					name: "Drones"
				}
			]
		},
		{
			id: 2,
			name: "Buy",
			subFilters: [
				{
					id: 1,
					name: "All categories"
				},
				{
					id: 2,
					name: "Cameras"
				},
				{
					id: 3,
					name: "Lenses"
				},
				{
					id: 4,
					name: "Drones"
				}
			]
		},
		{
			id: 3,
			name: "Courses",
			subFilters: [
				{
					id: 1,
					name: "Ebooks"
				},
				{
					id: 2,
					name: "Live"
				},
				{
					id: 3,
					name: "Video"
				},
				{
					id: 4,
					name: "Audio"
				}
			]
		}
	];
	return (
		<div></div>
		// <ReuseableFilters parentFilters={parentFilters} activeFilterId={activeFilterId} setActiveFilterId={setActiveFilterId} setActiveSubFilterId={setActiveSubFilterId} activeSubFilterId={activeSubFilterId} />
	);
};

export default ListingFilters;
