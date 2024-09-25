import { Router } from "express";
import { Routes } from "@/types";
import validationMiddleware from "@/lib/middlewares/validation.middleware";
import { createCategorySchema } from "../validation";
import CategoryController from "../controllers/category.controller";

class CategoryRoute implements Routes {
	public path = "/listings";
	public router = Router();
	public categoryController = new CategoryController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(
			`${this.path}/categories`,
			this.categoryController.getAllCategories.bind(this.categoryController)
		);
		this.router.get(
			`${this.path}/categories/detailed`,
			this.categoryController.getAllCategoriesWithListings.bind(
				this.categoryController
			)
		);
		this.router.post(
			`${this.path}/categories/create`,
			validationMiddleware(createCategorySchema),
			this.categoryController.createCategory.bind(this.categoryController)
		);

		this.router.delete(
			`${this.path}/categories`,
			this.categoryController.deleteCategories.bind(this.categoryController)
		);
		this.router.post(
			`${this.path}/categories/bulk-create`,
			this.categoryController.bulkAddCategories.bind(this.categoryController)
		);

		this.router.post(
			`${this.path}/categories/bulk-create-sub`,
			this.categoryController.bulkAddCategoriesWithSubcategories.bind(
				this.categoryController
			)
		);

		this.router.post(
			`${this.path}/categories/bulk-update`,
			this.categoryController.bulkUpdateCategories.bind(this.categoryController)
		);
	}
}

export default CategoryRoute;
