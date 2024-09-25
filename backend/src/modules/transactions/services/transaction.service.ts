import { HttpException } from "@/core/exceptions/HttpException";
import transactionModel from "../models/transactions";
import {
	TransactionPayload,
	TransactionStage,
	TransactionStatus,
	TransactionType,
} from "../types";
import { isEmpty } from "@/core/utils";
import PaymentService from "@/modules/wallet/services/payment.service";
import ListingService from "@/modules/listings/services/listing.service";
import { ListingStatus } from "@/modules/listings/types";
import { Types } from "mongoose";
import WalletService from "@/modules/wallet/services/wallet.service";

class TransactionService {
	private transaction = transactionModel;
	private paymentService = new PaymentService();
	private listingService = new ListingService();
	private walletService = new WalletService();

	public async addTransaction(payload: TransactionPayload) {
		try {
			const {
				buyer,
				seller,
				item,
				amount,
				type,
				reference,
				method,
				rentalPeriod,
				metadata,
			} = payload;
			if (buyer === seller)
				throw new HttpException(
					400,
					"Operation not possible: You owned this item"
				);
			const listingExist = await this.listingService.getListingByIdNoMetadata(item);
			if (listingExist && listingExist.status !== ListingStatus.Available)
				throw new HttpException(
					400,
					"Oops! Looks like this listing is no longer available"
				);

			// check if the transaction has already been recorded for user
			const trxExist = await this.transaction.findOne({ buyer, seller, item });
			if (trxExist && trxExist.status === TransactionStatus.Pending)
				throw new HttpException(400, "You have already requested for this item");

			const transactionId = new Types.ObjectId();

			const txn = await this.paymentService.recordPayment({
				userId: buyer,
				amount,
				description:
					type === TransactionType.Rental
						? "Rented a listing"
						: "Purchased listing",
				reference: reference || transactionId.toString(),
				method,
			});
			const trx = await this.transaction.create({
				_id: transactionId,
				buyer,
				seller,
				item,
				amount,
				payment: txn._id,
				type,
				status: TransactionStatus.Pending,
				reference: reference || transactionId.toString(),
				rentalPeriod,
				metadata,
			});

			await this.listingService.changeListingStatus(
				{
					status: ListingStatus.Unavailable,
					userId: seller,
				},
				item
			);
			return trx;
		} catch (error) {
			throw new HttpException(500, error?.message);
		}
	}

	public async getUserTransactions(userId: string) {
		try {
			if (isEmpty(userId)) throw new HttpException(400, "userId is required");

			const transactions = await this.transaction
				.find({
					$or: [{ buyer: userId }, { seller: userId }],
				})
				.populate("item")
				.populate("payment")
				.lean();

			return transactions;
		} catch (error) {
			throw new HttpException(500, error?.message);
		}
	}

	public async getTransaction(id: string) {
		try {
			if (isEmpty(id)) throw new HttpException(400, "Transaction id is required");

			const transaction = await this.transaction
				.findById(id)
				.populate("buyer", "name avatar userId userName isVerified")
				.populate("seller", "name avatar userId userName isVerified")
				.populate("item")
				.populate("payment")
				.lean();
			return transaction;
		} catch (error) {
			throw new HttpException(500, error?.message);
		}
	}

	public async getAllTransactions() {
		try {
			const transaction = await this.transaction.find().lean();
			return transaction;
		} catch (error) {
			throw new HttpException(500, error?.message);
		}
	}

	public async acceptTransactionRequested(id: string, sellerId: string) {
		try {
			if (isEmpty(id)) throw new HttpException(400, "Transaction id is required");
			if (isEmpty(sellerId))
				throw new HttpException(400, "Seller's id is required");

			const transaction = await this.transaction.findById(id);
			if (transaction.seller !== sellerId)
				throw new HttpException(
					400,
					"Seller not authorized to accept this request"
				);
			if (transaction.status !== TransactionStatus.Pending)
				throw new HttpException(400, "Transaction not in pending state");

			transaction.status = TransactionStatus.Ongoing;
			await transaction.save();

			return transaction;
		} catch (error) {
			throw new HttpException(500, error?.message);
		}
	}

	public async changeTransactionStatus(
		id: string,
		status: TransactionStatus,
		authority: { id: string; role: "buyer" | "seller" }
	) {
		try {
			if (isEmpty(id)) throw new HttpException(400, "Transaction id is required");
			if (isEmpty(status)) throw new HttpException(400, "status is required");

			const transaction = await this.transaction.updateStatus(
				id,
				status,
				authority
			);
			return transaction;
		} catch (error) {
			throw new HttpException(500, error?.message);
		}
	}

	public async changeTransactionStage(
		id: string,
		stage: TransactionStage,
		authority: { id: string; role: "buyer" | "seller" },
		status?: TransactionStatus
	) {
		try {
			if (isEmpty(id)) throw new HttpException(400, "Transaction id is required");
			if (isEmpty(stage)) throw new HttpException(400, "Stage is required");

			const transaction = await this.transaction.updateStage(
				id,
				stage,
				authority,
				status
			);

			if (stage === TransactionStage.ConfirmHandover) {
				await this.walletService.finalizeCharge(
					transaction.buyer,
					transaction.amount
				);
				await this.walletService.lockFunds(
					transaction.seller,
					transaction.amount
				);
				await this.paymentService.completePayment(
					transaction.reference,
					transaction.seller
				);
			}
			return transaction;
		} catch (error) {
			throw new HttpException(500, error?.message);
		}
	}

	public async submitReview(){
		try {
			
		} catch (error) {
			throw new HttpException(error?.status || 500, error?.message);
		}
	}
}

export default TransactionService;
