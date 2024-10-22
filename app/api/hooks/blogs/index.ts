import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { ICreateArticleResp, ICreateCategoryReq, ICreateCategoryResp, IGetArticle, IGetArticleResp, IGetCategoriesResp, IGetErr, IPostBlogReq } from "./types";
import { API_URL } from "../../url";
import { api } from "../../api";

export const useGetAllArticles = (
    options?: UseQueryOptions<IGetArticleResp, IGetErr>
) =>
    useQuery<IGetArticleResp, IGetErr>({
        queryKey: ["getAllAdminBlogs"],
        queryFn: async () => (await api.get(`${API_URL.adminBlogsArticles}/`)),
        ...options,
        refetchOnMount: true
    });

export const useGetArticleById = (
    articleId?: string,
    options?: UseQueryOptions<IGetArticle, IGetErr>
) =>
    useQuery<IGetArticle, IGetErr>({
        queryKey: ["getArticleById", articleId],
        queryFn: async () => (await api.get(`${API_URL.adminBlogsArticles}/${articleId}`)).data,
        ...options,
        enabled: !!articleId,
        refetchOnMount: true
    });


export const usePostUpdateBlogStatus = (
    options?: Omit<
        UseMutationOptions<IGetArticle, IGetErr, any>,
        "mutationFn"
    >
) =>
    useMutation<IGetArticle, IGetErr, any>({
        mutationFn: async props => {
            const { blogId } = props;
            delete props.blogId;
            return (await api.patch(`${API_URL.adminBlogsArticles}/${blogId}/status`, props)).data;
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
        mutationFn: async props => (await api.post(`${API_URL.adminBlogsArticles}/create`, props)).data,
        ...options
    });

export const useDeleteBlogById = (
    options?: Omit<
        UseMutationOptions<IGetArticle, IGetErr, any>,
        "mutationFn"
    >
) =>
    useMutation<IGetArticle, IGetErr, any>({
        mutationFn: async props => {
            const { blogId } = props;
            return (await api.delete(`${API_URL.adminBlogsArticles}/${blogId}`)).data;
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
        mutationFn: async props => (await api.post(`${API_URL.createBlogCategory}`, props)).data,
        ...options
    });