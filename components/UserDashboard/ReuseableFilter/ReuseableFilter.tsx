"use client";
import { Filter } from "@/interfaces/Listing";
import styles from "./ReuseableFilter.module.scss";
import { removeTrailingCommad } from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface Props {
	parentFilters: Filter[];
	setActiveFilter: (e?: any) => void;
	activeFilter: Filter;
	showChildrenFilters?: boolean;
	childrenQueryName?: string;
	page: string;
}

const ReuseableFilters = ({
	parentFilters,
	childrenQueryName = "category",
	setActiveFilter,
	activeFilter,
	page
}: Props) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const updateAndNavigate = (updates: {
		add?: Record<string, string>;
		remove?: string[];
	}) => {
		const newParams = new URLSearchParams(searchParams.toString());

		if (updates.add) {
			Object.entries(updates.add).forEach(([key, value]) => {
				newParams.set(key, value);
			});
		}

		if (updates.remove) {
			updates.remove.forEach(param => {
				newParams.delete(param);
			});
		}

		const queryString = newParams.toString();
		const newPath = `/user/${page}${queryString ? `?${queryString}` : ""}`;
		router.push(newPath);
	};

	const activeFilterFromQuery = searchParams.get("type");
	const activeSubFilterFromQuery = searchParams.get(childrenQueryName);

	useEffect(() => {
		if (activeFilterFromQuery) {
			const matchedFilter = parentFilters.find(
				filter =>
					filter.name.toLowerCase() === activeFilterFromQuery.toLowerCase()
			);

			if (matchedFilter) {
				setActiveFilter(matchedFilter);
			}
		}
	}, [activeFilterFromQuery, parentFilters, setActiveFilter]);

	return (
		<div className={styles.container}>
			<div className={styles.container__filters}>
				<ul className={styles.container__filters__parent_container}>
					{parentFilters.map(filter => (
						<li
							data-active={
								filter.name.toLowerCase() ===
								activeFilterFromQuery?.toLowerCase()
							}
							onClick={() => {
								updateAndNavigate({
									add: { type: filter.name.toLowerCase() },
									remove: [childrenQueryName]
								});
							}}
							key={`${filter.name}-${filter.id}`}
							className={
								styles.container__filters__parent_container__filter
							}
						>
							<p>{filter.name}</p>
						</li>
					))}
				</ul>

				{activeFilter.subFilters.length ? (
					<ul className={styles.container__filters__children_container}>
						<li
							onClick={() => {
								updateAndNavigate({
									remove: [childrenQueryName]
								});
							}}
							className={
								styles.container__filters__children_container__filter
							}
							data-active={!activeSubFilterFromQuery}
						>
							<p>All</p>
						</li>

						{activeFilter.subFilters.map(subFilter => (
							<li
								onClick={() => {
									updateAndNavigate({
										add: {
											[childrenQueryName]:
												subFilter.name.toLowerCase()
										}
									});
								}}
								key={`${subFilter.name}-${subFilter.id}`}
								className={
									styles.container__filters__children_container__filter
								}
								data-active={
									activeSubFilterFromQuery?.toLowerCase() ===
										subFilter.name.toLowerCase() ||
									(!activeSubFilterFromQuery &&
										subFilter.name === "All")
								}
							>
								<p>
									{removeTrailingCommad(
										subFilter.name === "Camera Accessories"
											? subFilter.name.split(" ")[1]
											: subFilter.name.split(" ")[0]
									)}
								</p>
							</li>
						))}
					</ul>
				) : null}
			</div>
		</div>
	);
};

export default ReuseableFilters;
