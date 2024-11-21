import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { api } from "../../api";
import { API_URL } from "../../url";
import { iPostCheckPinReq, iPostCreateAdminMemberErr, iPostCreateAdminMemberResp, iPostCreateAminMemberReq } from "./types";


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

    export const useConfirmTransactionPin = (
        options?: Omit<
            UseMutationOptions<iPostCreateAdminMemberResp, iPostCreateAdminMemberErr, iPostCheckPinReq>,
            "mutationFn"
        >
    ) =>
        useMutation<iPostCreateAdminMemberResp, iPostCreateAdminMemberErr, iPostCheckPinReq>({
            mutationFn: async props => (await api.post(API_URL.confirmTransactionPin, props)).data,
            ...options
        });