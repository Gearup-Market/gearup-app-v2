"use client";

import { usePostTransactionStage } from "@/app/api/hooks/transactions";
import { UserRole } from "@/app/api/hooks/transactions/types";
import { iTransactionDetails, TransactionStage, TransactionStatus } from "@/interfaces";
import { useAppSelector } from "@/store/configureStore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

enum TransactionType {
	Purchase = "Purchase",
	Sale = "Sale",
	Rental = "Rental"
}

export default function useTimeline(item: iTransactionDetails) {
	const { userId } = useAppSelector(s => s.user);
	const { mutateAsync: postTransactionStage, isPending } = usePostTransactionStage();
	const { transaction, currentStage } = useAppSelector(s => s.transaction);
	const [steps, setSteps] = useState(1);

	const { isBuyer, id, userRole, transactionType, metadata } = transaction!;
	const has3rdPartyCheckup = Boolean(metadata?.thirdPartyCheckup);
	const stage = currentStage?.stage;

	useEffect(() => {
		if (userRole === UserRole.Renter && transactionType === TransactionType.Rental) {
			if (
				!stage ||
				[
					TransactionStage.AwaitingPayment,
					TransactionStage.PendingApproval
				].includes(stage)
			) {
				setSteps(1);
			} else if (
				[
					TransactionStage.SellerPreparingDelivery,
					TransactionStage.SellerShipped
				].includes(stage)
			) {
				setSteps(2);
			} else if (stage === TransactionStage.RentalOngoing) {
				setSteps(3);
			} else if (stage === TransactionStage.AwaitingItemReturn) {
				setSteps(4);
			} else if (stage === TransactionStage.AwaitingLenderConfirmation) {
				setSteps(5);
			} else if (stage === TransactionStage.ReviewAndFeedback) {
				setSteps(6);
			}
		} else if (
			userRole === UserRole.Lender &&
			transactionType === TransactionType.Rental
		) {
			if (
				!stage ||
				[
					TransactionStage.AwaitingPayment,
					TransactionStage.PendingApproval
				].includes(stage)
			) {
				setSteps(1);
			} else if (stage === TransactionStage.SellerPreparingDelivery) {
				setSteps(2);
			} else if (stage === TransactionStage.SellerShipped) {
				setSteps(3);
			} else if (
				[
					TransactionStage.RentalOngoing,
					TransactionStage.AwaitingItemReturn
				].includes(stage)
			) {
				setSteps(4);
			} else if (stage === TransactionStage.AwaitingLenderConfirmation) {
				setSteps(5);
			} else if (stage === TransactionStage.ReviewAndFeedback) {
				setSteps(6);
			}
		} else if (
			userRole === UserRole.Buyer &&
			["Purchase", "Sale"].includes(transactionType)
		) {
			if (
				!stage ||
				[
					TransactionStage.AwaitingPayment,
					TransactionStage.PendingApproval
				].includes(stage)
			) {
				setSteps(1);
			} else if (has3rdPartyCheckup) {
				if (
					[
						TransactionStage.SellerPreparingDelivery,
						TransactionStage.SellerShipped,
						TransactionStage.ThirdPartyReceived,
						TransactionStage.ThirdPartyInspecting,
						TransactionStage.ThirdPartyReportProvided,
						TransactionStage.AwaitingThirdPartyDelivery,
						TransactionStage.BuyerReviewingReport
					].includes(stage)
				) {
					setSteps(2);
				} else if ([TransactionStage.SellerShipped].includes(stage)) {
					setSteps(3);
				} else if (stage === TransactionStage.ReviewAndFeedback) {
					setSteps(4);
				}
			} else {
				if ([TransactionStage.SellerShipped].includes(stage)) {
					setSteps(2);
				} else if ([TransactionStage.ReviewAndFeedback, TransactionStage.BuyerReceivedItem].includes(stage)) {
					setSteps(3);
				}
			}
		} else if (
			userRole === UserRole.Seller &&
			["Purchase", "Sale"].includes(transactionType)
		) {
			if (
				!stage ||
				[
					TransactionStage.AwaitingPayment,
					TransactionStage.PendingApproval
				].includes(stage)
			) {
				setSteps(1);
			} else if (stage === TransactionStage.SellerPreparingDelivery) {
				setSteps(2);
			} else if (stage === TransactionStage.SellerShipped) {
				setSteps(3);
			} else if (has3rdPartyCheckup) {
				if (
					[
						TransactionStage.SellerPreparingDelivery,
						TransactionStage.SellerShipped,
						TransactionStage.ThirdPartyReceived,
						TransactionStage.ThirdPartyInspecting,
						TransactionStage.ThirdPartyReportProvided,
						TransactionStage.AwaitingThirdPartyDelivery,
						TransactionStage.BuyerReviewingReport
					].includes(stage)
				) {
					setSteps(4);
				} else if ([TransactionStage.ReviewAndFeedback, TransactionStage.BuyerReceivedItem].includes(stage)) {
					setSteps(5);
				}
			} else {
				if ([TransactionStage.ReviewAndFeedback, TransactionStage.BuyerReceivedItem].includes(stage)) {
					setSteps(4);
				}
			}
		}
	}, [item]);

	const handleAction = async (stage: TransactionStage, status?: TransactionStatus) => {
		try {
			const authority = {
				id: userId,
				role: isBuyer ? "buyer" : ("seller" as "buyer" | "seller")
			};

			const res = await postTransactionStage({
				id,
				stage,
				authority,
				status
			});

			if (res.data) {
				toast.success("Success!");
				// window.location.reload();
			}
		} catch (error: any) {
			toast.error(error?.response?.data?.message || "An error occured");
		}
	};

	return { steps, handleAction, isPending };
}
