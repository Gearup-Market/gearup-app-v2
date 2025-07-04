import {
	CartItem,
	RentalBreakdown,
	TransactionType
} from "@/app/api/hooks/transactions/types";
import { Listing } from "@/store/slices/listingsSlice";
import { isListing } from "@/components/CartComponent/CartItems/CartItems";
// function getApplicableRate(offer: Listing["offer"], durationInDays: number) {
// 	const { forRent } = offer;
// 	if (!forRent || !forRent.rates || forRent.rates.length === 0) return 0;
// 	let rate: number = 0;
// 	if (durationInDays < 3) {
// 		rate = forRent?.day1Offer!;
// 	} else if (forRent?.day3Offer && durationInDays > 3 && durationInDays < 7) {
// 		rate = forRent.day3Offer / 3;
// 	} else if (forRent?.day7Offer && durationInDays > 7 && durationInDays < 30) {
// 		rate = forRent.day7Offer / 7;
// 	} else if (forRent?.day30Offer && durationInDays >= 30) {
// 		rate = forRent.day30Offer / 30;
// 	} else {
// 		rate = forRent?.day1Offer!;
// 	}
// 	return rate;
// }

// function getApplicableRate(offer: Listing["offer"], durationInDays: number) {
// 	const { forRent } = offer;
// 	if (!forRent || !forRent.rates || forRent.rates.length === 0) return 0;

// 	const matchingRate = forRent.rates.find(rate => rate.quantity === durationInDays);

// 	if (matchingRate) {
// 		return matchingRate.price;
// 	}

// 	const applicableRate = forRent.rates.reduce((bestMatch, currentRate) => {
// 		if (currentRate.quantity <= durationInDays) {
// 			return currentRate.quantity > bestMatch.quantity ? currentRate : bestMatch;
// 		}
// 		return bestMatch;
// 	}, forRent.rates[0]);

// 	return applicableRate.price / applicableRate.quantity;
// }

// export function calculateItemPrice(item: CartItem): number {
// 	const { type, rentalPeriod, listing } = item;

// 	if (rentalPeriod && type === TransactionType.Rental) {
// 		const durationInDays = Math.ceil(
// 			(new Date(rentalPeriod.end).getTime() -
// 				new Date(rentalPeriod.start).getTime()) /
// 				(1000 * 3600 * 24)
// 		);
// 		return getApplicableRate(listing.offer, durationInDays) * durationInDays;
// 	}

// 	if (listing?.offer?.forSell) {
// 		return listing.offer.forSell.pricing!;
// 	}
// 	return 0;
// }

export function getApplicableRate(
	offer: Listing["offer"],
	duration: number,
	durationType: string
) {
	const { forRent } = offer;
	if (!forRent?.rates || forRent.rates.length === 0) {
		return { price: 0, appliedRate: null };
	}

	const applicableRates = forRent.rates.filter(rate => rate.duration === durationType);
	if (!applicableRates.length) {
		return { price: 0, appliedRate: null };
	}

	const matchingRate = applicableRates.find(rate => rate.quantity === duration);
	if (matchingRate) {
		return { price: matchingRate.price, appliedRate: matchingRate };
	}

	const sortedRates = [...applicableRates].sort((a, b) => b.quantity - a.quantity);

	for (const rate of sortedRates) {
		if (duration >= rate.quantity) {
			return { price: rate.price, appliedRate: rate, duration };
		}
	}

	return { price: applicableRates[0].price, appliedRate: applicableRates[0] };
}

export function calculateItemPrice(item: CartItem): number {
	const { type, rentalBreakdown, listing } = item;

	if (rentalBreakdown?.length && type === TransactionType.Rental) {
		const rateType =
			isListing(listing, item.type as string) &&
			listing.offer.forRent?.rates[0]?.duration;
		if (!rateType) return 0;

		const startDate = new Date(rentalBreakdown[0].date);
		const endDate = new Date(getLastRentalDate(rentalBreakdown));
		const timeDiff = endDate.getTime() - startDate.getTime();

		if (rateType === "hour") {
			const durationInHours = rentalBreakdown.reduce(
				(total, period) => total + period.quantity,
				0
			);
			const { price } = getApplicableRate(listing.offer, durationInHours, "hour");
			return price * durationInHours;
		} else {
			const durationInDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
			const { price } = getApplicableRate(listing.offer, durationInDays, "day");
			return price * durationInDays;
		}
	}

	if (isListing(listing, item.type as string)) {
		return listing.offer.forSell?.pricing!;
	} else {
		return listing.price;
	}

	return 0;
}

export const getLastRentalDate = (rentalBreakdown?: RentalBreakdown[]): Date =>
	rentalBreakdown![rentalBreakdown!.length - 1]?.date;
