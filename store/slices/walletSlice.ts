import {
	iWallet,
	iWTransaction,
	StellarTransaction,
	StellarWallet,
	WalletStatus
} from "@/app/api/hooks/wallets/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type WalletState = {
	wallet: iWallet;
	wTransactions: iWTransaction[];
	stellarWallet?: StellarWallet;
	stellarTransactions: StellarTransaction[];
};

const initialState: WalletState = {
	wallet: {
		_id: "",
		balance: 0,
		pendingDebit: 0,
		pendingCredit: 0,
		currency: "₦",
		accountName: "",
		accountNumber: "",
		bankName: "",
		status: WalletStatus.Frozen
	},
	wTransactions: [],
	stellarTransactions: []
};

const walletSlice = createSlice({
	name: "wallet",
	initialState,
	reducers: {
		updateWallet: (state, action: PayloadAction<Partial<WalletState>>) => {
			Object.assign(state, action.payload);
		},
		clearState: state => initialState
	}
});

export default walletSlice.reducer;
export const { updateWallet, clearState } = walletSlice.actions;
