import JobQueue from "@/lib/job";
import EscrowService from "@/modules/wallet/services/escrow.service";
import WalletService from "@/modules/wallet/services/wallet.service";
import TransactionService from "../services/transaction.service";
import transactionModel from "../models/transactions";
import { Types } from "mongoose";
import { TransactionStage, TransactionStatus } from "../types";

interface EscrowJobData {
	transactionId: string;
	amount: number;
	buyer: string;
	seller: string;
}

interface EscrowJobData {
	transactionId: string;
	amount: number;
	buyer: string;
	seller: string;
}

class EscrowQueue {
	private queue: JobQueue<EscrowJobData>;
	private wallet = new WalletService();
	private escrowService = new EscrowService();
	private transactionModel = transactionModel;

	constructor(redisUrl: string = "redis://127.0.0.1:6379") {
		this.queue = new JobQueue<EscrowJobData>("escrow_initialization", redisUrl);
        this.processJob()
	}

    public getQueue() {
        return this.queue
    }

	async addEscrowInitializationJob(
		data: EscrowJobData,
		delayInMs?: number
	): Promise<void> {
		await this.queue.addJob(data, {
			attempts: 20,
			backoff: { type: "exponential", delay: 2000 },
			delay: delayInMs,
		});
	}

	async processJob(concurrency: number = 3): Promise<void> {
		await this.queue.processJobs(concurrency, async (job, done) => {
			const { transactionId, amount, buyer, seller } = job.data as EscrowJobData;
			try {
				const wallet = await this.wallet.getUserWallet(buyer);
				if (!wallet) throw new Error("Wallet not found");
				const availableBalance = wallet.balance - wallet.pendingDebit;
				if (availableBalance >= amount) {
					// Initialize escrow
					await this.escrowService.initialize({
						amount,
						transaction: transactionId,
						buyer,
						seller,
					});

					// Update transaction status to "In Escrow"
					const authority = {
						role: "buyer" as "buyer",
						id: buyer,
					};
					await this.transactionModel.updateStatus(
						transactionId,
						TransactionStatus.Pending,
						authority
					);
					await this.transactionModel.updateStage(
						transactionId,
						TransactionStage.PendingApproval,
						authority
					);
					console.log(`Escrow initialized for transaction ${transactionId}`);
					done(null, { success: true, message: "Job processed successfully" });
				} else {
					console.log(
						`Insufficient funds for transaction ${transactionId}, retrying...`
					);
					done(new Error("Insufficient balance, retrying..."));
				}
			} catch (error) {
				console.error(
					`Error processing payment check for transaction ${transactionId}:`,
					error
				);
				done(error);
			}
		});
	}
}

const escrowQueue = new EscrowQueue();
export default escrowQueue;
