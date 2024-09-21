"use client";
import { ListingType } from "@/interfaces";
import { useAppDispatch } from "@/store/configureStore";
import React, {
	useState,
	useContext,
	createContext,
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
				listingType,
				setListingType,
				isMobile,
				singleListing,
				setSingleListing,
				isLoggedIn,
				setIsLoggedIn,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider };
