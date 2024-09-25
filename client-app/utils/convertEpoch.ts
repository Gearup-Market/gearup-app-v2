interface FormattedDate {
	year: number;
	month: number;
	day: number;
	hours: number;
	minutes: number;
	seconds: number;
	dayOfWeek: string;
	monthOfYear: string;
}

const convertEpochToFormattedDate = (epochTimestamp: number): FormattedDate | null => {
	const date = new Date(epochTimestamp * 1000);

	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();

	const dayOptions: { weekday: "short" } = {
		weekday: "short",
	};
	const monthOptions: { month: "short" } = {
		month: "short",
	};
	const dayOfWeek = date.toLocaleDateString(undefined, dayOptions);
	const monthOfYear = date.toLocaleDateString(undefined, monthOptions);

	return { year, month, day, hours, minutes, seconds, dayOfWeek, monthOfYear };
};

export default convertEpochToFormattedDate;
