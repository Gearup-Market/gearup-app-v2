import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Course {
	_id?: string;
	author?: string;
	title?: string;
	subtitle?: string;
	description?: string;
	cover: string;
	tempPhoto?: File[];
	courseType?: string;
	price?: number;
	link?: string;
	content?: {
		tableOfContent: string;
		whatYouWillLearn: string;
	};
	liveTutorials?: {
		startDate: Date;
		endDate: Date;
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
}

const initialState: Course = {
	author: "",
	title: "",
	subtitle: "",
	description: "",
	cover: "",
	tempPhoto: [],
	courseType: "",
	price: 0,
	link: "",
	content: {
		tableOfContent: "",
		whatYouWillLearn: ""
	},
	liveTutorials: undefined,
	ebooks: undefined,
	videoTutorials: undefined,
	audioTutorials: undefined
};

const addCourseSlice = createSlice({
	name: "newCourse",
	initialState,
	reducers: {
		updateNewCourse: (state, action: PayloadAction<Partial<Course>>) => {
			return Object.assign(state, action.payload);
		},
		clearNewCourse: state => initialState
	}
});

export default addCourseSlice.reducer;
export const { updateNewCourse, clearNewCourse } = addCourseSlice.actions;
