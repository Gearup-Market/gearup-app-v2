export function generateTimeSlots(intervalMinutes: number = 30): string[] {
	const slots: string[] = [];
	for (let hour = 0; hour < 24; hour++) {
		for (let minute = 0; minute < 60; minute += intervalMinutes) {
			const formattedHour = hour.toString().padStart(2, "0");
			const formattedMinute = minute.toString().padStart(2, "0");
			slots.push(`${formattedHour}:${formattedMinute}`);
		}
	}

	return slots;
}

export function generateDurations(
	minDuration: number = 10,
	maxDuration: number = 300,
	increment: number = 10
): Array<{ value: number; label: string }> {
	const durations = [];

	for (let minutes = minDuration; minutes <= maxDuration; minutes += increment) {
		durations.push({
			value: minutes,
			label: formatDurationLabel(minutes)
		});
	}

	return durations;
}

export function formatDurationLabel(minutes: number): string {
	if (minutes < 60) {
		return `${minutes} minute${minutes === 1 ? "" : "s"}`;
	}

	const hours = Math.floor(minutes / 60);
	const remainingMinutes = minutes % 60;

	if (remainingMinutes === 0) {
		return `${hours} hour${hours === 1 ? "" : "s"}`;
	}

	return `${hours} hour${hours === 1 ? "" : "s"} ${remainingMinutes} minute${
		remainingMinutes === 1 ? "" : "s"
	}`;
}

import {
	LiveSessionDetails,
	LiveSession,
	FrequencyType
} from "@/store/slices/addCourseSlice";

import { Dispatch, SetStateAction } from "react";

type SetLiveSessionDetailsType = Dispatch<SetStateAction<LiveSessionDetails>>;

/**
 * Handles changes to select fields in the live session form
 */
export const handleSelectChange = (
	setLiveSessionDetails: SetLiveSessionDetailsType,
	field: "timeZone" | "sessionCapacity" | "startTime" | "duration" | "frequency",
	value: string,
	additionalUpdates: Partial<LiveSessionDetails> = {}
): void => {
	switch (field) {
		// Time Zone select
		case "timeZone":
			setLiveSessionDetails(prev => ({
				...prev,
				timeZone: value
			}));
			break;

		// Session Capacity select
		case "sessionCapacity":
			setLiveSessionDetails(prev => ({
				...prev,
				sessionCapacity: parseInt(value, 10)
			}));
			break;

		// Session-related selects
		case "startTime":
		case "duration":
		case "frequency":
			setLiveSessionDetails(prev => {
				const updatedSessions = [...(prev.sessions || [])];

				// If no sessions exist yet, create one
				if (updatedSessions.length === 0) {
					const newSession: LiveSession = {
						startTime: field === "startTime" ? value : "",
						durationMinutes: field === "duration" ? parseInt(value, 10) : 60,
						frequency:
							field === "frequency"
								? (value.toLowerCase() as FrequencyType)
								: "weekly",
						recurrencePattern: {
							type:
								field === "frequency"
									? (value.toLowerCase() as FrequencyType)
									: "weekly",
							daysOfWeek: []
							// monthlyOption: null
						}
					};
					updatedSessions.push(newSession);
				} else {
					// Update existing session
					switch (field) {
						case "startTime":
							updatedSessions[0] = {
								...updatedSessions[0],
								startTime: value
							};
							break;
						case "duration":
							updatedSessions[0] = {
								...updatedSessions[0],
								durationMinutes: parseInt(value, 10)
							};
							break;
						case "frequency":
							updatedSessions[0] = {
								...updatedSessions[0],
								frequency: value.toLowerCase() as FrequencyType,
								recurrencePattern: {
									...updatedSessions[0].recurrencePattern,
									type: value.toLowerCase() as FrequencyType
								}
							};
							break;
					}
				}

				return {
					...prev,
					sessions: updatedSessions,
					...additionalUpdates
				};
			});
			break;

		default:
			const exhaustiveCheck: never = field;
			console.warn(`Unhandled select field: ${exhaustiveCheck}`);
	}
};

/**
 * Handles toggling of day checkboxes in the session scheduler
 */
export const handleDayToggle = (
	setLiveSessionDetails: SetLiveSessionDetailsType,
	dayValue: number
): void => {
	setLiveSessionDetails(prev => {
		const updatedSessions = [...(prev.sessions || [])];

		if (updatedSessions.length === 0) {
			updatedSessions.push({
				startTime: "",
				durationMinutes: 60,
				frequency: "weekly",
				recurrencePattern: {
					type: "weekly",
					daysOfWeek: [dayValue]
					// monthlyOption: null
				}
			});
		} else {
			const currentDays = [
				...(updatedSessions[0].recurrencePattern.daysOfWeek || [])
			];
			const isSelected = currentDays.includes(dayValue);
			const newDays = isSelected
				? currentDays.filter(d => d !== dayValue)
				: [...currentDays, dayValue];

			updatedSessions[0] = {
				...updatedSessions[0],
				recurrencePattern: {
					...updatedSessions[0].recurrencePattern,
					daysOfWeek: newDays
				}
			};
		}

		return {
			...prev,
			sessions: updatedSessions
		};
	});
};

/**
 * Handles date selection for course date range
 */
export const selectDate = (
	setLiveSessionDetails: SetLiveSessionDetailsType,
	date: Date,
	type: "startDate" | "endDate"
): void => {
	setLiveSessionDetails(prev => ({
		...prev,
		dateRange: {
			...prev.dateRange,
			[type]: date
		}
	}));
};

/**
 * Initializes empty session details state
 */
export const getInitialLiveSessionDetails = (): LiveSessionDetails => ({
	dateRange: {
		startDate: new Date(),
		endDate: new Date()
	},
	timeZone: "",
	sessionCapacity: 0,
	sessions: []
});
