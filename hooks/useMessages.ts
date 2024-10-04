import { useGetUserMessages } from "@/app/api/hooks/messages";
import { useAuth } from "@/contexts/AuthContext";
import React from "react";

export const useMessages = () => {
  const {user} = useAuth()
	const { data, isFetching } = useGetUserMessages(user?._id);
	return {
    allUserMessages: data?.data || [],
    isFetchingAllUserMessages: isFetching,
  };
};
