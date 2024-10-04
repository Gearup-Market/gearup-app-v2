import { useFetchUserAnalytics } from "@/app/api/hooks/analytics";
import { useGetUserDetails } from "@/app/api/hooks/users";
import { useAuth } from "@/contexts/AuthContext";

export const useGetUserAnalyticsById = () => {
	const { user } = useAuth();
	const { data, isFetching } = useFetchUserAnalytics(user?._id ?? "");
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
