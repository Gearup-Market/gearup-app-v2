import { NextFunction, Request, Response } from "express";
import CategoryService from "../services/category.service";

class CategoryController {
	private categoryService = new CategoryService();

	public async createCategory(req: Request, res: Response, next: NextFunction) {
		try {
			const payload = req.body;
			const category = await this.categoryService.createCategory(payload);
			res.status(201).json({ data: category, message: "success" });
		} catch (error) {
			next(error);
		}
	}

	public async bulkUpdateCategories(req: Request, res: Response, next: NextFunction) {
		try {
			const payload = req.body;
			const category = await this.categoryService.bulkUpdateCategoriesWithFields(
				payload
			);
			res.status(201).json({ data: category, message: "success" });
		} catch (error) {
			next(error);
		}
	}

	public async bulkAddCategories(req: Request, res: Response, next: NextFunction) {
		try {
			const payload = req.body;
			const category = await this.categoryService.bulkAddCategories(payload);
			res.status(201).json({ data: category, message: "success" });
		} catch (error) {
			next(error);
		}
	}

	public async bulkAddCategoriesWithSubcategories(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const payload = req.body;
			const category = await this.categoryService.bulkAddCategoriesWithSubcategories(
				payload
			);
			res.status(201).json({ data: category, message: "success" });
		} catch (error) {
			next(error);
		}
	}

	public async getAllCategories(req: Request, res: Response, next: NextFunction) {
		try {
			const categories = await this.categoryService.getAllCategories();
			res.status(201).json({ data: categories, message: "success" });
		} catch (error) {
			next(error);
		}
	}

	public async deleteCategories(req: Request, res: Response, next: NextFunction) {
		try {
			const categories = await this.categoryService.deleteCategories();
			res.status(201).json({ data: categories, message: "success" });
		} catch (error) {
			next(error);
		}
	}

	public async getAllCategoriesWithListings(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const categories = await this.categoryService.getAllCategoriesWithListings();
			res.status(201).json({ data: categories, message: "success" });
		} catch (error) {
			next(error);
		}
	}
}

export default CategoryController;
