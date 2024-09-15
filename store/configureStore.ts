import { useMemo } from "react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
	storage: AsyncStorage,
	version: 0,
	migrate: createMigrate(migrations, { debug: false }),
};

const persistedReducer = persistReducer(
	persistConfig,
	combineReducers({
		user: userSlice,
		newListing: addListingSlice,
		listings: listingsSlice,
	})
);

// eslint-disable-next-line import/no-mutable-exports
// let store: ReturnType<typeof makeStore>;

let store: any;

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

	// After navigating to a page with an initial Redux state, merge that state
	// with the current state in the store, and create a new store
	if (preloadedState && store) {
		_store = makeStore({
			...store.getState(),
			...preloadedState,
		});
		// Reset the current store
		store = undefined;
	}

	// For SSG and SSR always create a new store
	if (typeof window === "undefined") return _store;

	// Create the store once in the client
	if (!store) {
		store = _store;
	}

	return _store;
};

store = initializeStore();

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const persistor = persistStore(store, undefined, () => {
	store.dispatch(updateStoreVersion());
});

export function useStore(initialState: any) {
	return useMemo(() => initializeStore(initialState), [initialState]);
}


export default store;
