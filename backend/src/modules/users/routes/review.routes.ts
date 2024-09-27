import { Router } from "express";
import { Routes } from "@/types";
import { validationMiddleware } from "@/lib";
import ReviewController from "../controllers/review.controller";
import { addReviewSchema, getReviewsSchema } from "../validations/review";

class ReviewRoute implements Routes {
	public path = "/reviews";
	public router: Router = Router();
	public reviewController = new ReviewController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(
			`${this.path}/reviewer/:userId`,
			validationMiddleware(getReviewsSchema),
			this.reviewController.getAllReviewsFromUser.bind(this.reviewController)
		);
		this.router.get(
			`${this.path}/:userId`,
			validationMiddleware(getReviewsSchema),
			this.reviewController.getAllReviewsForUser.bind(this.reviewController)
		);
		this.router.post(
			`${this.path}add`,
			validationMiddleware(addReviewSchema),
			this.reviewController.addReview.bind(this.reviewController)
		);
	}
}

export default ReviewRoute;
