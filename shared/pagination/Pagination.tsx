import { usePagination } from "@/hooks";
import styles from "./Pagination.module.scss";

const DOTS = "...";

interface Props {
	currentPage: number;
	onPageChange: any;
	totalCount: number;
	siblingCount?: number;
	pageSize: number;
	startNumber?: number;
	endNumber?: number;
}

const Pagination: React.FC<Props> = ({
	onPageChange,
	totalCount,
	siblingCount = 1,
	currentPage,
	pageSize,
	startNumber,
	endNumber
}) => {
	const paginationRange = usePagination({
		currentPage,
		totalCount,
		siblingCount,
		pageSize
	});

	// If there are less than 2 times in pagination range we shall not render the component
	if (currentPage === 0 || paginationRange!.length < 2) {
		return null;
	}

	const onNext = () => {
		onPageChange(currentPage + 1);
	};

	const onPrevious = () => {
		onPageChange(currentPage - 1);
	};

	let lastPage = paginationRange![paginationRange!.length - 1];
	return (
		<ul className={styles.pagination_container}>
			<div className={styles.text}>
				{/* <p>
					Showing {startNumber} - {endNumber} out of {totalCount}
				</p> */}
				<p>
					Page {currentPage} of {Math.ceil(totalCount / pageSize)}
				</p>
			</div>
			<div className={styles.row}>
				{/* Left navigation arrow */}
				<li
					className={`${styles.pagination_item} ${
						currentPage === 1 && styles.disabled
					} ${styles.container}`}
					onClick={onPrevious}
				>
					<div className={`${styles.arrow} ${styles.left}`} />
					<p>Previous</p>
				</li>
				<ul className={styles.sub_list}>
					{paginationRange?.map((pageNumber, index) => {
						// If the pageItem is a DOT, render the DOTS unicode character
						if (pageNumber === DOTS) {
							return (
								<li
									className={`${styles.pagination_item} ${styles.dots} `}
									key={index}
								>
									&#8230;
								</li>
							);
						}

						// Render our Page Pills
						return (
							<li
								className={`${styles.pagination_item} ${
									pageNumber === currentPage && styles.selected
								}`}
								onClick={() => onPageChange(pageNumber)}
								key={index}
							>
								{pageNumber}
							</li>
						);
					})}
				</ul>
				{/*  Right Navigation arrow */}
				<li
					className={`${styles.pagination_item} ${
						currentPage === lastPage && styles.disabled
					} ${styles.container}`}
					onClick={onNext}
				>
					<p>Next</p>
					<div className={`${styles.arrow} ${styles.right} `} />
				</li>
			</div>
		</ul>
	);
};

export default Pagination;
