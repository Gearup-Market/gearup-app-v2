"use client";
import { useFetch } from "@/hooks";
import { ListingType } from "@/interfaces";
import { useAppDispatch } from "@/store/configureStore";
import { setListings } from "@/store/slices/listingsSlice";
import React, {
	useState,
	useContext,
	createContext,
	useEffect,
	useLayoutEffect,
} from "react";

const AppContext = createContext<any>(null);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [heroHeight, setHeroHeight] = useState<number>(0);
	const [singleListing, setSingleListing] = useState<any>(null);
	const [listingType, setListingType] = useState<ListingType>(ListingType.Rent);
	const [isMobile, setIsMobile] = useState<boolean>(true);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const { data }: any = useFetch(`/api`);

	useEffect(() => {
		if (!data) return;
		dispatch(setListings(data));
	}, [data, dispatch]);

	useLayoutEffect(() => {
		if (window.innerWidth > 450) {
			setIsMobile(false);
		} else {
			setIsMobile(true);
		}
		
	}, []);

	return (
		<AppContext.Provider
			value={{
				heroHeight,
				setHeroHeight,
				// listings,
				// setListings,
				listingType,
				setListingType,
				isMobile,
				singleListing,
				setSingleListing,
				isLoggedIn,
				setIsLoggedIn,
			}}
		>
			{/* <GlobalHooks /> */}
			{children}
		</AppContext.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider };
