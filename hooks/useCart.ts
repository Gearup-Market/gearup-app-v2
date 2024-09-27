"use client";

import {
	useAddAllToCart,
	useAddToCart,
	useGetCart,
	useRemoveFromCart
} from "@/app/api/hooks/transactions";
import {
	Cart,
	CartReq,
	RentalPeriod,
	TransactionType
} from "@/app/api/hooks/transactions/types";
import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import { addCart, clearCart, removeCartItem } from "@/store/slices/cartSlice";
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
	const { mutateAsync: syncLocalCart } = useAddAllToCart();
	const { data: cartItems, isPending: isLoading, refetch } = useGetCart(userId);
	const { mutateAsync: removeFromCart, isPending: isRemoveFromCartPending } =
		useRemoveFromCart();
	const dispatch = useAppDispatch();
	const cart = useAppSelector(s => s.cart);
	const [isSubmitting, setIsSubmitting] = useState(false);

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
			} else {
				// user not signed in so use localstorage
				setIsSubmitting(true);
				dispatch(
					addCart({
						listing,
						rentalPeriod: rentalPeriod
							? ({
									start: rentalPeriod.start.toISOString(),
									end: rentalPeriod.end.toISOString()
							  } as unknown as RentalPeriod)
							: undefined,
						type,
						price: customPrice
					})
				);
				toast.success("Item added to cart");
			}
		} catch (error: any) {
			toast.error(error?.response?.data?.message || "Could not add to cart");
		} finally {
			setIsSubmitting(false);
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
					return res.data;
				}

				toast.error(res.message || "could not remove item from cart");
			} else {
				// user not signed in so use localstorage
				dispatch(removeCartItem(listingId));
				return listingId
			}
		} catch (error: any) {
			toast.error(
				error?.response?.data?.message || "Could not remove item from cart"
			);
			console.log(error, "error from cart");
		}
	};

	const getCartItems = useCallback(() => {
		if (userId) {
			return cartItems?.data;
		}

		return cart as unknown as Cart;
	}, [userId, cartItems, cart]);

	const syncCartItems = useCallback(async () => {
		try {
			if (userId && cart.items.length > 0) {
				const preparedPayload: CartReq[] = cart.items.map(
					({ listing, type, rentalPeriod, price }) => ({
						listingId: listing._id,
						type,
						userId,
						rentalPeriod: rentalPeriod
							? {
									start: new Date(rentalPeriod.start),
									end: new Date(rentalPeriod.start)
							  }
							: undefined,
						customPrice: price
					})
				);
				const res = await syncLocalCart(preparedPayload);

				if (res.data._id) {
					toast.success("Your cart has been synced");
					dispatch(clearCart());
				} else if (res.message.includes("already in cart")) {
					dispatch(clearCart());
				}
			}
		} catch (error: any) {
			console.log(error?.response?.data);
			if (error?.response?.data?.message.includes("already in cart")) {
				dispatch(clearCart());
			}
		}
	}, [userId, cart]);

	return {
		addItemToCart,
		removeItemFromCart,
		getCartItems,
		syncCartItems,
		isPending: isPending || isSubmitting
	};
}
