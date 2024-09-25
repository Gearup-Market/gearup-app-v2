import { isTokenExpired, sanitize } from "@/shared/utils";
import { HttpException } from "@/core/exceptions/HttpException";
import { isEmpty } from "@/core/utils/isEmpty";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { SECRET_KEY } from "@/core/config";
import WalletService from "@/modules/wallet/services/wallet.service";
import StellarWalletService from "@/modules/stellar-wallet/service";
import { Admin } from "../types";
import adminModel from "../models/admin";

class AuthService {
	private admin = adminModel;
	private walletService = new WalletService()
	private stellarWallet = new StellarWalletService()

	public async createUser(
		userName: string,
		password: string,
		role: string
	): Promise<Admin> {
		try {
			if (isEmpty(userName) || isEmpty(password)) {
				throw new HttpException(400, "All fields are required");
			}
			const sanitizedUsername = sanitize(userName);

			const existingUser = await this.admin.findOne({ userName: sanitizedUsername }).lean();
			if (existingUser) {
				throw new HttpException(409, `Admin with username ${userName} already exists`);
			}
			const hashedPassword = await bcrypt.hash(password, 10);

			const userId = new Types.ObjectId().toString();
			const newUser = await this.admin.create({
				_id: userId,
				userId,
				userName: sanitizedUsername,
				password: hashedPassword,
				role,
			});

			this.walletService.createWallet(userId);
			this.stellarWallet.createWallet(userId, hashedPassword);
			return newUser;
		} catch (error) {
			throw new HttpException(500, error?.message);
		}
	}

	public async loginUser(
		userName: string,
		password: string
	): Promise<{ token: string; user: Admin }> {
		try {
			if (isEmpty(userName) || isEmpty(password)) {
				throw new HttpException(400, "userName and password are required");
			}
			const sanitizedUsername = sanitize(userName);

			const user = await this.admin.findOne({ userName: sanitizedUsername }).lean();
			if (!user) {
				throw new HttpException(401, "Invalid email or password");
			}

			const isPasswordValid = await bcrypt.compare(password, user.password);
			if (!isPasswordValid) {
				throw new HttpException(401, "Invalid email or password");
			}

			const token = jwt.sign({ userId: user.userId }, SECRET_KEY, {
				expiresIn: "3d",
			});

			return { token, user };
		} catch (error) {
			throw new HttpException(500, error?.message);
		}
	}

	public async getUserByToken(token: string): Promise<Admin> {
		try {
			const decoded = jwt.verify(token, SECRET_KEY) as { userId: string };
			const user = await this.admin.findOne({ userId: decoded.userId }).lean();

			if (!user) {
				throw new HttpException(404, "User not found");
			}

			const userResponse = user;
			delete userResponse.password;

			return userResponse;
		} catch (error) {
			throw new HttpException(401, "Invalid or expired token");
		}
	}
}

export default AuthService;
