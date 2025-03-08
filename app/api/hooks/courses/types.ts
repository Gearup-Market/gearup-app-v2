import { Course } from "@/store/slices/coursesSlice";
import { AxiosError } from "axios";

export interface IGetCoursesResp {
	data: Course[];
	message: string;
}

export interface IGetCourseResp {
	data: Course;
	message: string;
}

export type IGetErr = AxiosError<{
	error: string;
}>;
