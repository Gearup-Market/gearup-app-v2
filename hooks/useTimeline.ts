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
	const [steps, setSteps] = useState(1);
	const { isBuyer, stage: stages, id, userRole, transactionType } = item;

	console.log(stages, "sdfklks csldcsd");
	
	useEffect(() => {
		if (userRole === UserRole.Renter && transactionType === TransactionType.Rental) {
			// const stage = (stages?.buyer || {stage: TransactionStage.PendingApproval}).stage;
			const {stage} = stages

			// if (stage === TransactionStage.PendingApproval) {
			// 	setSteps(1);
			// 	// setAvailableAction(TransactionStage.)
			// 	// transaction can be cancelled
			// } else if (stage === TransactionStage.ConfirmHandover) {
			// 	setSteps(2);
			// 	// setNextStage(TransactionStage.TransactionOngoing);
			// } else if (stage === TransactionStage.TransactionOngoing) {
			// 	setSteps(3);
			// } else if (stage === TransactionStage.InitiateReturn) {
			// 	setSteps(4);
			// } else if (stage === TransactionStage.AwaitingConfirmation) {
			// 	setSteps(5);
			// } else if (stage === TransactionStage.ReviewAndFeedback) {
			// 	setSteps(6);
			// }
			if (stage === TransactionStage.PendingApproval) {
				setSteps(1);
				// setAvailableAction(TransactionStage.)
				// transaction can be cancelled
			} else if (stage === TransactionStage.AwaitingConfirmation) {
				setSteps(2);
				// setNextStage(TransactionStage.TransactionOngoing);
			} else if (stage === TransactionStage.TransactionOngoing) {
				setSteps(3);
			} else if (stage === TransactionStage.InitiateReturn) {
				setSteps(4);
			} else if (stage === TransactionStage.ConfirmReturn) {
				setSteps(5);
			} else if (stage === TransactionStage.ReviewAndFeedback) {
				setSteps(6);
			}
		} else if (
			userRole === UserRole.Lender &&
			transactionType === TransactionType.Rental
		) {
			const {stage} = stages
			// const stage = (stages?.seller || {stage: TransactionStage.PendingApproval}).stage;
			if (stage === TransactionStage.PendingApproval) {
				setSteps(1);
			} else if (stage === TransactionStage.ConfirmHandover) {
				setSteps(2);
			} else if (stage === TransactionStage.AwaitingConfirmation) {
				setSteps(3);
			} else if (stage === TransactionStage.TransactionOngoing || stage === TransactionStage.InitiateReturn) {
				setSteps(4);
			} else if (stage === TransactionStage.ConfirmReturn) {
				setSteps(5);
			} else if (stage === TransactionStage.ReviewAndFeedback) {
				setSteps(6);
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
				window.location.reload();
			}
		} catch (error: any) {
			toast.error(error?.response?.data?.message || "An error occured");
		}
	};

	return {steps, handleAction, isPending};
}
