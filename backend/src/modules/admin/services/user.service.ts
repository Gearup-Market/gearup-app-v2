import {
	generateOtpToken,
	generateToken,
	isTokenExpired,
	sanitize,
} from "@/shared/utils";
import { HttpException } from "@/core/exceptions/HttpException";
import userModel from "../models/admin";
import { isEmpty } from "@/core/utils/isEmpty";
import { MissingResourceError } from "@/core/exceptions";
import { Types } from "mongoose";
import { BankAccount } from "@/modules/wallet/types";
import adminModel from "../models/admin";
import { Admin, UserId } from "../types";

class UserService {
	private admin = adminModel;

	public async findUser(userId: UserId): Promise<Admin> {
		try {
			if (isEmpty(userId)) throw new HttpException(400, "UserId is required!");
			const user = await this.admin.findOne({ userId }).lean();
			if (!user)
				throw new MissingResourceError(
					`Missing Resource Error: ${userId} does not exist`
				);
			return user;
		} catch (error) {
			throw new HttpException(500, error?.message);
		}
	}

	public async findUsers(): Promise<Admin[]> {
		try {
			const users = await this.admin.find().lean();
			return users;
		} catch (error) {
			throw new HttpException(500, error?.message);
		}
	}

	public async updateUser(payload: Admin) {
		try {
			if (isEmpty(payload) || isEmpty(payload.userId))
				throw new HttpException(400, "UserId is required");

			const userModel = await this.admin.findOne({ userId: payload.userId });
			const user = userModel.toJSON();

			if (!user) throw new HttpException(400, "No user found for user");
			delete payload.userId;
			await userModel.update(payload);
			return { ...user, ...payload };
		} catch (error) {
			throw new HttpException(500, error.message);
		}
	}

	public async deleteUser(userId: UserId) {
		try {
			if (isEmpty(userId)) throw new HttpException(400, "UserId is required");

			const userModel = await this.admin.findOne({ userId });
			const user = userModel.toJSON();

			if (!user) throw new HttpException(404, "No admin found with supplied id");
			await userModel.delete();
		} catch (error) {
			throw new HttpException(500, error.message);
		}
	}
}

export default UserService;
