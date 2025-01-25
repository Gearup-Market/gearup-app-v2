import { CartItem, TransactionType } from "@/app/api/hooks/transactions/types";
import { Listing } from "@/store/slices/listingsSlice";

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

function getApplicableRate(offer: Listing["offer"], durationInDays: number) {
	const { forRent } = offer;
	if (!forRent || !forRent.rates || forRent.rates.length === 0) return 0;

	const matchingRate = forRent.rates.find(rate => rate.quantity === durationInDays);

	if (matchingRate) {
		return matchingRate.price;
	}

	const applicableRate = forRent.rates.reduce((bestMatch, currentRate) => {
		if (currentRate.quantity <= durationInDays) {
			return currentRate.quantity > bestMatch.quantity ? currentRate : bestMatch;
		}
		return bestMatch;
	}, forRent.rates[0]);

	return applicableRate.price / applicableRate.quantity;
}

export function calculateItemPrice(item: CartItem): number {
	const { type, rentalPeriod, listing } = item;

	if (rentalPeriod && type === TransactionType.Rental) {
		const durationInDays = Math.ceil(
			(new Date(rentalPeriod.end).getTime() -
				new Date(rentalPeriod.start).getTime()) /
				(1000 * 3600 * 24)
		);
		return getApplicableRate(listing.offer, durationInDays) * durationInDays;
	}

	if (listing?.offer?.forSell) {
		return listing.offer.forSell.pricing!;
	}
	return 0;
}
