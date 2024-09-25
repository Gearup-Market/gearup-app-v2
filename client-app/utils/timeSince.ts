export const timeSince = (date:any, isLong?: any) => {
	const today: any = new Date();
	const time: any = new Date(date);

	const seconds: any = Math.floor((today - time) / 1000);

	let interval = Math.floor(seconds / 31536000);
	const second = interval > 1 ? " seconds" : " second";

	if (interval > 1) {
		const year = interval > 1 ? " years" : " year";
		return `${interval}${isLong ? year : " y"}`;
	}
	interval = Math.floor(seconds / 2592000);
	if (interval > 1) {
		const month = interval > 1 ? " months" : " month";
		return `${interval}${isLong ? month : " M"}`;
	}
	interval = Math.floor(seconds / 86400);
	if (interval > 1) {
		const day = interval > 1 ? " days" : " day";
		return `${interval}${isLong ? day : " d"}`;
	}
	interval = Math.floor(seconds / 3600);
	if (interval > 1) {
		const hour = interval > 1 ? " hours" : " hour";
		return `${interval}${isLong ? hour : " h"}`;
	}
	interval = Math.floor(seconds / 60);
	if (interval > 1) {
		const minutes = interval > 1 ? " minutes" : " minute";
		return `${interval}${isLong ? minutes : " m"}`;
	}
	return `${Math.floor(seconds)}${isLong ? second : " s"}`;
};
