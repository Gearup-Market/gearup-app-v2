/* eslint-disable prettier/prettier */
import {
	Category,
} from "../types";
import { HttpException } from "@/core/exceptions/HttpException";
import listingModel from "../models/listing";
import { isEmpty } from "@/core/utils/isEmpty";
import { Types } from "mongoose";
import { sanitize } from "@/shared/utils";
import categoryModel from "../models/category";
import fs from "fs";
import path from "path";

const ID_MAP_FILE_PATH = path.resolve(__dirname, "idMap.json");

interface CategoryWithSubCategories extends Category {
	id: string;
	subCategories: CategoryWithSubCategories[];
}

interface CategoryInput {
	name: string;
	parentId?: string;
	image?: string;
	fields?: {
		name: string;
		fieldType: string;
		values: {
			id: string;
			name: string;
		}[];
	}[];
}

function readIdMapFromFile() {
	try {
		const data = fs.readFileSync(ID_MAP_FILE_PATH, "utf-8");
		const entries = JSON.parse(data);
		const _map = new Map(entries);
		console.log(_map, "map");
		return _map;
	} catch (error) {
		console.error("Error reading idMap from file:", error);
		throw error;
	}
}

class CategoryService {
	private listing = listingModel;
	private category = categoryModel;

	public async createCategory(payload) {
		try {
			if (isEmpty(payload))
				throw new HttpException(400, "Request payload is empty");
			const { name, ...rest } = payload;

			await this.category.create({
				name: sanitize(name),
				...rest,
			});
			return await this.category.find().lean();
		} catch (error) {
			throw new HttpException(500, error.message);
		}
	}

	public async deleteCategories() {
		try {
			await this.category.deleteMany();
		} catch (error) {
			throw new HttpException(500, error.message);
		}
	}

	public async bulkAddCategories(categories: CategoryInput[]) {
		try {
			return await this.category.insertMany(categories);
		} catch (error) {
			throw new HttpException(500, error.message);
		}
	}

	public async bulkUpdateCategoriesWithFields(data: any[]) {
		try {
			const idMap: [number, string][] = JSON.parse(
				fs.readFileSync(ID_MAP_FILE_PATH, "utf-8")
			);
			const _mappedData = new Map(idMap);

			const updates = data
				.map(category => {
					const categoryId = _mappedData.get(+category.id); // Map old ID to new ID
					if (!categoryId) {
						console.error(`No new ID found for old ID ${category.id}`);
						return null;
					}

					return {
						updateOne: {
							filter: { _id: categoryId },
							update: { $set: { fields: category.fields } },
						},
					};
				})
				.filter(update => update !== null); // Remove null entries

			if (updates.length === 0) {
				console.log("No categories to update");
				return;
			}

			// Execute the updates
			return await this.category.bulkWrite(updates);
		} catch (error) {
			console.error("Error updating categories:", error);
			throw error;
		}
	}

	public async bulkAddCategoriesWithSubcategories(categories: any[]) {
		try {
			const idMap = new Map();

			const parentCategories = categories.map(category => {
				const newId = new Types.ObjectId();
				idMap.set(category.id, newId);

				return {
					_id: newId,
					name: category.name,
					parentId: undefined,
					image: category.image,
				};
			});

			await this.category.insertMany(parentCategories);

			const subcategories = categories.flatMap(category => {
				return category.subCategories.map(subCategory => {
					const newId = new Types.ObjectId();
					idMap.set(subCategory.id, newId);

					return {
						_id: newId,
						name: subCategory.name,
						parentId: idMap.get(subCategory.parentId),
						image: category.image,
					};
				});
			});

			// Write the idMap to a file
			fs.writeFileSync(
				ID_MAP_FILE_PATH,
				JSON.stringify(Array.from(idMap.entries()), null, 2)
			);

			return await this.category.insertMany(subcategories);
		} catch (error) {
			throw new HttpException(500, error.message);
		}
	}

	public async getAllCategories() {
		try {
			const categories = await this.category.find().lean();

			const formatCategory = (
				category: Category,
				categories: Category[]
			): CategoryWithSubCategories => {
				const subCategories = categories
					.filter(sub => sub.parentId  === category._id.toString())
					.map(sub => formatCategory(sub, categories));

				return {
					...category,
					id: category._id.toString(),
					subCategories,
					fields: category.fields || [],
				};
			};

			const topLevelCategories = categories.filter(cat => !cat.parentId);

			const formattedCategories = topLevelCategories.map(category =>
				formatCategory(category, categories)
			);

			return formattedCategories;
		} catch (error) {
			throw new HttpException(error?.status || 500, error.message);
		}
	}

	public async getAllCategoriesWithListings() {
		try {
			const categories = await this.category
				.find({ parentId: { $exists: false } })
				.lean();
			const _categories = [];
			for (let category of categories) {
				const listings = await this.getListingsByCategory(category._id);
				_categories.push({
					...category,
					listings,
					itemsCount: listings.length,
				});
			}

			return _categories;
		} catch (error) {
			throw new HttpException(error?.status || 500, error.message);
		}
	}

	public async getListingsByCategory(categoryId: string) {
		try {
			if (!categoryId)
				throw new HttpException(
					400,
					"Category name is missing in request payload"
				);
			const listings = await this.listing
				.find({ category: categoryId })
				.lean()
				.exec();
			return listings;
		} catch (error) {
			throw new HttpException(error?.status || 500, error.message);
		}
	}
}

export default CategoryService;
