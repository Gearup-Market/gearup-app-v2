/* eslint-disable prettier/prettier */
import WalletService from "./wallet.service";
import { HttpException } from "@/core/exceptions/HttpException";
import { logger } from "@/core/utils/logger";
import { createHmac } from "crypto";
import { Request } from "express";
import { isEmpty } from "lodash";
import wTransactionModel from "../models/walletTransactions";
import {
	PaymentMethod,
	WTransaction,
	WTransactionStatus,
	WTransactionType,
} from "../types";
import WalletTransactionService from "./walletTransaction.service";
import EscrowService from "./escrow.service";

type PaystackEvent = {
	event: string;
	data: {
		id: string;
		reference: string;
		status: string;
		amount: number;
		created_at: string;
		currency: string;
		metadata: Record<string, any> & {
			userId: string;
		};
		customer?: {
			id: string;
			first_name: string;
			last_name: string;
			email: string;
		};
	};
};

type PaymentPayload = Pick<WTransaction, 'amount' | 'userId' | 'description' | 'reference' |'method'> & {
	transactionId: string;
	seller: string;
}

class PaymentService {
	private escrowService = new EscrowService()
	private walletService = new WalletService();
	private wTransactions = wTransactionModel;
	private wTransactionService = new WalletTransactionService();

	public async processPayment(payload: Omit<WTransaction, "_id" | "type" | "status">) {
		try {
			const { amount, userId, description, reference, method } = payload;
		} catch (error) {
			throw new HttpException(error?.status || 500, error.message);
		}
	}

	public async recordPayment(payload: PaymentPayload) {
		try {
			const { amount, userId, description, reference, method } = payload;

			const trx = await this.wTransactionService.addTransaction({
				userId,
				amount,
				description,
				type: WTransactionType.Debit,
				status: WTransactionStatus.Pending,
				reference,
				method,
			});
			return trx;
		} catch (error) {
			throw new HttpException(error?.status || 500, error.message);
		}
	}

	public async completePayment(paymentRef: string, sellerId: string) {
		try {
			const tx = await this.wTransactions.findOne({reference: paymentRef})
			tx.status = WTransactionStatus.Completed;
			await tx.save()

			await this.wTransactionService.addTransaction({
				userId: sellerId,
				amount: tx.amount,
				description: "Payment for rental/sale",
				type: WTransactionType.Credit,
				status: WTransactionStatus.Pending,
				reference: tx.reference,
				method: PaymentMethod.Wallet
			})
		} catch (error) {
			throw new HttpException(error?.status || 500, error.message);
		}
	}

	public async paystackWebhook(req: Request) {
		try {
			const payload = req.body as PaystackEvent;
			logger.info(`Paystack event: ${JSON.stringify(payload, null, 2)}`);

			if (isEmpty(payload)) throw new HttpException(400, "Empty request payload");
			const { event, data } = this.verifyPaystackEvent(
				payload,
				req.headers["x-paystack-signature"].toString()
			);
			if (event === "charge.success" && payload.data.status === "success") {
				const { userId } = data.metadata;
				console.log("payment successful", userId);
				if (!userId) return null;
				const transactionExist = await this.wTransactions
					.findOne({ userId, reference: data.reference })
					.lean()
					.exec();
				if (!transactionExist) {
					await this.walletService.creditWallet({
						userId,
						amount: data.amount / 100,
						description: "Paystack payment",
						reference: data.reference,
						method: PaymentMethod.Paystack,
					});
					return {
						amount: data.amount,
						reference: data.reference,
					};
				}
				return { message: "duplicate webhook call" };
			}

			return null;
		} catch (error) {
			logger.error(`Error processing payment: ${error.message}`);
			throw new HttpException(500, error.message);
		}
	}

	private verifyPaystackEvent(payload: PaystackEvent, hashedPayload: string) {
		const hash = createHmac("sha512", process.env.PAYSTACK_SEC_KEY)
			.update(JSON.stringify(payload))
			.digest("hex");
		if (hash !== hashedPayload)
			throw new HttpException(403, "Request does not originate from paystack");
		return payload;
	}

	private async verifyPaystackPayment() {}
}

export default PaymentService;
