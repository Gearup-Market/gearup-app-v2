import { NextFunction, Request, Response } from "express";
import PaymentService from "../services/payment.service";

class PaymentController {
	private paymentService = new PaymentService();

	public async paystackWebhook(req: Request, res: Response, next: NextFunction) {
		try {
			const data = await this.paymentService.paystackWebhook(req);
			res.json({ data, message: "success" }).status(200);
		} catch (error) {
			next(error);
		}
	}

	public async undoPayment(req: Request, res: Response, next: NextFunction) {
		try {
			const payload = req.body
			const data = await this.paymentService.undoPayment(payload)	;
			res.json({ data, message: "success" }).status(200);
		} catch (error) {
			next(error)
		}
	}
}

export default PaymentController;
