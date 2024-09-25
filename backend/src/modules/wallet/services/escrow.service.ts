import { HttpException } from "@/core/exceptions/HttpException";
import {
	Escrow,
	EscrowStatus,
} from "../types";
import walletModel from "../models/wallet";
import escrowModel from "../models/escrow";

class EscrowService {
	private escrow = escrowModel;
	private wallet = walletModel;

	public async initialize(payload: Escrow) {
		try {
			const { amount, transaction, buyer, seller } = payload;
			const buyerWallet = await this.wallet.findOne({ userId: buyer });
			if (!buyerWallet) throw new HttpException(404, "Buyer wallet not found");
			if (buyerWallet.balance < amount)
				throw new HttpException(400, "Not enough balance");

			const escrow = new this.escrow({
				transaction,
				buyer,
				seller,
				amount,
				status: EscrowStatus.PENDING,
			});

			escrow.save();

			buyerWallet.balance -= amount;
			buyerWallet.pendingDebit += amount;
			buyerWallet.save();

			return escrow;
		} catch (error) {
			throw new HttpException(error?.status || 500, error.message);
		}
	}

	public async approvePurchaseRequest(transactionId: string) {
		try {
			const escrow = await this.escrow.findOne({ transactionId });
			if (!escrow || escrow.status !== EscrowStatus.PENDING) {
				throw new HttpException(400, "Escrow not in pending state");
			}

			escrow.status = EscrowStatus.APPROVED;
			await escrow.save();
		} catch (error) {
			throw new HttpException(error?.status || 500, error.message);
		}
	}

	public async confirmDelivery(transaction: string) {
		try {
			const escrow = await this.escrow.findOne({ transaction });
			if (!escrow || escrow.status !== EscrowStatus.APPROVED) {
				throw new HttpException(400, "Escrow not in approved state");
			}

			// Transfer funds to seller's pendingCredit
			const sellerWallet = await this.wallet.findOne({ userId: escrow.seller });
			sellerWallet.pendingCredit += escrow.amount;
			await sellerWallet.save();

			// Mark escrow as released
			escrow.status = EscrowStatus.AWAITING_DELIVERY;
			await escrow.save();
		} catch (error) {
			throw new HttpException(error?.status || 500, error.message);
		}
	}

	public async settleTransaction(transaction: string) {
        try {
            const escrow = await this.escrow.findOne({ transaction });
            if (!escrow || escrow.status !== EscrowStatus.AWAITING_DELIVERY) {
                throw new HttpException(400, "Transaction not yet ready for release");
            }
    
            escrow.status = EscrowStatus.RELEASED;
            await escrow.save();
    
            // Move pendingCredit to balance in seller's wallet
            const sellerWallet = await this.wallet.findOne({ userId: escrow.seller });
            sellerWallet.balance += escrow.amount;
            sellerWallet.pendingCredit -= escrow.amount;
            await sellerWallet.save();
        } catch (error) {
            throw new HttpException(error?.status || 500, error.message);
        }
	}
}

export default EscrowService;
