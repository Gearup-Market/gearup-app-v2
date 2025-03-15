import {
	UseMutationOptions,
	UseQueryOptions,
	useMutation,
	useQuery
} from "@tanstack/react-query";
import {
	ICreateArticleResp,
	ICreateCategoryReq,
	ICreateCategoryResp,
	IGetArticle,
	IGetArticleResp,
	IGetCategoriesResp,
	IGetErr,
	IPostBlogReq,
	IUpdateBlogReq,
	IUpdateCategoryReq
} from "./types";
import { API_URL } from "../../url";
import { api } from "../../api";

export const useGetAllArticles = (options?: UseQueryOptions<IGetArticleResp, IGetErr>) =>
	useQuery<IGetArticleResp, IGetErr>({
		queryKey: ["getAllAdminBlogs"],
		queryFn: async () => await api.get(`${API_URL.adminBlogsArticles}/`),
		...options,
		refetchOnMount: true
	});

export const useGetAllRecommendedArticles = (
	options?: UseQueryOptions<IGetArticleResp, IGetErr>
) =>
	useQuery<IGetArticleResp, IGetErr>({
		queryKey: ["getAllAdminRecommendedBlogs"],
		queryFn: async () =>
			(await api.get(`${API_URL.adminBlogsArticles}/recommend`)).data,
		...options,
		refetchOnMount: true
	});

export const useGetArticleById = (
	articleId?: string,
	options?: UseQueryOptions<IGetArticle, IGetErr>
) => {
	return useQuery<IGetArticle, IGetErr>({
		queryKey: ["getArticleById", articleId],
		queryFn: async () => {
			if (!articleId) throw new Error("Article ID is required");
			return (await api.get(`${API_URL.adminBlogsArticles}/${articleId}`)).data;
		},
		enabled: !!articleId,
		refetchOnMount: true,
		...options
	});
};

export const useGetArticleBySlug = (
	articleSlug?: string,
	options?: UseQueryOptions<IGetArticle, IGetErr>
) => {
	return useQuery<IGetArticle, IGetErr>({
		queryKey: ["getArticleBySlug", articleSlug],
		queryFn: async () => {
			if (!articleSlug) throw new Error("Article Slug is required");
			return (await api.get(`${API_URL.adminBlogsArticles}/slug/${articleSlug}`))
				.data.data;
		},
		enabled: !!articleSlug,
		refetchOnMount: true,
		...options
	});
};

export const usePostUpdateBlogStatus = (
	options?: Omit<UseMutationOptions<IGetArticle, IGetErr, any>, "mutationFn">
) =>
	useMutation<IGetArticle, IGetErr, any>({
		mutationFn: async props => {
			const { blogId } = props;
			delete props.blogId;
			return (
				await api.patch(
					`${API_URL.adminBlogsArticlesById}/${blogId}/status`,
					props
				)
			).data;
		},
		...options
	});

export const usePostCreateBlog = (
	options?: Omit<
		UseMutationOptions<ICreateArticleResp, IGetErr, IPostBlogReq>,
		"mutationFn"
	>
) =>
	useMutation<ICreateArticleResp, IGetErr, IPostBlogReq>({
		mutationFn: async props =>
			(await api.post(`${API_URL.adminBlogsArticles}/create`, props)).data,
		...options
	});

export const usePostUpdateBlog = (
	options?: Omit<
		UseMutationOptions<ICreateArticleResp, IGetErr, IUpdateBlogReq>,
		"mutationFn"
	>
) =>
	useMutation<ICreateArticleResp, IGetErr, IUpdateBlogReq>({
		mutationFn: async props =>
			(
				await api.put(
					`${API_URL.adminBlogsArticlesById}/update/${props._id}`,
					props
				)
			).data,
		...options
	});

export const useDeleteBlogById = (
	options?: Omit<UseMutationOptions<IGetArticle, IGetErr, any>, "mutationFn">
) =>
	useMutation<IGetArticle, IGetErr, any>({
		mutationFn: async props => {
			const { blogId } = props;
			return (await api.delete(`${API_URL.adminBlogsArticlesById}/${blogId}`)).data;
		},
		...options
	});

export const useGetAllCategories = (
	options?: UseQueryOptions<IGetCategoriesResp, IGetErr>
) =>
	useQuery<IGetCategoriesResp, IGetErr>({
		queryKey: ["getAllAdminBlogsCategories"],
		queryFn: async () => (await api.get(`${API_URL.getAllBlogCategories}`)).data,
		...options,
		refetchOnMount: true
	});

export const usePostCreateBlogCategory = (
	options?: Omit<
		UseMutationOptions<ICreateCategoryResp, IGetErr, ICreateCategoryReq>,
		"mutationFn"
	>
) =>
	useMutation<ICreateCategoryResp, IGetErr, ICreateCategoryReq>({
		mutationFn: async props =>
			(await api.post(`${API_URL.createBlogCategory}`, props)).data,
		...options
	});

export const usePostUpdateBlogCategory = (
	options?: Omit<
		UseMutationOptions<ICreateCategoryResp, IGetErr, IUpdateCategoryReq>,
		"mutationFn"
	>
) =>
	useMutation<ICreateCategoryResp, IGetErr, IUpdateCategoryReq>({
		mutationFn: async props => {
			const { id, name, tag } = props;
			return (await api.put(`${API_URL.updateBlogCategory}/${id}`, { name, tag }))
				.data;
		},
		...options
	});
