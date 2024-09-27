/* eslint-disable prettier/prettier */
import { Router } from "express";
import { Routes } from "@/types";
import validationMiddleware from "@/lib/middlewares/validation.middleware";
import {
    changeListingStatusSchema,
	createListingSchema,
    deleteListingSchema,
    searchListingsSchema,
    updateListingSchema,
} from "../validation";
import upload from "@/lib/middlewares/multer.middleware";
import ListingController from "../controllers/listing.controller";
class ListingRoute implements Routes {
	public path = "/listings";
	public router: Router = Router();
	public listingController = new ListingController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post(
			`${this.path}/create`,
			validationMiddleware({ body: createListingSchema }),
			this.listingController.createListing.bind(this.listingController)
		);
        this.router.post(
			`${this.path}/update/:listingId`,
			validationMiddleware(updateListingSchema),
			this.listingController.updateListing.bind(this.listingController)
		);
        this.router.post(
			`${this.path}/search`,
			validationMiddleware(searchListingsSchema),
			this.listingController.searchListings.bind(this.listingController)
		);
		this.router.post(
			`${this.path}/change-status/:listingId`,
			validationMiddleware(changeListingStatusSchema),
			this.listingController.changeListingStatus.bind(this.listingController)
		);
		this.router.get(
			`${this.path}/all`,
			this.listingController.getListings.bind(this.listingController)
		);
        this.router.get(
			`${this.path}/byUser/:userId`,
			this.listingController.getUserListings.bind(this.listingController)
		);
		this.router.get(
			`${this.path}/:id`,
			this.listingController.getSingleListing.bind(this.listingController)
		);
		this.router.post(
			`${this.path}/upload`,
			upload.array("images", 10),
			this.listingController.uploadImages.bind(this.listingController)
		);

		this.router.post(
			`${this.path}/delete/:listingId`,
            validationMiddleware(deleteListingSchema),
			this.listingController.deleteListing.bind(this.listingController)
		);

	}
}

export default ListingRoute;
