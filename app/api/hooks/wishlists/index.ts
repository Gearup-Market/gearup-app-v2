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
            return (await api.post(`${API_URL.wishlists}/remove`, props)).data;
        },
        ...options
    });

/////////////////////////////////////////////////////////////////////////////////

export const useGetUserWishlists = (
    userId: string,
    options?: any // Accept options parameter
) =>
    useQuery<any, any>({
        queryKey: ["getUserWishlists", userId], // Include userId in queryKey for uniqueness
        queryFn: async () => (await api.get(`${API_URL.wishlists}/${userId}`)).data,
        refetchOnMount: true,
        ...options, // Spread options here
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

