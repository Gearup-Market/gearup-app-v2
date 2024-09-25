import { generateToken, isTokenExpired, sanitize } from "@/shared/utils";
import { OtpType, User, UserId } from "../types";
import { HttpException } from "@/core/exceptions/HttpException";
import userModel from "../models/users";
import { isEmpty } from "@/core/utils/isEmpty";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendVerificationEmail } from "@/core/utils/email";
import { SECRET_KEY } from "@/core/config";
import otpModel from "../models/otp";
import WalletService from "@/modules/wallet/services/wallet.service";
import StellarWalletService from "@/modules/stellar-wallet/service";

class AuthService {
	private user = userModel;
	private otp = otpModel;
	private walletService = new WalletService()
	private stellarWallet = new StellarWalletService()

	public async sendOtp(userId: UserId, receiver: string, otpType: OtpType) {
		try {
			const { token: code, expiry: expiresAt } = generateToken();
			const otpExistModel = await this.otp.findOne({
				userId,
				otpType,
			});
			const otpExist = otpExistModel?.toJSON() || null;
			if (otpExist) {
				// update otp
				otpExistModel.code = code;
				otpExistModel.expiresAt = expiresAt;
				otpExistModel.updatedAt = new Date();
				if (receiver) otpExistModel.generatedFor = receiver;
				await otpExistModel.save();
			} else {
				await this.otp.create({
					userId,
					code,
					expiresAt,
					otpType: OtpType.VerifyPhoneNumber,
					generatedFor: receiver,
				});
			}

			console.log("\n\token generated", code);
			try {
				sendVerificationEmail(receiver, code, otpType);
			} catch (error) {
				console.log(error)
			}
		} catch (error) {
			throw new HttpException(500, error?.message);
		}
	}

	public async deleteOtp(code: string) {
		try {
			const otpExistModel = await this.otp.findOne({ code });
			const otpExist = otpExistModel.toJSON();
			if (otpExist) otpExistModel.delete();
		} catch (error) {
			throw new HttpException(500, error?.message);
		}
	}

	public async createUser(
		userName: string,
		email: string,
		password: string
	): Promise<User> {
		try {
			if (isEmpty(userName) || isEmpty(email) || isEmpty(password)) {
				throw new HttpException(400, "All fields are required");
			}
			const sanitizedEmail = sanitize(email);

			const existingUser = await this.user.findOne({ email: sanitizedEmail }).lean();
			if (existingUser) {
				throw new HttpException(409, `User with email ${email} already exists`);
			}
			const hashedPassword = await bcrypt.hash(password, 10);

			const userId = new Types.ObjectId().toString();
			const newUser = await this.user.create({
				_id: userId,
				userId,
				userName,
				email: sanitizedEmail,
				password: hashedPassword,
				isVerified: false,
			});

			this.sendOtp(userId, sanitizedEmail, OtpType.VerifyAccount);
			this.walletService.createWallet(userId);
			this.stellarWallet.createAndSaveWallet(userId, hashedPassword);
			return newUser;
		} catch (error) {
			throw new HttpException(500, error?.message);
		}
	}

	public async loginUser(
		email: string,
		password: string
	): Promise<{ token: string; user: User }> {
		try {
			if (isEmpty(email) || isEmpty(password)) {
				throw new HttpException(400, "Email and password are required");
			}
			const sanitizedEmail = sanitize(email);

			const user = await this.user.findOne({ email: sanitizedEmail }).lean();
			if (!user) {
				throw new HttpException(401, "Invalid email or password");
			}

			const isPasswordValid = await bcrypt.compare(password, user.password);
			if (!isPasswordValid) {
				throw new HttpException(401, "Invalid email or password");
			}

			// if (!user.isVerified) {
			// 	this.sendOtp(user.userId, user.email, OtpType.VerifyAccount);
			//     throw new HttpException(403, 'Please verify your email before logging in');
			// }

			const token = jwt.sign({ userId: user.userId }, SECRET_KEY, {
				expiresIn: "3d",
			});

			return { token, user };
		} catch (error) {
			throw new HttpException(500, error?.message);
		}
	}

	public async verifyUser(token: string): Promise<User> {
		try {
			if (isEmpty(token)) {
				throw new HttpException(400, "Verification token is required");
			}

			const otp = await this.otp.findOne({ code: token }).lean();
			if (!otp || !otp.userId) {
				throw new HttpException(400, "Invalid verification token");
			}

			if (isTokenExpired(otp.expiresAt)) {
				throw new HttpException(400, "Token has expired");
			}
			const user = await this.user.findOne({ userId: otp.userId });
			user.isVerified = true;
			await user.save();

			// Remove the token after verification
			this.deleteOtp(token);

			return {
				...user,
				isVerified: true,
			};
		} catch (error) {
			throw new HttpException(500, error?.message);
		}
	}

	public async sendResetPasswordEmail(email: string): Promise<void> {
		try {
			if (isEmpty(email)) {
				throw new HttpException(400, "Email is required");
			}

			const sanitizedEmail = sanitize(email);

			const user = await this.user.findOne({ email: sanitizedEmail }).lean().exec();
			if (!user) {
				throw new HttpException(404, `User with email ${email} does not exist`);
			}

			this.sendOtp(user.userId, sanitizedEmail, OtpType.ResetPassword);
		} catch (error) {
			throw new HttpException(500, error?.message);
		}
	}

	public async verifyResetToken(email: string, token: string): Promise<void> {
		try {
			if (isEmpty(email) || isEmpty(token)) {
				throw new HttpException(400, "Email and token are required");
			}
			const sanitizedEmail = sanitize(email);
			const userModel = await this.user.findOne({ email: sanitizedEmail });
            const user = userModel.toJSON(); 
			if (!user) {
				throw new HttpException(404, `User with email ${email} does not exist`);
			}

            const otp = await this.otp.findOne({generatedFor: sanitizedEmail}).lean().exec();

			if (otp.code !== token) {
				throw new HttpException(400, "Invalid token");
			}

			if (isTokenExpired(otp.expiresAt)) {
				throw new HttpException(400, "Token has expired");
			}
		} catch (error) {
			throw new HttpException(500, error.message);
		}
	}

	public async getUserByToken(token: string): Promise<Partial<User>> {
		try {
			const decoded = jwt.verify(token, SECRET_KEY) as { userId: string };
			const user = await this.user.findOne({ userId: decoded.userId }).lean();

			if (!user) {
				throw new HttpException(404, "User not found");
			}

			const userResponse = user as Partial<User>;
			delete userResponse.password;

			return userResponse;
		} catch (error) {
			throw new HttpException(401, "Invalid or expired token");
		}
	}
	public async resetPassword(
		email: string,
		token: string,
		newPassword: string
	): Promise<void> {
		try {
			if (isEmpty(email) || isEmpty(token)) {
				throw new HttpException(400, "Email and token are required");
			}
			const sanitizedEmail = sanitize(email);
			const userModel = await this.user.findOne({ email: sanitizedEmail });
            const user = userModel.toJSON(); 
			if (!user) {
				throw new HttpException(404, `User with email ${email} does not exist`);
			}

            const otp = await this.otp.findOne({generatedFor: sanitizedEmail}).lean().exec();

			if (otp.code !== token) {
				throw new HttpException(400, "Invalid token");
			}

			if (isTokenExpired(otp.expiresAt)) {
				throw new HttpException(400, "Token has expired");
			}

			userModel.password = await bcrypt.hash(newPassword, 10);
			await userModel.save();

            this.deleteOtp(token);
		} catch (error) {
			throw new HttpException(500, error?.message);
		}
	}
}

export default AuthService;
