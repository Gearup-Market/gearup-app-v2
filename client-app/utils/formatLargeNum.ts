const decimalCount = (num:number) => {
	// Convert to String

	const numStr = String(num);
	// String Contains Decimal
	if (numStr.includes(".")) {
		return -Math.floor(Math.log10(num) + 1);
		// return (numStr.match(/^0+/) || [""])[0].length;
	}

	// String Does Not Contain Decimal
	return 0;
};

// if (rounded.endsWith('.000')) {
//     return Math.round(num);
//   } else {
//     return rounded;
//   }

export const formatLargeNum = (num: number, fixed = 3) => {
	if (num === 0) {
		return num;
	}
	if (num > 0 && num < 1) {
		const count = decimalCount(num);
		return (num / 1).toFixed(count + fixed);
	} else if (num > 1 && num < 999) {
		return `${(num / 1).toFixed(fixed)}`;
	} else if (num > 999 && num < 100000) {
		return `${new Intl.NumberFormat().format(num)}`;
	} else if (num > 100000 && num < 1000000) {
		if ((num / 1000).toFixed(fixed).endsWith(".000")) {
			return `${(num / 1000).toFixed(0)}K`;
		}
		return `${(num / 1000).toFixed(fixed)}K`;
	} else if (num >= 1000000 && num < 1000000000) {
		if ((num / 1000000).toFixed(fixed).endsWith(".000")) {
			return `${(num / 1000000).toFixed(0)}M`;
		}
		return `${(num / 1000000).toFixed(fixed)}M`;
	} else if (num >= 1000000000 && num < 1000000000000) {
		if ((num / 1000000000).toFixed(fixed).endsWith(".000")) {
			return `${(num / 1000000000).toFixed(0)}B`;
		}
		return `${(num / 1000000000).toFixed(fixed)}B`;
	} else if (num > 1000000000000) {
		if ((num / 1000000000000).toFixed(fixed).endsWith(".000")) {
			return `${(num / 1000000000000).toFixed(0)}T`;
		}
		return `${(num / 1000000000000).toFixed(fixed)}T`;
	} else if (num < 900) {
		return num;
	}
	return num;
};
