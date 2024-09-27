import { Router } from "express";
import { Routes } from "@/types";
import { validationMiddleware } from "@/lib";
import CartController from "../controllers/cart.controller";
import { addItemsToCartSchema, addItemToCartSchema, getUserCartItemSchema, getUserCartSchema } from "../validations/cart";

class CartRoute implements Routes {
	public path = "/cart";
	public router: Router = Router();
	public cartController = new CartController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post(
			`${this.path}/create`,
            validationMiddleware(addItemToCartSchema),
			this.cartController.addCart.bind(this.cartController)
		);

		this.router.post(
			`${this.path}/create/multiple`,
            validationMiddleware(addItemsToCartSchema),
			this.cartController.addMultipleCart.bind(this.cartController)
		);

		this.router.get(
			`${this.path}/all`,
			this.cartController.getAllCarts.bind(this.cartController)
		);

        this.router.get(
			`${this.path}/items`,
            validationMiddleware(getUserCartItemSchema),
			this.cartController.getCartItems.bind(this.cartController)
		);

		this.router.get(
			`${this.path}/:userId`,
            validationMiddleware(getUserCartSchema),
			this.cartController.getCart.bind(this.cartController)
		);

		this.router.post(
			`${this.path}/remove-item`,
            validationMiddleware(getUserCartItemSchema),
			this.cartController.removeCartItem.bind(this.cartController)
		);

		this.router.delete(
			`${this.path}/:userId`,
            validationMiddleware(getUserCartSchema),
			this.cartController.clearCart.bind(this.cartController)
		);

    }
}

export default CartRoute