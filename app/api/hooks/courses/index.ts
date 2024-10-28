import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { IGetCoursesResp, IGetErr } from "./types";
import { API_URL } from "../../url";
import { api } from "../../api";



export const useGetAllCourses = (
    options?: UseQueryOptions<IGetCoursesResp, IGetErr>
) =>
    useQuery<IGetCoursesResp, IGetErr>({
        queryKey: ["getAllCourses"],
        queryFn: async () => (await api.get(`${API_URL.courses}`)),
        ...options,
        refetchOnMount: true
    });

/////////////////////////////////////////////////////////////////////////////////

export const usePostCreateCourse = (
    options?: Omit<
        UseMutationOptions<IGetCoursesResp, IGetErr, any>,
        "mutationFn"
    >
) =>
    useMutation<IGetCoursesResp, IGetErr, any>({
        mutationFn: async props => (await api.post(`${API_URL.courses}`, props)).data,
        ...options
    });

    /////////////////////////////////////////////////////////////////////////////////

export const usePostUpdateCourse = (
    options?: Omit<
        UseMutationOptions<IGetCoursesResp, IGetErr, any>,
        "mutationFn"
    >
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
    options?: UseQueryOptions<IGetCoursesResp, IGetErr>
) =>
    useQuery<IGetCoursesResp, IGetErr>({
        queryKey: ["coursesById", courseId],
        queryFn: async () => (await api.get(`${API_URL.courses}/${courseId}`)).data,
        ...options,
        enabled: !!courseId,
        refetchOnMount: true
    });

    ///////////////////////////////////////////////////////////////////////////////////

export const useDeleteCourse = (
    options?: Omit<
        UseMutationOptions<IGetCoursesResp, IGetErr, any>,
        "mutationFn"
    >
) =>
    useMutation<IGetCoursesResp, IGetErr, any>({
        mutationFn: async props => {
            const { courseId } = props;
            delete props.courseId;
            return (await api.delete(`${API_URL.courses}/${courseId}`, props)).data;
        },
        ...options
    });