"use client";

import {
	useGetCategories,
	useGetListingById,
	useGetListingsByUser
} from "@/app/api/hooks/listings";
import { Filter } from "@/interfaces/Listing";
import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import { setListings } from "@/store/slices/listingsSlice";
import { useEffect, useState } from "react";
import { getListings } from "@/app/api/hooks/listings";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useListingsByUser(page: number = 1) {
	const { userId } = useAppSelector(s => s.user);
	const dispatch = useAppDispatch();

	const {
		data: listings,
		isFetching,
		refetch
	} = useGetListingsByUser({
		userId,
		page,
		options: {
			queryKey: ["listingsByUser"],
			refetchInterval: 60000
		}
	});

	useEffect(() => {
		if (listings) {
			const dataToAdd = { owned: listings.data };
			dispatch(setListings(dataToAdd));
		}
	}, [isFetching, listings, dispatch]);

	return { listings, isFetching, refetch, meta: listings?.meta };
}

export function useSingleListing(listingId: string) {
	const dispatch = useAppDispatch();

	const { data: listing, isFetching, refetch, error } = useGetListingById(listingId);

	useEffect(() => {
		if (listing) {
			dispatch(
				setListings({
					currentListing: listing.data
				})
			);
		}
	}, [isFetching, listing, listingId, error]);

	return { listing, isFetching, refetch, error };
}
export function useListings(
	page: number = 1,
	queryParams?: {
		category?: string;
		subCategory?: string;
		minPrice?: string;
		maxPrice?: string;
		type?: string;
		fields?: Record<string, string[]>;
	}
) {
	const queryClient = useQueryClient();
	const dispatch = useAppDispatch();

	const {
		data: listings,
		isFetching,
		refetch
	} = useQuery({
		queryKey: ["listings", { page, ...queryParams }],
		queryFn: getListings,
		refetchInterval: 60000,
		enabled: true
	});

	useEffect(() => {
		if (listings) {
			dispatch(setListings({ listings: listings.data }));
		}
	}, [listings, dispatch]);

	return { isFetching, meta: listings?.meta, refetch, listings };
}

const parentFilters: Filter[] = [
	{
		id: 1,
		name: "Rent",
		subFilters: [
			{
				id: 1,
				name: "All categories"
			}
		]
	},
	{
		id: 2,
		name: "Sell",
		subFilters: [
			{
				id: 1,
				name: "All categories"
			}
		]
	},
	{
		id: 3,
		name: "Courses",
		subFilters: [
			{
				id: 1,
				name: "All categories"
			}
		]
	}
];
const adminParentFilters: Filter[] = [
	{
		id: 1,
		name: "Rent",
		subFilters: [
			{
				id: 1,
				name: "Pending"
			},
			{
				id: 2,
				name: "Approved"
			},
			{
				id: 3,
				name: "Declined"
			}
		]
	},
	{
		id: 2,
		name: "Sell",
		subFilters: [
			{
				id: 1,
				name: "Pending"
			},
			{
				id: 2,
				name: "Approved"
			},
			{
				id: 3,
				name: "Declined"
			}
		]
	},
	{
		id: 3,
		name: "Courses",
		subFilters: [
			{
				id: 1,
				name: "All categories"
			}
		]
	}
];

const adminSubListingFilters = [
	{
		id: 1,
		name: "Pending"
	},
	{
		id: 2,
		name: "Approved"
	},
	{
		id: 3,
		name: "Declined"
	}
];

export function useListingFilters() {
	const [filters, setFilters] = useState<Filter[]>(parentFilters);
	const { data: categories, isFetching, refetch } = useGetCategories();

	useEffect(() => {
		if (categories) {
			const _filter = parentFilters.map(f => ({
				...f,
				subFilters: categories.data.map((c, i) => ({
					id: c.id,
					name: c.name,
					image: c.image
				}))
			}));

			setFilters(_filter);
		}
	}, [categories, isFetching]);

	return { filters, isFetching, refetch };
}

export function useAdminListingFilters() {
	const [filters, setFilters] = useState<Filter[]>(parentFilters);

	return { adminParentFilters, adminSubListingFilters };
}
