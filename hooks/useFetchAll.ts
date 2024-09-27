"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { Fetcher } from "@/utils/fetcher";
import { useGlobalContext } from "@/contexts/AppContext";
import { isEmpty } from "lodash";

const useFetchAll = () => {
	const { setListings, listingType, listings }: any = useGlobalContext();
	// const { data, isLoading, error } = useSWR<any>(`/api?type=${listingType}`, Fetcher);

	// setListings(() => {
	// 	if (!isLoading || !error) {
	// 		return [];
	// 	}
	// 	return [];
	// });
	// console.log(listings, data);

	// useEffect(() => {
	// 	if (!isEmpty(listings)) {
	// 		setListings([listings]);
	// 	}
	// }, []);
};

export default useFetchAll;
