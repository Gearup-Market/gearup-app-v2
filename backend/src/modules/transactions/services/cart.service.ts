import { HttpException } from "@/core/exceptions/HttpException";
import { RentalPeriod, TransactionType } from "../types";
import cartModel from "../models/cart";
import { isEmpty } from "@/core/utils";

interface ICart {
	userId: string;
	listingId: string;
	type: TransactionType;
	rentalPeriod?: RentalPeriod;
	customPrice?: number;
}
class CartService {
	private cart = cartModel;

	public async addItemToCart(payload: ICart) {
		try {
			if (isEmpty(payload))
				throw new HttpException(400, "Request payload cannot be empty");
			const { userId, listingId, type, rentalPeriod, customPrice } = payload;

			const cart = await this.cart.addToCart(
				userId,
				listingId,
				type,
				rentalPeriod,
				customPrice
			);
			return cart.toJSON();
		} catch (error) {
			throw new HttpException(error?.status || 500, error?.message);
		}
	}

	public async addItemsToCart(payload: ICart[]) {
		try {
			if (isEmpty(payload))
				throw new HttpException(400, "Request payload cannot be empty");

			if (!Array.isArray(payload))
				throw new HttpException(400, "Need to send request payload as an array");

			const carts = await Promise.all(
				payload.map(({ userId, listingId, type, rentalPeriod, customPrice }) => {
					return this.cart.addToCart(
						userId,
						listingId,
						type,
						rentalPeriod,
						customPrice
					);
				})
			);
			return carts.map(c => c.toJSON());
		} catch (error) {
			throw new HttpException(error?.status || 500, error?.message);
		}
	}

	public async getUserCart(userId: string) {
		try {
			if (isEmpty(userId)) throw new HttpException(400, "UserId cannot be empty");
			const cart = await this.cart.getCart(userId);
			return cart;
		} catch (error) {
			throw new HttpException(error?.status || 500, error?.message);
		}
	}

	public async getUserCartItem(userId: string, listingId: string) {
		try {
			if (isEmpty(userId)) throw new HttpException(400, "UserId cannot be empty");
			const cart = await this.cart.getCartItem(userId, listingId);
			return cart;
		} catch (error) {
			throw new HttpException(error?.status || 500, error?.message);
		}
	}

	public async removeFromCart(userId: string, listingId: string) {
		try {
			if (isEmpty(userId) || isEmpty(listingId))
				throw new HttpException(400, "Request payload cannot be empty");

			const cart = await this.cart.removeFromCart(userId, listingId);
			return cart.toJSON();
		} catch (error) {
			throw new HttpException(error?.status || 500, error?.message);
		}
	}

	public async clearCart(userId: string) {
		try {
			if (isEmpty(userId))
				throw new HttpException(400, "Request payload cannot be empty");
			await this.cart.clearCart(userId);
		} catch (error) {
			throw new HttpException(error?.status || 500, error?.message);
		}
	}

	public async getAllCarts() {
		try {
			return await this.cart.find().lean();
		} catch (error) {
			throw new HttpException(error?.status || 500, error?.message);
		}
	}
}

export default CartService;
