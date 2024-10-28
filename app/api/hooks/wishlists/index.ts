import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { API_URL } from "../../url";
import { api } from "../../api";


export const useAddItemToWishlist = (
    options?: Omit<
        UseMutationOptions<any, any, any>,
        "mutationFn"
    >
) =>
    useMutation<any, any, any>({
        mutationFn: async props => (await api.post(`${API_URL.wishlists}/add`, props)).data,
        ...options
    });

/////////////////////////////////////////////////////////////////////////////////

export const useRemoveItemFromWishlist = (
    options?: Omit<
        UseMutationOptions<any, any, any>,
        "mutationFn"
    >
) =>
    useMutation<any, any, any>({
        mutationFn: async props => {
            const { wishlistId } = props;
            delete props.wishlistId;
            return (await api.delete(`${API_URL.wishlists}/${wishlistId}`, props)).data;
        },
        ...options
    });

/////////////////////////////////////////////////////////////////////////////////

export const useGetUserWishlists = (
    options?: UseQueryOptions<any, any>
) =>
    useQuery<any, any>({
        queryKey: ["getUserWishlists"],
        queryFn: async () => (await api.get(`${API_URL.wishlists}`)).data,
        ...options,
        refetchOnMount: true
    });

/////////////////////////////////////////////////////////////////////////////////

export const usePostCheckItemInWishlist = (
    options?: Omit<
        UseMutationOptions<any, any, any>,
        "mutationFn"
    >
) =>
    useMutation<any, any, any>({
        mutationFn: async props => (await api.post(`${API_URL.wishlists}/check`, props)).data,
        ...options
    });

/////////////////////////////////////////////////////////////////////////////////

// export const useGetWishlistById = (/*  */
//     wishlistId?: string,
//     options?: UseQueryOptions<any, any>
// ) =>
//     useQuery<any, any>({
//         queryKey: ["wishlistsById", wishlistId],
//         queryFn: async () => (await api.get(`${API_URL.wishlists}/${wishlistId}`)).data,
//         ...options,
//         enabled: !!wishlistId,
//         refetchOnMount: true
//     });

