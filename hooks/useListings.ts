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
import {
	getAllCourses,
	getCoursesByUser,
	useGetCourseById
} from "@/app/api/hooks/courses";
import { setCourses } from "@/store/slices/coursesSlice";
import { CourseType } from "@/views/CourseListingView/CourseListingView";

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

export function useCourses(
	page: number = 1,
	queryParams?: {
		category?: string;
	}
) {
	const dispatch = useAppDispatch();

	const {
		data: courses,
		isFetching,
		refetch
	} = useQuery({
		queryKey: ["courses", { page, ...queryParams }],
		queryFn: getAllCourses,
		refetchInterval: 60000,
		enabled: true
	});

	useEffect(() => {
		if (courses) {
			dispatch(setCourses({ courses: courses.data }));
		}
	}, [courses, dispatch]);

	return { isFetching, refetch, courses };
}

export function useGetSingleCourse(courseId: string) {
	const dispatch = useAppDispatch();

	const { data: listing, isFetching, refetch, error } = useGetCourseById(courseId);

	useEffect(() => {
		if (listing) {
			dispatch(
				setCourses({
					currentCourse: listing.data
				})
			);
		}
	}, [isFetching, listing, courseId, error]);

	return { listing, isFetching, refetch, error };
}

export function useCoursesByUser(page: number = 1, queryParams: any) {
	const { userId } = useAppSelector(s => s.user);
	const dispatch = useAppDispatch();

	const {
		data: courses,
		isFetching,
		refetch
	} = useQuery({
		queryKey: ["getUserCourses", { page, userId, ...queryParams }],
		queryFn: getCoursesByUser,
		refetchInterval: 60000,
		enabled: true
	});

	useEffect(() => {
		if (courses) {
			const dataToAdd = { owned: courses.data };
			dispatch(setListings(dataToAdd));
		}
	}, [isFetching, courses, dispatch]);

	return { courses, isFetching, refetch };
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
				name: CourseType.Audio
			},
			{
				id: 2,
				name: CourseType.Ebook
			},
			{
				id: 3,
				name: CourseType.Live
			},
			{
				id: 4,
				name: CourseType.Video
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
			const _filter = parentFilters.map(f => {
				return f.name === "Courses"
					? {
							...f,
							subFilters: [
								{
									id: 1,
									name: CourseType.Audio
								},
								{
									id: 2,
									name: CourseType.Ebook
								},
								{
									id: 3,
									name: CourseType.Live
								},
								{
									id: 4,
									name: CourseType.Video
								}
							]
					  }
					: {
							...f,
							subFilters: categories.data.map((c, i) => ({
								id: c.id,
								name: c.name,
								image: c.image
							}))
					  };
			});

			setFilters(_filter);
		}
	}, [categories, isFetching]);

	return { filters, isFetching, refetch };
}

export function useAdminListingFilters() {
	const [filters, setFilters] = useState<Filter[]>(parentFilters);

	return { adminParentFilters, adminSubListingFilters };
}
