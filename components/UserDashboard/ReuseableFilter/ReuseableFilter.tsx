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
	const url = new URL(window.location.href);
	const router = useRouter();
	const search = useSearchParams();
	const currentParams = new URLSearchParams(search.toString());
	const activeFilterFromQuery = currentParams.get("type");
	const activeSubFilterFromQuery = currentParams.get(childrenQueryName);

	const setQueryParam = (name: string, value: string) => {
		url.searchParams.set(name, value);
		window.history.pushState({}, "", url);
		if (value === "all") {
			currentParams.delete(name);
			currentParams.delete(childrenQueryName);
			router.push(`/user/${page}?${currentParams.toString()}`);
		}
	};

	useEffect(() => {
		if (activeFilterFromQuery) {
			console.log(
				parentFilters.find(
					filter => filter.name.toLowerCase() === activeFilterFromQuery
				)
			);
			setActiveFilter(
				parentFilters.find(
					filter => filter.name.toLowerCase() === activeFilterFromQuery
				)
			);
		}
	}, [activeFilterFromQuery]);

	return (
		<div className={styles.container}>
			<div className={styles.container__filters}>
				<ul className={styles.container__filters__parent_container}>
					<li
						data-active={!activeFilterFromQuery}
						onClick={() => {
							currentParams.delete("type");
							router.push(`/user/${page}`);
							setActiveFilter({ id: 1, name: "All", subFilters: [] });
						}}
						className={styles.container__filters__parent_container__filter}
					>
						<p>All</p>
					</li>
					{parentFilters.map(filter => (
						<li
							data-active={
								filter.name.toLowerCase() === activeFilterFromQuery
							}
							onClick={() => {
								url.searchParams.set("type", filter.name.toLowerCase());
								window.history.pushState({}, "", url);
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
								{
									currentParams.delete(childrenQueryName);
									router.push(
										`/user/${page}?${currentParams.toString()}`
									);
								}
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
									setQueryParam(
										childrenQueryName,
										subFilter.name.toLowerCase()
									);
								}}
								key={`${subFilter.name}-${subFilter.id}`}
								className={
									styles.container__filters__children_container__filter
								}
								data-active={
									activeSubFilterFromQuery ===
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
