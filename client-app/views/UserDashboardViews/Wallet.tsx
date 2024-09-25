"use client";

import React from "react";
import { Wallet } from "../../components/UserDashboard";
import { useWallet } from "@/hooks";

const WalletView = () => {
	useWallet();
	return (
		<div>
			<Wallet />
		</div>
	);
};

export default WalletView;
