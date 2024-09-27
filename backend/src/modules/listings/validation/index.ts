/* eslint-disable prettier/prettier */
import Joi from "joi";
import { ListingCondition, ListingStatus, ListingType } from "../types";

export const createCategorySchema = {
	body: Joi.object({
		name: Joi.string().required(),
		image: Joi.string().required(),
		parentCategory: Joi.string().optional(),
	}),
};

export const createListingSchema = Joi.object({
	productName: Joi.string().required(),
	category: Joi.string().required(),
	subCategory: Joi.string().required(),
	items: Joi.array()
		.items(
			Joi.object({
				name: Joi.string().required(),
				quantity: Joi.number().required(),
			})
		)
		.required(),
	productionType: Joi.string().required(),
	fieldValues: Joi.object()
		.pattern(
			Joi.string(),
			Joi.alternatives().try(Joi.string(), Joi.array().items(Joi.string()))
		)
		.required(),
	description: Joi.string().required(),
	listingPhotos: Joi.array().items(Joi.string().uri()).required(),
	listingType: Joi.string()
		.valid(...Object.values(ListingType))
		.required(),
	condition: Joi.string()
		.valid(...Object.values(ListingCondition))
		.required(),
	offer: Joi.object({
		forRent: Joi.object({
			currency: Joi.string().optional(),
			day1Offer: Joi.number(),
			day3Offer: Joi.number(),
			day7Offer: Joi.number(),
			overtimePercentage: Joi.number(),
			totalReplacementValue: Joi.number(),
		}).optional(), // For rent can be optional in some cases
		forSale: Joi.object({
			currency: Joi.string().optional(),
			pricing: Joi.number(),
			shipping: Joi.object({
				shippingOffer: Joi.boolean(),
				offerLocalPickup: Joi.boolean(),
				shippingCosts: Joi.boolean(),
			}),
		}).optional(), // For sale can be optional in some cases
	}).required(),
	userId: Joi.string().required(),
}).unknown(false);

export const updateListingSchema = {
	body: Joi.object({
		productName: Joi.string().optional(),
		category: Joi.string().optional(),
		subCategory: Joi.string().optional(),
		items: Joi.array()
			.items(
				Joi.object({
					name: Joi.string().required(),
					quantity: Joi.number().required(),
				})
			)
			.optional(),
		productionType: Joi.string().optional(),
		fieldValues: Joi.object()
			.pattern(
				Joi.string(),
				Joi.alternatives().try(Joi.string(), Joi.array().items(Joi.string()))
			)
			.optional(),
		description: Joi.string().optional(),
		listingPhotos: Joi.array().items(Joi.string().uri()).optional(),
		listingType: Joi.string()
			.valid(...Object.values(ListingType))
			.optional(),
		condition: Joi.string()
			.valid(...Object.values(ListingCondition))
			.optional(),
		offer: Joi.object({
			forRent: Joi.object({
				currency: Joi.string().optional(),
				day1Offer: Joi.number(),
				day3Offer: Joi.number(),
				day7Offer: Joi.number(),
				overtimePercentage: Joi.number(),
				totalReplacementValue: Joi.number(),
			}).optional(), // For rent can be optional in some cases
			forSale: Joi.object({
				currency: Joi.string().optional(),
				pricing: Joi.number(),
				shipping: Joi.object({
					shippingOffer: Joi.boolean(),
					offerLocalPickup: Joi.boolean(),
					shippingCosts: Joi.boolean(),
				}),
			}).optional(),
		}).optional(),
		status: Joi.string()
			.valid(...Object.values(ListingStatus))
			.optional(),
		userId: Joi.string().required(),
	}).unknown(false),
	params: Joi.object({
		listingId: Joi.string().required(),
	}),
};

export const searchListingsSchema = {
	body: Joi.object({
		listingType: Joi.string()
			.valid(...Object.values(ListingType))
			.optional(),
		productName: Joi.string().optional(),
		description: Joi.string().optional(),
		category: Joi.string().optional(),
		location: Joi.object({
			address: Joi.string().optional(),
			city: Joi.string().optional(),
			state: Joi.string().optional(),
			country: Joi.string().optional(),
			coords: Joi.object({
				longitude: Joi.number().required(),
				latitude: Joi.number().required(),
			}).optional(),
		}).optional(),
	}).unknown(false)
};

export const changeListingStatusSchema = {
	body: Joi.object({
		status: Joi.string()
			.valid(...Object.values(ListingStatus))
			.required(),
		userId: Joi.string().required(),
	}).unknown(false),
	params: Joi.object({
		listingId: Joi.string().required(),
	}),
};

export const deleteListingSchema = {
	body: Joi.object({
		userId: Joi.string().required(),
	}).unknown(false),
	params: Joi.object({
		listingId: Joi.string().required(),
	}),
};

export const createMultipleListingsSchema = Joi.array()
	.items(createListingSchema)
	.min(1)
	.required();
