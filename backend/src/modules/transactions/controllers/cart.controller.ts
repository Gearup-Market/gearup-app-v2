import { NextFunction, Request, Response } from "express";
import CartService from "../services/cart.service";

class CartController {
	private cartService = new CartService();

	public async addCart(req: Request, res: Response, next: NextFunction) {
		try {
			const payload = req.body;
			const cart = await this.cartService.addItemToCart(payload);
			res.status(201).json({
				data: cart,
				message: "Item added to cart successfully",
			});
		} catch (error) {
			next(error);
		}
	}

	public async addMultipleCart(req: Request, res: Response, next: NextFunction) {
		try {
			const payload = req.body;
			const cart = await this.cartService.addItemsToCart(payload);
			res.status(201).json({
				data: cart,
				message: "Items added to cart successfully",
			});
		} catch (error) {
			next(error);
		}
	}

	public async getCart(req: Request, res: Response, next: NextFunction) {
		try {
			const { userId } = req.params;
			const cart = await this.cartService.getUserCart(userId);
			res.status(201).json({
				data: cart,
				message: "success",
			});
		} catch (error) {
			next(error);
		}
	}

	public async getCartItems(req: Request, res: Response, next: NextFunction) {
		try {
			const { userId, listingId } = req.body;
			const cartItem = await this.cartService.getUserCartItem(userId, listingId);
			res.status(201).json({
				data: cartItem,
				message: "success",
			});
		} catch (error) {
			next(error);
		}
	}

	public async removeCartItem(req: Request, res: Response, next: NextFunction) {
		try {
			const { userId, listingId } = req.body;
			const cartItem = await this.cartService.removeFromCart(userId, listingId);
			res.status(201).json({
				data: cartItem,
				message: "success",
			});
		} catch (error) {
			next(error);
		}
	}

	public async clearCart(req: Request, res: Response, next: NextFunction) {
		try {
			const { userId } = req.params;
			const cartItem = await this.cartService.clearCart(userId);
			res.status(201).json({
				data: cartItem,
				message: "success",
			});
		} catch (error) {
			next(error);
		}
	}

	public async getAllCarts(req: Request, res: Response, next: NextFunction) {
		try {
			const cartItem = await this.cartService.getAllCarts();
			res.status(201).json({
				data: cartItem,
				message: "success",
			});
		} catch (error) {
			next(error);
		}
	}
}

export default CartController;
