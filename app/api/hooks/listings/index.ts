import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { api } from "../../api";
import { API_URL } from "../../url";
import { iPostListingResp, iPostListingErr, iPostListingReq, iUploadImagesResp } from "./types";

const usePostCreateListing = (
	options?: Omit<
		UseMutationOptions<iPostListingResp, iPostListingErr, iPostListingReq>,
		"mutationFn"
	>
) =>
	useMutation<iPostListingResp, iPostListingErr, iPostListingReq>({
		mutationFn: async props => (await api.post(API_URL.createListings, props)).data,
		...options
	});



const useUploadFiles = () =>
	useMutation<iUploadImagesResp, void,  File[] >({
		mutationFn: async props => {
			const formData = new FormData();
			props.forEach((file, index) => {
				formData.append(`form`, file); // Append each file with a unique key
			});
			return (
				await api.post(API_URL.uploadFiles, formData, {
					headers: {
						"Content-Type": "multipart/form-data"
					}
				})
			);
		}
	});

export { usePostCreateListing, useUploadFiles };
