import { AxiosError } from "axios";

export interface IGetCoursesResp{
    data: {
        courses: {
            _id: string;
            name: string;
            description: string;
            price: number;
            duration: string;
            createdAt: string;
            updatedAt: string;
            __v: number;
        }[];
    };
    message: string;
}

export type IGetErr = AxiosError<{
	error: string;
}>;