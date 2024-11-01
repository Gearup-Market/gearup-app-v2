import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { API_URL } from "../../url";
import { api } from "../../api";
import { iPostCreateReviewReq, iPostCreateReviewResp } from "./types";


export const usePostCreateReviews = (
    options?: Omit<
        UseMutationOptions< iPostCreateReviewResp, any, iPostCreateReviewReq>,
        "mutationFn"
    >
) =>
    useMutation< iPostCreateReviewResp, any, iPostCreateReviewReq>({
        mutationFn: async props => (await api.post(`${API_URL.reviews}/add`, props)).data,
        ...options
    });