import { useGetTransactions } from "@/app/api/hooks/transactions";

export default function useTransactions() {
	const { data, isFetching, error } = useGetTransactions();
	return { data: data?.data, isFetching, error };
}

