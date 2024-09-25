/* eslint-disable prettier/prettier */
import { Router } from "express";
import { Routes } from "@/types";
import PaymentController from "../controllers/payment.controller";

class PaymentRoute implements Routes {
	public path = "/payments";
	public router = Router();
	public paymentController = new PaymentController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post(`${this.path}/paystack-webhook`, this.paymentController.paystackWebhook.bind(this.paymentController));
		this.router.post(`${this.path}/undo`, this.paymentController.undoPayment.bind(this.paymentController));
	}
}

export default PaymentRoute;
