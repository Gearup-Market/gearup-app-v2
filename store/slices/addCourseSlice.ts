import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/interfaces/User";
export interface Course {
	_id?: string;
	author?: string | User;
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
	// liveTutorials?: {
	// 	startDate: Date;
	// 	endDate: Date;
	// };
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

export interface DateRange {
	startDate: Date;
	endDate: Date;
}

export interface LiveSessionDetails {
	timeZone: string;
	sessionCapacity: number;
	sessions: LiveSession[];
	dateRange: DateRange;
}

export interface RecurrencePattern {
	type: FrequencyType;
	daysOfWeek?: number[]; // 0=Sunday, 1=Monday, ..., 6=Saturday
	monthlyOption?: MonthlyOptionType;
}

// Session interface
export interface LiveSession {
	startTime: string; // In 24-hour format (e.g., "10:00", "18:30")
	durationMinutes: number;
	frequency: FrequencyType;
	recurrencePattern: RecurrencePattern;
	meetingLink?: string; // Optional if different from course link
}

export type CourseType = "ebook" | "live-tutorial" | "video-tutorial" | "audio-tutorial";

// Define frequency types for recurring sessions
export type FrequencyType = "daily" | "weekly" | "twice-weekly" | "monthly";

// Define monthly recurrence pattern options
export type MonthlyOptionType = "same-date" | "same-day-of-week" | null;

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
	// liveTutorials: undefined,
	ebooks: undefined,
	videoTutorials: undefined,
	audioTutorials: undefined,
	liveSessionDetails: undefined
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
