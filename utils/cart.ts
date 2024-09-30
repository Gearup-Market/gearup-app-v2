import { CartItem, TransactionType } from "@/app/api/hooks/transactions/types";
import { Listing } from "@/store/slices/listingsSlice";

function getApplicableRate(offer: Listing["offer"], durationInDays: number) {
	const { forRent } = offer;
	let rate: number = 0;
	if (durationInDays < 3) {
		rate = forRent?.day1Offer!;
	} else if (forRent?.day3Offer && durationInDays > 3 && durationInDays < 7) {
		rate = forRent.day3Offer / 3;
	} else if (forRent?.day7Offer && durationInDays > 7 && durationInDays < 30) {
		rate = forRent.day7Offer / 7;
	} else if (forRent?.day30Offer && durationInDays >= 30) {
		rate = forRent.day30Offer / 30;
	} else {
		rate = forRent?.day1Offer!;
	}
	return rate;
}

export function calculateItemPrice(item: CartItem): number {
	const { type, rentalPeriod, listing } = item;

	if (rentalPeriod && type === TransactionType.Rental) {
		const durationInDays = Math.ceil(
			(new Date(rentalPeriod.end).getTime() - new Date(rentalPeriod.start).getTime()) /
				(1000 * 3600 * 24)
		);
		return getApplicableRate(listing.offer, durationInDays) * durationInDays;
	}

	if (listing?.offer?.forSell) {
		return listing.offer.forSell.pricing!;
	}
	return 0;
}