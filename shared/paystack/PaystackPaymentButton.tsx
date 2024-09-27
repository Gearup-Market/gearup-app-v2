"use client";

import { PaystackProps } from "react-paystack/dist/types";
import dynamic from "next/dynamic";
import { ReactNode } from "react";
import styles from './PaystackPaymentButton.module.scss';

interface PaystackButtonProps extends PaystackProps {
	text?: string;
	className?: string;
	disabled?: boolean;
	children?: ReactNode;
	onSuccess?: (response?: any) => void;
	onClose?: (response?: any) => void;
}

const PaystackButton = dynamic(
	() => import("react-paystack").then(mod => mod.PaystackButton),
	{ ssr: false }
);

export default function PaystackPaymentButton({
	children,
    className,
    disabled,
	text,
	...props
}: PaystackButtonProps) {
	return <PaystackButton disabled={disabled} {...props} className={`${styles.paystack_button} ${className}`}>{text || children}</PaystackButton>;
}
