import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iTransactionDetails, Stage } from "@/interfaces";

interface TransactionState {
	transaction: iTransactionDetails | undefined;
	currentStage: Stage | null;
}

const initialState: TransactionState = {
	transaction: undefined,
	currentStage: null
};

const transactionSlice = createSlice({
	name: "transaction",
	initialState,
	reducers: {
		updateTransaction: (state, action: PayloadAction<Partial<TransactionState>>) => {
			const { payload } = action;
			Object.assign(state, payload)
		},

		resetTransaction: state => initialState
	}
});

export default transactionSlice.reducer;
export const { updateTransaction, resetTransaction } = transactionSlice.actions;
