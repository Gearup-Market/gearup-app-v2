import { useMemo } from "react";
import { combineReducers, configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE,
	createMigrate,
} from "redux-persist";
import { updateStoreVersion } from "./global";
import userSlice from "./slices/userSlice";
import addListingSlice from "./slices/addListingSlice";
import listingsSlice from "./slices/listingsSlice";

const PERSISTED_KEYS: string[] = ["user", "newListing"];

const migrations = {
	0: (state: any) => ({
		...state,
	}),
};

const persistConfig = {
	key: "primary",
	whitelist: PERSISTED_KEYS,
	blacklist: ["profile"],
	storage, // <-- Use the correct storage for the web
	version: 0,
	migrate: createMigrate(migrations, { debug: false }),
};

const rootReducer = combineReducers({
	user: userSlice,
	newListing: addListingSlice,
	listings: listingsSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store: ReturnType<typeof makeStore>

export function makeStore(preloadedState = undefined) {
	return configureStore({
		reducer: persistedReducer,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware({
				thunk: true,
				serializableCheck: {
					ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
				},
			}),
		devTools: process.env.NODE_ENV === "development",
		preloadedState,
	});
}

export const initializeStore = (preloadedState: any = undefined) => {
	let _store = store ?? makeStore(preloadedState);

	if (preloadedState && store) {
		_store = makeStore({
			...store.getState(),
			...preloadedState,
		});
	
	}

	if (typeof window === "undefined") return _store;
	if (!store) store = _store;

	return _store;
};

store = initializeStore();

export type AppDispatch = ThunkDispatch<ReturnType<typeof persistedReducer>, any, any>;
export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const persistor = persistStore(store, undefined, () => {
	store?.dispatch(updateStoreVersion());
});

export function useStore(initialState: any) {
	return useMemo(() => initializeStore(initialState), [initialState]);
}

export default store;
