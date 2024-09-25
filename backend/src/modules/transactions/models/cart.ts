import { model, Schema, Document, Types } from "mongoose";
import { Cart, CartItem, RentalPeriod, TransactionType } from "../types";
import { Model } from "mongoose";
import { Listing } from "@/modules/listings/types";
import { HttpException } from "@/core/exceptions/HttpException";
import listingModel, { ListingModel } from "@/modules/listings/models/listing";

const cartItemSchema = new Schema<CartItem>({
	listing: { type: Schema.Types.ObjectId, ref: "Listing", required: true },
	type: {
		type: Schema.Types.String,
		required: true,
		enum: Object.values(TransactionType),
		default: TransactionType.Rental,
	},
	rentalPeriod: {
		start: { type: Schema.Types.Date },
		end: { type: Schema.Types.Date },
	},
	price: { type: Schema.Types.Number },
});

const cartSchema = new Schema<Cart>({
	user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
	items: [cartItemSchema],
	totalAmount: { type: Schema.Types.Number, default: 0 },
	createdAt: { type: Schema.Types.Date, default: Date.now() },
	updatedAt: { type: Schema.Types.Date },
});

interface IPopulatedCartItem extends Omit<CartItem, "listing"> {
	listing: Listing & {
		owner: { _id: string; username: string };
		ownerReviews: Array<{
			rating: number;
			comment: string;
			reviewer: { username: string };
		}>;
		averageRating: number;
		totalReviews: number;
	};
	calculatedPrice: number;
}

export interface IPopulatedCart extends Omit<Cart, "items"> {
	items: IPopulatedCartItem[];
	totalAmount: number;
}

interface CartModel extends Model<Cart> {
	addToCart(
		userId: string,
		listingId: string,
		type: TransactionType,
		rentalPeriod?: RentalPeriod,
		customPrice?: number
	): Promise<Cart>;
	removeFromCart(userId: string, listingId: string): Promise<Cart>;
	getCart(userId: string): Promise<IPopulatedCart | null>;
	clearCart(userId: string): Promise<void>;
	getCartItem(userId: string, listingId: string): Promise<CartItem | null>;
}

async function recalculateTotal(cart: Cart): Promise<number> {
	let total = 0;
	for (const item of cart.items) {
		if (Types.ObjectId.isValid(item.listing)) {
			const listing = await model("Listing").findById(item.listing); // recheck incase listing price is updated
			if (listing) {
				total += calculateItemPrice(item, listing);
			}
		} else {
			total += item?.price || 0;
		}
	}

	return total;
}

function getApplicableRate(offer: Listing["offer"], durationInDays: number) {
	const { forRent } = offer;
	let rate: number = 0;
	if (durationInDays < 3) {
		rate = forRent.day1Offer;
	} else if (forRent?.day3Offer && durationInDays > 3 && durationInDays < 7) {
		rate = forRent.day3Offer / 3;
	} else if (forRent?.day7Offer && durationInDays >= 7) {
		rate = forRent.day7Offer / 7;
	} else {
		rate = forRent.day1Offer;
	}
	return rate;
}

function calculateItemPrice(item: CartItem, listing: Listing): number {
	const { price, rentalPeriod } = item;
	if (price) {
		return price;
	}

	if (rentalPeriod) {
		const durationInDays = Math.ceil(
			(rentalPeriod.end.getTime() - rentalPeriod.start.getTime()) /
				(1000 * 3600 * 24)
		);
		return getApplicableRate(listing.offer, durationInDays) * durationInDays;
	}

	if (listing.offer.forSell) {
		return listing.offer.forSell.pricing;
	}
	return 0;
}

// Add to Cart
cartSchema.statics.addToCart = async function (
	userId: string,
	listingId: string,
	type: TransactionType,
	rentalPeriod?: RentalPeriod,
	customPrice?: number
): Promise<Cart> {
    const _listingsModel = listingModel
	const listing = await _listingsModel.findById(listingId).lean();
	if (!listing) {
		throw new HttpException(404, "Listing not found");
	}

	let cart: Cart = await this.findOne({ user: userId });
	if (!cart) {
		cart = new this({ user: userId, items: [] });
	}

	const existingItemIndex = cart.items.findIndex(
		item => item.listing.toString() === listingId
	);

	if (existingItemIndex > -1) {
		throw new HttpException(400, "Item already in cart");
	} else {
		cart.items.push({
			listing: new Types.ObjectId(listingId),
			type,
			rentalPeriod: rentalPeriod || null,
			price: customPrice || null,
		});
	}

	cart.user = new Types.ObjectId(userId);
	cart.totalAmount = await recalculateTotal(cart);
	cart.updatedAt = new Date();
	await cart.save();
	return cart;
};

cartSchema.statics.removeFromCart = async function (
	userId: string,
	listingId: string
): Promise<Cart> {
	const cart: Cart = await this.findOne({ user: userId });
	if (!cart) {
		throw new HttpException(400, "Cart not found for user");
	}

	cart.items = cart.items.filter(item => item.listing.toString() !== listingId);
	cart.totalAmount = await recalculateTotal(cart);
	cart.updatedAt = new Date();
	await cart.save();
	return cart;
};

cartSchema.statics.getCart = async function (
	userId: string
): Promise<IPopulatedCartItem | null> {
    const _listingsModel = listingModel
	const cart = await this.findOne({ user: userId });
	if (!cart) return null;

	const listingIds = cart.items.map(item => item.listing.toString());

	const listingsPipeline = _listingsModel.createListingPipeline({ _id: { $in: listingIds.map(id => new Types.ObjectId(id)) } });
	const listings = await _listingsModel.aggregate(listingsPipeline);

	const listingsMap = new Map(
		listings.map(listing => [listing._id.toString(), listing])
	);

	const populatedItems: IPopulatedCartItem[] = await Promise.all(
		cart.items.map(async item => {
			const listing = listingsMap.get(
				item.listing.toString()
			) as IPopulatedCartItem["listing"];
			if (!listing) {
				throw new Error(`Listing not found for id: ${item.listing}`);
			}
			const calculatedPrice = calculateItemPrice(item, listing);
			return {
				...item.toObject(),
				listing,
				calculatedPrice,
			};
		})
	);

	const totalAmount = populatedItems.reduce(
		(total, item) => total + item.calculatedPrice,
		0
	);

	return {
		...cart.toObject(),
		items: populatedItems,
		totalAmount,
	};
};

cartSchema.statics.getCartItem = async function (
	userId: string,
	listingId: string
): Promise<CartItem> {
	const cart = await this.findOne({ user: userId }).populate("items.listing");
	if (!cart) return null;

	const item = cart.items.find(item => item.listing.toString() === listingId);
	return item || null;
};

cartSchema.statics.clearCart = async function (userId: string): Promise<void> {
	await this.findOneAndUpdate(
		{ user: userId },
		{ $set: { items: [], totalAmount: 0, updatedAt: new Date() } }
	);
};

cartSchema.pre("save", function (next) {
	this.updatedAt = new Date();
	next();
});

const cartModel = model<Cart, CartModel>("Cart", cartSchema);
export default cartModel;
