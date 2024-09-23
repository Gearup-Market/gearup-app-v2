export const formatNumber = (num: number, dp: number = 2) =>
	new Intl.NumberFormat("en-US", {
		maximumFractionDigits: dp,
        minimumFractionDigits: dp
	}).format(num);
