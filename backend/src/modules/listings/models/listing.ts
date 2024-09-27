/* eslint-disable prettier/prettier */
import { Model, PipelineStage, Schema, Types, model } from "mongoose";
import {
	Category,
	Items,
	Listing,
	ListingCondition,
	ListingLocation,
	ListingStatus,
	ListingType,
	OfferForRent,
	OfferForSell,
	Perks,
	subCategoryFields,
} from "../types";
import { Review, User } from "@/modules/users/types";

export type AggregatedListing = Listing & {
	user: Partial<User>;
	category: {
		_id: Types.ObjectId;
		name: string;
		image: string;
	};
	subCategory: {
		_id: Types.ObjectId;
		name: string;
		image: string;
	};
	ownerReviews: Array<Partial<Review>>;
	averageRating: number | null;
};

const offerForRentSchema = new Schema<OfferForRent>({
	currency: { type: Schema.Types.String }, // Correct usage of Schema.Types.String
	day1Offer: { type: Schema.Types.Number },
	day3Offer: { type: Schema.Types.Number },
	day7Offer: { type: Schema.Types.Number },
	overtimePercentage: { type: Schema.Types.Number },
	totalReplacementValue: { type: Schema.Types.Number },
});

const offerForSellSchema = new Schema<OfferForSell>({
	currency: { type: Schema.Types.String }, // Correct usage of Schema.Types.String
	pricing: { type: Schema.Types.Number },
	acceptOffers: { type: Schema.Types.Boolean },
	shipping: {
		shippingOffer: { type: Schema.Types.Boolean },
		offerLocalPickup: { type: Schema.Types.Boolean },
		shippingCosts: { type: Schema.Types.Boolean },
	},
});

const perksSchema = new Schema<Perks>({
	buyNow: { type: Schema.Types.Boolean },
	freeShipping: { type: Schema.Types.Boolean },
	makeOffer: { type: Schema.Types.Boolean },
	pickup: { type: Schema.Types.Boolean },
	shipping: { type: Schema.Types.Boolean },
	terms: { type: Schema.Types.Boolean },
});

const locationSchema = new Schema<ListingLocation>({
	address: { type: Schema.Types.String },
	city: { type: Schema.Types.String },
	state: { type: Schema.Types.String, required: true },
	country: { type: Schema.Types.String, default: "nigeria" },
	coords: {
		latitude: { type: Schema.Types.Number, required: true },
		longitude: { type: Schema.Types.Number, required: true },
	},
});

const itemsSchema = new Schema<Items>({
	name: { type: Schema.Types.String },
	quantity: { type: Schema.Types.Number },
});

const listingSchema = new Schema<Listing>({
	user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
	productName: { type: Schema.Types.String, required: true },
	productSlug: { type: Schema.Types.String, required: true, unique: true },
	category: {
		type: Schema.Types.ObjectId,
		ref: "Category",
		required: true,
		index: true,
	},
	subCategory: { type: Schema.Types.ObjectId, ref: "Category", index: true },
	productionType: { type: Schema.Types.String, required: true },
	fieldValues: {
		type: Map,
		of: Schema.Types.Mixed,
		required: true,
	},
	description: { type: Schema.Types.String, required: true },
	listingPhotos: { type: [Schema.Types.String], required: true },
	listingType: {
		type: Schema.Types.String,
		enum: Object.values(ListingType),
		required: true,
	},
	condition: {
		type: Schema.Types.String,
		enum: Object.values(ListingCondition),
		required: true,
	},
	offer: {
		forRent: offerForRentSchema,
		forSell: offerForSellSchema,
	},
	perks: perksSchema,
	items: [itemsSchema],
	amount: { type: Schema.Types.Number },
	contractId: { type: Schema.Types.String, index: true },
	transactionId: { type: Schema.Types.String, index: true },
	nftTokenId: { type: Schema.Types.String, index: true },
	status: {
		type: Schema.Types.String,
		enum: Object.values(ListingStatus),
		default: ListingStatus.Available,
	},
	location: locationSchema,
	createdAt: { type: Schema.Types.Date, default: Date.now() },
	updatedAt: { type: Schema.Types.Date },
});

listingSchema.set("strict", "throw");
listingSchema.set("strictQuery", "throw");

export interface ListingModel extends Model<Listing> {
	createListingPipeline(match: any): PipelineStage[];
	findByIdWithOwnerReviews(listingId: string): Promise<AggregatedListing>;
	findAllWithOwnerReviews(options: {
		page?: number;
		limit?: number;
		filters?: any;
		pipeline?: PipelineStage[];
		overridePipeline?: PipelineStage[];
		paginate?: boolean;
	}): Promise<{
		listings: AggregatedListing[];
		total: number;
		page?: number;
		totalPages?: number;
	}>;
}

function createListingPipeline(match: any = {}): PipelineStage[] {
	return [
		{ $match: match },
		{
			$addFields: {
				categoryObjectId: {
					$toObjectId: "$category", // Convert category string to ObjectId
				},
				subCategoryObjectId: {
					$toObjectId: "$subCategory", // Convert subCategory string to ObjectId
				},
				userObjectId: {
					$toObjectId: "$user", // Convert user string to ObjectId
				},
			},
		},
		// get category details
		{
			$lookup: {
				from: "category",
				localField: "categoryObjectId",
				foreignField: "_id",
				as: "category",
			},
		},
		{ $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
		{
			$lookup: {
				from: "category",
				localField: "subCategoryObjectId",
				foreignField: "_id",
				as: "subCategory",
			},
		},
		{ $unwind: { path: "$subCategory", preserveNullAndEmptyArrays: true } },
		// Lookup the owner details
		{
			$lookup: {
				from: "users",
				localField: "userObjectId",
				foreignField: "_id",
				as: "user",
			},
		},
		{ $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },

		{
			$lookup: {
				from: "reviews",
				let: { ownerId: "$user._id" },
				pipeline: [
					{
						$match: {
							$expr: { $eq: ["$reviewed", "$$ownerId"] },
						},
					},
					// Lookup reviewer details
					{
						$lookup: {
							from: "users",
							localField: "reviewer",
							foreignField: "_id",
							as: "reviewer",
						},
					},
					{ $unwind: { path: "$reviews", preserveNullAndEmptyArrays: true } },
					{
						$project: {
							_id: 1,
							rating: 1,
							comment: 1,
							createdAt: 1,
							"reviewer.userName": 1,
							"reviewer.name": 1,
							"reviewer.avatar": 1,
						},
					},
				],
				as: "reviews",
			},
		},

		// Calculate average rating
		{
			$addFields: {
				averageRating: { $avg: "$reviews.rating" },
				totalReviews: { $size: "$reviews" },
			},
		},

		// Final projection to shape the output
		{
			$project: {
				_id: 1,
				productName: 1,
				productSlug: 1,
				category: {
					_id: 1,
					name: 1,
					image: 1,
				},
				subCategory: {
					_id: 1,
					name: 1,
					image: 1,
				},
				productionType: 1,
				fieldValues: 1,
				description: 1,
				listingPhotos: 1,
				listingType: 1,
				condition: 1,
				offer: 1,
				perks: 1,
				items: 1,
				amount: 1,
				contractId: 1,
				transactionId: 1,
				nftTokenId: 1,
				status: 1,
				location: 1,
				createdAt: 1,
				updatedAt: 1,
				user: {
					_id: 1,
					userName: 1,
					name: 1,
					avatar: 1,
				},
				reviews: 1,
				totalReviews: 1,
				averageRating: 1,
			},
		},
	];
}

listingSchema.statics.createListingPipeline = createListingPipeline;
listingSchema.statics.findByIdWithOwnerReviews = async function (
	listingId: string
): Promise<AggregatedListing | null> {
	const pipeline = createListingPipeline({ _id: new Types.ObjectId(listingId) });
	const [listing] = await this.aggregate([
		...pipeline,
		{
			$lookup: {
				from: "listings",
				let: { ownerId: "$owner._id", currentListingId: "$_id" },
				pipeline: [
					{
						$match: {
							$expr: {
								$and: [
									{ $eq: ["$user", "$$ownerId"] },
									{ $ne: ["$_id", "$$currentListingId"] },
								],
							},
						},
					},
					{ $limit: 5 },
				],
				as: "ownerOtherListings",
			},
		},
		{
			$addFields: {
				ownerTotalListings: {
					$add: [{ $size: "$ownerOtherListings" }, 1], // Add 1 to include the current listing
				},
			},
		},
	]);
	return listing || null;
};

listingSchema.statics.findAllWithOwnerReviews = async function ({
	page = 1,
	limit = 10,
	filters = {},
	pipeline = [],
	overridePipeline = undefined,
	paginate = true,
}: {
	page?: number;
	limit?: number;
	filters?: any;
	pipeline?: PipelineStage[];
	overridePipeline?: PipelineStage[];
	paginate?: boolean;
} = {}): Promise<{
	listings: AggregatedListing[];
	total: number;
	page?: number;
	totalPages?: number;
}> {
	let lookupPipeline = createListingPipeline(filters);
	if(pipeline) lookupPipeline = [...lookupPipeline, ...pipeline];
	if(overridePipeline && Array.isArray(overridePipeline)) lookupPipeline = overridePipeline;
	if (paginate) {
		const skip = (page - 1) * limit;
		lookupPipeline = [
			...lookupPipeline,
			{
				$facet: {
					metadata: [{ $count: "total" }, { $addFields: { page: page } }],
					data: [{ $skip: skip }, { $limit: limit }],
				},
			},
		];

		const [result] = await this.aggregate(lookupPipeline);
		const listings = result.data;
		const metadata = result.metadata[0];

		return {
			listings,
			total: metadata?.total || 0,
			page: page,
			totalPages: metadata ? Math.ceil(metadata.total / limit) : 0,
		};
	} else {
		// If not paginating, simply execute the lookupPipeline and count the results
		const listings = await this.aggregate(lookupPipeline);
		return {
			listings,
			total: listings.length,
		};
	}
};

const listingModel = model<Listing, ListingModel>("Listing", listingSchema, "listings");

export default listingModel;
