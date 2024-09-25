/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from "express";
import ListingService from "../services/listing.service";

class ListingController {
	private listingService = new ListingService();

	public async createListing(req: Request, res: Response, next: NextFunction) {
		try {
			const listingData = req.body;
			const newListing = await this.listingService.createListings(listingData);
			res.status(201).json({
				data: newListing,
				message: "Listing created successfully",
			});
		} catch (error) {
			next(error);
		}
	}

	public async updateListing(req: Request, res: Response, next: NextFunction) {
		try {
			const listingData = req.body;
			const { listingId } = req.params;
			const listing = await this.listingService.updateListing(
				listingData,
				listingId
			);
			res.status(201).json({
				data: listing,
				message: "Listing updated successfully",
			});
		} catch (error) {
			next(error);
		}
	}

	public async deleteListing(req: Request, res: Response, next: NextFunction) {
		try {
			const { userId } = req.body;
			const { listingId } = req.params;
			const listing = await this.listingService.deleteListing(
				userId,
				listingId
			);
			res.status(201).json({
				data: listing,
				message: "Listing removed successfully",
			});
		} catch (error) {
			next(error);
		}
	}

	public async changeListingStatus(req: Request, res: Response, next: NextFunction) {
		try {
			const payload = req.body;
			const { listingId } = req.params;
			const listing = await this.listingService.changeListingStatus(
				payload,
				listingId
			);
			res.status(201).json({
				data: listing,
				message: "Listing updated successfully",
			});
		} catch (error) {
			next(error);
		}
	}

	public async getListings(req: Request, res: Response, next: NextFunction) {
		try {
			const listings = await this.listingService.getListings();
			res.status(200).json({
				data: listings,
				message: "Listings retrieved successfully",
			});
		} catch (error) {
			next(error);
		}
	}

	public async getUserListings(req: Request, res: Response, next: NextFunction) {
		try {
			const { userId } = req.params;
			const listings = await this.listingService.getUserListings(userId);
			res.status(200).json({
				data: listings,
				message: "Listings retrieved successfully",
			});
		} catch (error) {
			next(error);
		}
	}

	public async getSingleListing(req: Request, res: Response, next: NextFunction) {
		try {
			const listingId = req.params.id;
			const listing = await this.listingService.getSingleListing(listingId);
			res.status(200).json({
				data: listing,
				message: "Listing retrieved successfully",
			});
		} catch (error) {
			next(error);
		}
	}

	public async uploadImages(req: Request, res: Response, next: NextFunction) {
		try {
			const files = req.files as Express.Multer.File[];
			if (!files || !(files instanceof Array) || files.length < 1) {
				res.status(400).json({ message: "No files uploaded or invalid format" });
				return;
			}

			const imageUrls = await this.listingService.uploadImages(files);
			res.status(200).json({ imageUrls });
		} catch (error) {
			next(error);
		}
	}
}

export default ListingController;
