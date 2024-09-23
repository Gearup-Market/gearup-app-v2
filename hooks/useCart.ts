"use client";

import {
	useAddToCart,
	useGetCart,
	useRemoveFromCart
} from "@/app/api/hooks/transactions";
import { Cart, TransactionType } from "@/app/api/hooks/transactions/types";
import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import { addCart, removeCartItem } from "@/store/slices/cartSlice";
import { Listing } from "@/store/slices/listingsSlice";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

export type CartPayload = {
	listing: Listing;
	rentalPeriod?: {
		start: Date;
		end: Date;
	};
	type: TransactionType;
	customPrice?: number;
};

export default function useCart() {
	const { userId } = useAppSelector(s => s.user);
	const { mutateAsync: addToCart, isPending } = useAddToCart();
	const { data: cartItems, isPending: isLoading, refetch } = useGetCart(userId);
	const { mutateAsync: removeFromCart, isPending: isRemoveFromCartPending } =
		useRemoveFromCart();
	const dispatch = useAppDispatch();
	const cart = useAppSelector(s => s.cart);

	const addItemToCart = async (payload: CartPayload) => {
		try {
			const { listing, rentalPeriod, type, customPrice } = payload;
			if (userId) {
				const res = await addToCart({
					listingId: listing._id,
					type,
					userId,
					customPrice,
					rentalPeriod
				});

				if (res.data._id) {
					toast.success("Item added to cart");
					return res.data;
				}

				toast.error(res.message || "could not add to cart");
			} else {
				// user not signed in so use localstorage
				dispatch(
					addCart({
						listing,
						rentalPeriod,
						type
					})
				);
			}
		} catch (error: any) {
			toast.error(error?.data?.response?.message || "Could not add to cart");
			console.log(error, "error from cart");
		}
	};

	const removeItemFromCart = async (listingId: string) => {
		try {
			if (userId) {
				const res = await removeFromCart({
					listingId,
					userId
				});

				if (res.data._id) {
					toast.success("Item removed from cart");
					return res.data;
				}

				toast.error(res.message || "could not add to cart");
			} else {
				// user not signed in so use localstorage
				dispatch(removeCartItem(listingId));
			}
		} catch (error: any) {
			toast.error(error?.message || "Could not add to cart");
			console.log(error, "error from cart");
		}
	};

    const getCartItems = useCallback(() => {
        if(userId){
            return cartItems?.data
        }

        return cart as Cart
    }, [userId, cartItems, cart])

	return {
		addItemToCart,
		removeItemFromCart,
        getCartItems,
        isPending
	};
}
