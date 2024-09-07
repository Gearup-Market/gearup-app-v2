import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { api } from "../../api";
import { API_URL } from "../../url";
import { iPostListingResp, iPostListingErr, iPostListingReq } from "./types";

const usePostCreateListing = (
	options?: Omit<
		UseMutationOptions<iPostListingResp, iPostListingErr, iPostListingReq>,
		"mutationFn"
	>
) =>
	useMutation<iPostListingResp, iPostListingErr, iPostListingReq>({
		mutationFn: async props =>
			(
				await api.post(API_URL.createListings, {
					...props,
				})
			).data,
		...options,
        
	});


export { usePostCreateListing };