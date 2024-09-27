"use client";

import { useState, useEffect } from "react";

const useFetch = (api: string, query = null) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const url = query ? `${api}/${query}` : api;
				const res = await fetch(url);

				if (!res.ok) {
					throw new Error("Failed to fetch data");
				}

				const result = await res.json();
				setData(result);
			} catch (error: any) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [query, api]);

	return { data, loading, error };
};

export default useFetch;
