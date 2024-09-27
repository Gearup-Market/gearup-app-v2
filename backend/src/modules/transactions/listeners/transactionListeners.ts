import serviceEvents from "@/lib/events";
import { TransactionStage } from "../types";
import EscrowService from "@/modules/wallet/services/escrow.service";

// const walletService = new WalletService();
const escrowService = new EscrowService();

serviceEvents.on(
	"stageUpdated",
	async ({
		transactionId,
		stage,
	}: {
		transactionId: string;
		stage: TransactionStage;
	}) => {
		try {
			switch (stage) {
				case TransactionStage.ConfirmHandover:
					console.log("\n\n\nseller accepts..");
					// Perform actions like updating blockchain records
					await escrowService.approvePurchaseRequest(transactionId);
					break;

				case TransactionStage.TransactionOngoing:
					console.log("Transaction is ongoing...buyer accepts");
					await escrowService.confirmDelivery(transactionId);
					break;

				case TransactionStage.Completed:
					console.log("Transaction completed. Releasing funds from escrow...");
					await escrowService.settleTransaction(transactionId);
					break;
				case TransactionStage.ReviewAndFeedback:
                    console.log("Transaction completed. Releasing funds from escrow...");
					await escrowService.settleTransaction(transactionId);
					break;

				case TransactionStage.AwaitingConfirmation:
				case TransactionStage.PendingApproval:
				case TransactionStage.InitiateReturn:
				case TransactionStage.ConfirmReturn:
				case TransactionStage.Declined:
					console.log(
						"Transaction declined. Transferring escrow funds back to buyer..."
					);
					break;

				default:
					console.log("Unknown transaction stage");
			}
		} catch (error) {
			console.log(error);
		}
	}
);
