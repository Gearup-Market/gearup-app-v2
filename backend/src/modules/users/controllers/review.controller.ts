import { NextFunction, Request, Response } from "express";
import ReviewService from "../services/review.service";

class ReviewController {
	private reviewService = new ReviewService();

	public async addReview(req: Request, res: Response, next: NextFunction) {
		try {
			const payload = req.body;
			const review = await this.reviewService.addReview(payload);
			res.json({ data: review, message: "success" }).status(200);
		} catch (error) {
			next(error);
		}
	}

	public async getAllReviewsForUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { userId } = req.params;
			const reviews = await this.reviewService.getAllReviewsForUser(userId);
			res.json({ data: reviews, message: "success" }).status(200);
		} catch (error) {
			next(error);
		}
	}

	public async getAllReviewsFromUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { userId } = req.params;
			const reviews = await this.reviewService.getAllReviewsFromUser(userId);
			res.json({ data: reviews, message: "success" }).status(200);
		} catch (error) {
			next(error);
		}
	}
}

export default ReviewController;
