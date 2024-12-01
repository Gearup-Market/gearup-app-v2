import { useFetchUserAnalytics } from "@/app/api/hooks/analytics";
import { useGetUserDetails } from "@/app/api/hooks/users";
import { useAppSelector } from "@/store/configureStore";

export const useGetUserAnalyticsById = () => {
	const { userId } = useAppSelector(state => state.user);
	const { data, isFetching } = useFetchUserAnalytics(userId ?? "");
	return {
		data: data?.data,
		fetchingData: isFetching
	};
};

export const useFetchUserDetailsById = (userId: string) => {
	const { isFetching: fetchingUser, data } = useGetUserDetails({
		userId
	});
	return {
		fetchingUser,
		user: data?.data
	};
};
