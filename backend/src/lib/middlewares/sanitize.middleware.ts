import { sanitize } from "@/shared/utils";
import { NextFunction, Request, Response } from "express";

const excludeFields = ['password', 'token', "name"]
export default function sanitizeMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.body) {
    req.body = sanitize(req.body, excludeFields);
  }
  if (req.params) {
    req.params = sanitize(req.params, excludeFields);
  }
  if (req.query) {
    req.query = sanitize(req.query, excludeFields);
  }
  next();
}
