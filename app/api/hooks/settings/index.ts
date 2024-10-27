import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { api } from "../../api";
import { API_URL } from "../../url";
import { iPostCreateAdminMemberErr, iPostCreateAdminMemberResp, iPostCreateAminMemberReq } from "./types";


export const usePostCreateAdminMember = (
    options?: Omit<
        UseMutationOptions<iPostCreateAdminMemberResp, iPostCreateAdminMemberErr, iPostCreateAminMemberReq>,
        "mutationFn"
    >
) =>
    useMutation<iPostCreateAdminMemberResp, iPostCreateAdminMemberErr, iPostCreateAminMemberReq>({
        mutationFn: async props => (await api.post(API_URL.adminCreateMember, props)).data,
        ...options
    });