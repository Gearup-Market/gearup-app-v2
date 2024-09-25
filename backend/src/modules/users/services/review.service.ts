import { Review, User, UserId } from "../types";
import { HttpException } from "@/core/exceptions/HttpException";
import userModel from "../models/users";
import { isEmpty } from "@/core/utils/isEmpty";
import { Types } from "mongoose";
import reviewModel from "../models/reviews";

class ReviewService {
	private user = userModel;
	private review = reviewModel;

	// all reviews given to a user
	public async getAllReviewsForUser(userId: UserId): Promise<Review[]> {
		try {
			if (isEmpty(userId)) throw new HttpException(400, "UserId is required!");
			const review = await this.review
				.find({ reviewed: userId })
				.populate("reviewer", "-password")
				.populate("reviewed", "-password")
				.lean();
			return review;
		} catch (error) {
			throw new HttpException(500, error?.message);
		}
	}

	// reviews a user has given
	public async getAllReviewsFromUser(userId: UserId): Promise<Review[]> {
		try {
			if (isEmpty(userId)) throw new HttpException(400, "UserId is required!");
			const review = await this.review
				.find({ reviewer: userId })
				.populate("reviewer", "-password")
				.populate("reviewed", "-password")
				.lean();
			return review;
		} catch (error) {
			throw new HttpException(500, error?.message);
		}
	}

	public async addReview(payload: Partial<Review>): Promise<Review> {
		try {
			if(isEmpty(payload)) throw new HttpException(400, "Request payload is empty")
			const review = await this.review.create(payload)
			return review;
		} catch (error) {
			throw new HttpException(500, error?.message);
		}
	}
}

export default ReviewService;
