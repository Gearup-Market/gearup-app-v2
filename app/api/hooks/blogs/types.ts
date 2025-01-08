import { AxiosError } from "axios";

export interface IGetArticle {
	_id: string;
	title: string;
	publishedDate: string;
	status: "available" | "unavailable";
	readMinutes: number;
	slug: string;
	category: IUpdateCategoryReq;
	content: {
		text: string;
		attachments: string[];
	};
	bannerImage: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

export interface IGetArticleResp {
	data: IGetArticle[];
	message: string;
}

export type IGetErr = AxiosError<{ status: string }>;

export interface IPostBlogReq {
	title?: string;
	status?: string;
	readMinutes?: number;
	category?: string | number;
	content?: {
		text?: string;
		attachments?: string[];
	};
	user: string;
	bannerImage?: string;
}
export interface IUpdateBlogReq {
	title?: string;
	status?: string;
	readMinutes?: number;
	category?: string;
	content?: {
		text?: string;
		attachments?: string[];
	};
	user: string;
	bannerImage?: string;
	_id: string;
}

export interface ICreateArticleResp {
	_id: string;
	title: string;
	publishedDate: string;
	status: "available" | "unavailable";
	readMinutes: number;
	category: IUpdateCategoryReq;
	content: {
		text?: string;
		attachments?: string[];
	};
	bannerImage: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

export interface CategoryData {
	_id: string;
	name: string;
	tag: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

export interface IGetCategoriesResp {
	data: CategoryData[];
}

export interface ICreateCategoryResp {
	data: CategoryData;
}

export interface ICreateCategoryReq {
	name: string;
	tag: string;
}

export interface IUpdateCategoryReq {
	_id: string;
	id?: string;
	name: string;
	tag: string;
}
