import {
	UseMutationOptions,
	UseQueryOptions,
	useMutation,
	useQuery
} from "@tanstack/react-query";
import { IGetCourseResp, IGetCoursesResp, IGetErr } from "./types";
import { API_URL } from "../../url";
import { api } from "../../api";

export const useGetAllCourses = (options?: UseQueryOptions<IGetCoursesResp, IGetErr>) =>
	useQuery<IGetCoursesResp, IGetErr>({
		queryKey: ["getAllCourses"],
		queryFn: async () => await api.get(`${API_URL.courses}`),
		...options,
		refetchOnMount: true
	});

export const getAllCourses = async ({ queryKey }: { queryKey: any }) => {
	const [_, queryParams] = queryKey;
	const buildQueryParams = () => {
		const params = new URLSearchParams();
		params.append("limit", "12");
		params.append("page", queryParams.page.toString());

		if (queryParams.category) params.append("category", queryParams.category);
		return params.toString().replace(/%20/g, " ");
	};
	return (await api.get(`${API_URL.courses}?${buildQueryParams()}`)).data;
};

/////////////////////////////////////////////////////////////////////////////////

export const usePostCreateCourse = (
	options?: Omit<UseMutationOptions<IGetCoursesResp, IGetErr, any>, "mutationFn">
) =>
	useMutation<IGetCoursesResp, IGetErr, any>({
		mutationFn: async props => (await api.post(`${API_URL.courses}`, props)).data,
		...options
	});

/////////////////////////////////////////////////////////////////////////////////

export const usePostUpdateCourse = (
	options?: Omit<UseMutationOptions<IGetCoursesResp, IGetErr, any>, "mutationFn">
) =>
	useMutation<IGetCoursesResp, IGetErr, any>({
		mutationFn: async props => {
			const { courseId } = props;
			delete props.courseId;
			return (await api.put(`${API_URL.courses}/${courseId}`, props)).data;
		},
		...options
	});

/////////////////////////////////////////////////////////////////////////////////

export const useGetCourseById = (
	courseId?: string,
	options?: UseQueryOptions<IGetCourseResp, IGetErr>
) =>
	useQuery<IGetCourseResp, IGetErr>({
		queryKey: ["coursesById", courseId],
		queryFn: async () => (await api.get(`${API_URL.courses}/${courseId}`)).data,
		...options,
		enabled: !!courseId,
		refetchOnMount: true
	});

export const getCoursesByUser = async ({ queryKey }: { queryKey: any }) => {
	const [_, queryParams] = queryKey;
	if (!queryParams.userId) return;

	const buildQueryParams = () => {
		const params = new URLSearchParams();
		params.append("page", queryParams.page.toString());

		if (queryParams.category) params.append("category", queryParams.category);

		return params.toString().replace(/%20/g, " ");
	};
	return (
		await api.get(
			`${API_URL.courses}/byUser/${queryParams.userId}?${buildQueryParams()}`
		)
	).data;
};

///////////////////////////////////////////////////////////////////////////////////

export const useDeleteCourse = (
	options?: Omit<UseMutationOptions<IGetCoursesResp, IGetErr, any>, "mutationFn">
) =>
	useMutation<IGetCoursesResp, IGetErr, any>({
		mutationFn: async props => {
			const { courseId } = props;
			delete props.courseId;
			return (await api.delete(`${API_URL.courses}/${courseId}`, props)).data;
		},
		...options
	});
