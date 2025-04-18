import { User } from "@/interfaces/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LiveSessionDetails } from "./addCourseSlice";

export interface Course {
	_id?: string;
	author: User;
	title: string;
	subtitle: string;
	description: string;
	cover: string;
	courseType: string;
	price: number;
	link: string;
	content: {
		tableOfContent: string;
		whatYouWillLearn: string;
	};
	ebooks?: {
		pages: number;
		size: string;
	};
	videoTutorials?: {
		duration: string;
		size: string;
	};
	audioTutorials?: {
		duration: string;
		size: string;
	};
	liveSessionDetails?: LiveSessionDetails;
}

interface CourseState {
	courses: Course[];
	currentCourse: Course | null;
	owned: Course[];
}

const initialState: CourseState = {
	courses: [],
	currentCourse: null,
	owned: []
};

const coursesSlice = createSlice({
	name: "courses",
	initialState,
	reducers: {
		setCourses: (state, action: PayloadAction<Partial<CourseState>>) => {
			return Object.assign(state, action.payload);
		},
		clearCourses: state => initialState
	}
});

export default coursesSlice.reducer;
export const { setCourses, clearCourses } = coursesSlice.actions;
