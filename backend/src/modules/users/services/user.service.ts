import {
	generateOtpToken,
	generateToken,
	isTokenExpired,
	sanitize,
} from "@/shared/utils";
import { Kyc, OtpType, User, UserId } from "../types";
import { HttpException } from "@/core/exceptions/HttpException";
import userModel from "../models/users";
import { isEmpty } from "@/core/utils/isEmpty";
import { MissingResourceError } from "@/core/exceptions";
import { Types } from "mongoose";
import kycModel from "../models/kyc";
import otpModel from "../models/otp";
import { BankAccount } from "@/modules/wallet/types";

class UserService {
	private user = userModel;
	private kyc = kycModel;
	private otp = otpModel;

	public async findUser(userId: UserId): Promise<User> {
		try {
			if (isEmpty(userId)) throw new HttpException(400, "UserId is required!");
			const user = await this.user.findOne({ userId }).lean();
			if (!user)
				throw new MissingResourceError(
					`Missing Resource Error: ${userId} does not exist`
				);
			return user;
		} catch (error) {
			throw new HttpException(500, error?.message);
		}
	}

	public async findUsers(): Promise<User[]> {
		try {
			const users = await this.user.find().lean();
			return users;
		} catch (error) {
			throw new HttpException(500, error?.message);
		}
	}

	public async deleteOtp(code: string) {
		try {
			const otpExistModel = await this.otp.findOne({ code });
			const otpExist = otpExistModel?.toJSON();
			if (otpExist) otpExistModel.delete();
		} catch (error) {
			throw new HttpException(500, error?.message);
		}
	}

	public async sendOtp(userId: UserId, phoneNumber?: string) {
		try {
			const { code, expiresAt } = generateOtpToken();
			const otpExistModel = await this.otp.findOne({
				userId,
				otpType: OtpType.VerifyPhoneNumber,
			});
			const otpExist = otpExistModel?.toJSON();
			if (otpExist) {
				// update otp
				otpExistModel.code = code;
				otpExistModel.expiresAt = expiresAt;
				otpExistModel.updatedAt = new Date();
				if (phoneNumber) otpExistModel.generatedFor = phoneNumber;
				await otpExistModel.save();
			} else {
				await this.otp.create({
					userId,
					code,
					expiresAt,
					otpType: OtpType.VerifyPhoneNumber,
					generatedFor: phoneNumber,
				});
			}

			console.log("\n\nsms otp", code);

			// send otp to phone number using sms gateway
		} catch (error) {
			throw new HttpException(500, error?.message);
		}
	}

	public async registerKyc(payload: Kyc) {
		try {
			if (isEmpty(payload))
				throw new HttpException(
					400,
					"Request payload is empty: All fields are required"
				);
			if (isEmpty(payload.userId))
				throw new HttpException(400, "Please provide the userId argument");

			const kycExistModel = await this.kyc.findOne({ userId: payload.userId });
			const kycExist = kycExistModel?.toJSON();
			let data: Kyc;
			if (kycExist) {
				if (kycExist.isSubmitted)
					throw new HttpException(
						409,
						"KYC application has already been submitted. Please wait for approval process to be concluded"
					);
				await kycExistModel.update(payload);
				data = { ...kycExist, ...payload };
			} else {
				data = await this.kyc.create(payload);
			}

			if (payload.phoneNumber) this.sendOtp(payload.userId, payload.phoneNumber);

			if (payload.firstName) {
				this.user.updateOne(
					{ userId: payload.userId },
					{
						firstName: payload.firstName || "",
						lastName: payload.lastName || "",
						phoneNumber: payload.phoneNumber || "",
						address: payload.address || "",
					}
				);

				data.address = `${payload.address}, ${payload.city}, ${payload.country}`;
			} else if (payload.phoneNumber) {
				this.user.updateOne(
					{ userId: payload.userId },
					{
						phoneNumber: payload.phoneNumber || "",
					}
				);
			}
			return data;
		} catch (error) {
			throw new HttpException(500, error?.message);
		}
	}

	public async validatePhoneNumberForKyc(code: string, userId: UserId) {
		try {
			const [otpExist, kycExistModel] = await Promise.all([
				this.otp.findOne({ code }),
				this.kyc.findOne({ userId }),
			]);
			const kycExist = kycExistModel?.toJSON();
			if (!kycExist)
				throw new HttpException(
					400,
					"Kyc records not found. have you submitted your kyc application?"
				);
			if (!otpExist || otpExist.userId !== userId)
				throw new HttpException(400, "Invalid code");
			if (isTokenExpired(otpExist.expiresAt)) {
				throw new HttpException(400, "Otp has expired");
			}

			kycExistModel.isPhoneNumberVerified = true;
			await kycExistModel.save();

			this.deleteOtp(code);
			return true;
		} catch (error) {
			throw new HttpException(500, error?.message);
		}
	}

	public async saveAccountDetails(payload: BankAccount) {
		try {
			if (isEmpty(payload) || isEmpty(payload.userId))
				throw new HttpException(400, "UserId is required");
			const userModel = await this.user.findOne({ userId: payload.userId });
			const user = userModel.toJSON();
			if (!user) throw new HttpException(400, "No user found for user");

			userModel.accountName = payload.accountName;
			userModel.accountNumber = payload.accountNumber;
			userModel.bankName = payload.bankName;

			await userModel.save();
			return { ...user, ...payload };
		} catch (error) {
			throw new HttpException(500, error.message);
		}
	}

	public async updateUser(payload: User) {
		try {
			if (isEmpty(payload) || isEmpty(payload.userId))
				throw new HttpException(400, "UserId is required");
			const userModel = await this.user.findOne({ userId: payload.userId });
			const user = userModel.toJSON();
			if (!user) throw new HttpException(400, "No user found for user");
			delete payload.userId;
			await userModel.update(payload);
			return { ...user, ...payload };
		} catch (error) {
			throw new HttpException(500, error.message);
		}
	}
}

export default UserService;
