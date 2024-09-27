"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

export default function useCopy() {
	const [copyText, setCopyText] = useState<string>("Copy");

	const handleCopy = (text: string, cb?: () => void) => {
		try {
			if (navigator.clipboard && navigator.permissions) {
				navigator.clipboard.writeText(text).then(() => {
					if (!cb) {
						toast.success("Copied to clipboard");
					} else {
						cb();
					}
				});
			} else if (document.queryCommandSupported("copy")) {
				const ele = document.createElement("textarea");
				ele.value = text;
				document.body.appendChild(ele);
				ele.select();
				document.execCommand("copy");
				document.body.removeChild(ele);
				if (!cb) {
					toast.success("Copied to clipboard");
				} else {
					cb();
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	return handleCopy;
}
