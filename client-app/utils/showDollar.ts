import { formatLargeNum } from "./formatLargeNum";

const showDollar = (value: number) => {
	if (!value) return "-";
	return `$${formatLargeNum(value)}`;
};

export default showDollar;
