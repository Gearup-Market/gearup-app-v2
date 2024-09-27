/* eslint-disable prettier/prettier */
import {
	Listing,
	ListingCondition,
	ListingStatus,
	ListingType,
	SearchQuery,
} from "../types";
import { HttpException } from "@/core/exceptions/HttpException";
import listingModel from "../models/listing";
import { isEmpty } from "@/core/utils/isEmpty";
import { Types } from "mongoose";
import { logger } from "@/core/utils/logger";
import { uploadImagesToCloudinary } from "@/shared/utils";
import userModel from "@/modules/users/models/users";
import { slugifyText } from "@/shared/utils/slugify";
import { isNil, omitBy } from "lodash";
import MarketplaceClient from "../lib/marketplace/web3";

class ListingService {
	private listing = listingModel;
	private marketplaceClient = new MarketplaceClient();

	public async createListings(listingData: any): Promise<Listing> {
		try {
			const {
				productName,
				category,
				subCategory,
				productionType,
				fieldValues,
				description,
				listingType,
				condition,
				offer,
				listingPhotos,
				userId,
			} = listingData;

			// Validate listing type
			if (!Object.values(ListingType).includes(listingType)) {
				throw new HttpException(400, "Invalid listing type");
			}
			if (!Object.values(ListingCondition).includes(condition)) {
				throw new HttpException(400, "Invalid gear condition");
			}

			// Validate user ID
			if (!Types.ObjectId.isValid(userId)) {
				throw new HttpException(400, "Invalid user ID");
			}

			const userExists = await userModel.findOne({ userId });
			if (!userExists) {
				throw new HttpException(404, "User not found");
			}

			const _id = new Types.ObjectId();
			const productSlug = slugifyText(`${productName}-${_id}`);
			const newListing = await this.listing.create({
				_id,
				productSlug,
				productName,
				category: new Types.ObjectId(category),
				subCategory: new Types.ObjectId(subCategory),
				productionType,
				fieldValues,
				description,
				listingType,
				condition,
				offer,
				listingPhotos,
				user: new Types.ObjectId(userId),
			});
			const price = (
				listingType === ListingType.Rent
					? offer.forRent?.day1Offer
					: offer.forSell?.pricing
			) as number;
			console.log(newListing, "new listing");
			this.marketplaceClient.createListing({
				userId,
				listingId: _id.toString(),
				type: listingType,
				duration: 0,
				price,
				metadata: `https://gearup.market/listings/${_id.toString()}`,
			});

			return newListing;
		} catch (error) {
			throw new HttpException(error?.status || 500, error.message);
		}
	}

	public async updateListing(listingData: any, listingId: string) {
		try {
			if (isEmpty(listingId)) throw new HttpException(400, "Invalid listing ID");
			const listing = await this.listing.findById(listingId);
			if (!listing)
				throw new HttpException(404, "No listing found for orovided ID");

			const updatePayload = omitBy(listingData, isNil);
			const { productName, userId } = updatePayload;

			if (listing.user.toString() !== userId)
				throw new HttpException(401, "Unauthorized to update this listing");
			delete updatePayload.userId;

			if (productName) {
				updatePayload.productSlug = slugifyText(`${productName}-${listingId}`);
			}

			updatePayload.updatedAt = new Date();

			await listing.update(updatePayload);
			return { ...listing.toJSON(), ...updatePayload };
		} catch (error) {
			throw new HttpException(error?.status || 500, error?.message);
		}
	}

	public async changeListingStatus(payload: any, listingId: string) {
		try {
			if (isEmpty(listingId)) throw new HttpException(400, "Invalid listing ID");
			const listing = await this.listing.findById(listingId);
			if (!listing)
				throw new HttpException(404, "No listing found for orovided ID");

			const { userId, status } = payload;
			if (listing.user.toString() !== userId)
				throw new HttpException(401, "Unauthorized to update this listing");

			if (listing.status === ListingStatus.Inuse)
				throw new HttpException(
					402,
					"A transaction is ongoing for this listing so not possible to modify state"
				);
			listing.status = status;
			listing.updatedAt = new Date();
			await listing.save();
			return { ...listing.toJSON(), status };
		} catch (error) {
			throw new HttpException(error?.status || 500, error?.message);
		}
	}

	public async deleteListing(userId: string, listingId: string) {
		try {
			if (isEmpty(listingId)) throw new HttpException(400, "Invalid listing ID");
			const listing = await this.listing.findById(listingId);
			if (!listing)
				throw new HttpException(404, "No listing found for provided ID");

			if (listing.user.toString() !== userId)
				throw new HttpException(401, "Unauthorized to delete this listing");

			await listing.delete();
		} catch (error) {
			throw new HttpException(error?.status || 500, error?.message);
		}
	}

	public async deleteAllListing(userId: string) {
		try {
			if (isEmpty(userId)) throw new HttpException(400, "Invalid listing ID");
			const listing = await this.listing.deleteMany({
				user: new Types.ObjectId(userId),
			});
		} catch (error) {
			throw new HttpException(error?.status || 500, error?.message);
		}
	}

	public async searchListings({
		category,
		description,
		productName,
		listingType,
		location,
	}: SearchQuery): Promise<Listing[]> {
		try {
			const filters: any = {};
			if (productName) {
				filters.productName = { $regex: productName, $options: "i" }; // 'i' for case-insensitive
			}
			if (productName) {
				filters.description = { $regex: description, $options: "i" }; // 'i' for case-insensitive
			}
			if (listingType) {
				filters.listingType = listingType;
			}

			if (location) {
				if (location.city) {
					filters["location.city"] = { $regex: location.city, $options: "i" };
				}
				if (location.state) {
					filters["location.state"] = { $regex: location.state, $options: "i" };
				}
				if (location.country) {
					filters["location.country"] = {
						$regex: location.country,
						$options: "i",
					};
				}
				if (location?.coords) {
					filters["location.coords"] = {
						$geoWithin: {
							$centerSphere: [
								[location.coords.longitude, location.coords.latitude],
								60 / 6371, // 60km search radius in radians
							],
						},
					};
				}
			}
			let pipeline = [];
			if (category) {
				pipeline = [
					{
						$match: category
							? {
									"category.name": {
										$regex: category,
										$options: "i",
									},
									"subCategory.name": {
										$regex: category,
										$options: "i",
									},
							  }
							: {},
					},
				];
			}

			const { listings } = await this.listing.findAllWithOwnerReviews({
				filters,
				paginate: false,
				pipeline,
			});
			return listings as Listing[];
		} catch (error) {
			throw new HttpException(error?.status || 500, error.message);
		}
	}

	public async getListings(): Promise<Listing[]> {
		try {
			const { listings } = await this.listing.findAllWithOwnerReviews({
				paginate: false,
			});
			return listings as Listing[];
		} catch (error) {
			throw new HttpException(error?.status || 500, error.message);
		}
	}

	public async getUserListings(userId: string): Promise<Listing[]> {
		try {
			const { listings } = await this.listing.findAllWithOwnerReviews({
				paginate: false,
				filters: {
					$or: [{ user: new Types.ObjectId(userId) }, { user: userId }],
				},
			});
			return listings;
		} catch (error) {
			logger.error(`Error retrieving listings: ${error.message}`);
			throw new HttpException(error?.status || 500, error.message);
		}
	}

	public async getSingleListing(listingId: string): Promise<Listing> {
		try {
			if (!Types.ObjectId.isValid(listingId)) {
				throw new HttpException(400, "Invalid listing ID");
			}

			const listing = await this.listing.findByIdWithOwnerReviews(listingId);
			return listing;
		} catch (error) {
			logger.error(`Error retrieving listing: ${error.message}`);
			throw new HttpException(error?.status || 500, error.message);
		}
	}

	public async getListingByIdNoMetadata(listingId: string) {
		try {
			if (!listingId) throw new HttpException(400, "Listing id is required");
			return await this.listing.findById(listingId).lean();
		} catch (error) {}
	}

	public async uploadImages(files: Express.Multer.File[]): Promise<string[]> {
		try {
			const imageUrls = await uploadImagesToCloudinary(files);
			return imageUrls;
		} catch (error: any) {
			logger.info(error.message);
			throw new HttpException(error?.status || 500, error?.message);
		}
	}
}

export default ListingService;
