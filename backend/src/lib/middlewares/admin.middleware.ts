/* eslint-disable prettier/prettier */
import { SECRET_KEY } from "@/core/config";
import { AdminRole } from "@/modules/admin/types";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return res
			.status(401)
			.json({ error: "No bearer token provided in Authorization header" });
	}

	const token = authHeader.split(" ")[1];
	try {
		const decoded: any = jwt.verify(token, SECRET_KEY);
		if (Object.values(AdminRole).includes(decoded.role)) {
			(req as any).userId = decoded.userId;
			(req as any).authToken = token;
			(req as any).role = decoded?.role;
			next();
		} else {
			return res
				.status(401)
				.json({ error: "Not authorized too call this endpoint" });
		}
	} catch (error) {
		return res.status(401).json({ error: "Invalid token" });
	}
};

export default adminMiddleware;
