"use client";
import React, { useEffect } from "react";
import styles from "./TransactionDetails.module.scss";
import {
	TransactionDetailsBody,
	TransactionDetailsHeader
} from "@/components/Admin/Transactions/TransactionDetails";
import { transactions } from "@/mock/transactions.mock";
import { useGetTransactionsById } from "@/app/api/hooks/Admin/transactions";
import { PageLoader } from "@/shared/loaders";
interface Props {
	slug: string;
}

const TransactionDetails = ({ slug }: Props) => {
	const [item, setItem] = React.useState<any>();
	const { data, isLoading } = useGetTransactionsById(slug);

	useEffect(() => {
		setItem(transactions.find(item => item.id.toString() === slug));
	}, [slug]);
	return (
		<div className={styles.container}>
			{isLoading ? (
				<PageLoader />
			) : (
				<>
					<TransactionDetailsHeader slug={slug} transaction={data?.data} />
					<TransactionDetailsBody item={data?.data} />
				</>
			)}
		</div>
	);
};

export default TransactionDetails;
