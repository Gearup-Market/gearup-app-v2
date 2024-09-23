"use client";

import { useGetCategories, useGetListingById, useGetListings } from "@/app/api/hooks/listings";
import { Filter } from "@/interfaces/Listing";
import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import { setListings } from "@/store/slices/listingsSlice";
import { useEffect, useState } from "react";

export function useListings(shouldFetchAll: boolean = false) {
	const { userId } = useAppSelector(s => s.user);
	const dispatch = useAppDispatch();

	const {
		data: listings,
		isFetching,
		refetch
	} = useGetListings({ userId, shouldFetchAll });

	useEffect(() => {
		if (listings) {
			const dataToAdd = shouldFetchAll
				? { listings: listings.data }
				: { owned: listings.data };
			dispatch(setListings(dataToAdd));
		}
	}, [isFetching, listings, shouldFetchAll]);

	return { listings, isFetching, refetch };
}

export function useSingleListing(listingId: string) {
	const dispatch = useAppDispatch();

	const {
		data: listing,
		isFetching,
		refetch,
		error
	} = useGetListingById(listingId);

	useEffect(() => {
		if (listing) {
			dispatch(setListings({
				currentListing: listing.data
			}));
		}
	}, [isFetching, listing, listingId, error]);

	return { listing, isFetching, refetch, error };
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
	}
];

export function useListingFilters() {
	const [filters, setFilters] = useState<Filter[]>(parentFilters);
	const { data: categories, isFetching, refetch } = useGetCategories();

	useEffect(() => {
		if (categories) {
			const _filter = parentFilters.map(f => ({
				...f,
				subFilters: [
					...f.subFilters,
					...categories.data.map((c, i) => ({
						id: c.id,
						name: c.name,
						image: c.image
					}))
				]
			}));

			setFilters(_filter);
		}
	}, [categories, isFetching]);

	return { filters, isFetching, refetch };
}
