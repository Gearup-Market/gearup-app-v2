"use client";

import { useFetch } from "@/hooks";
import useFetchAll from "@/hooks/useFetchAll";
import { ListingType } from "@/interfaces";
<<<<<<< HEAD
import { useAppDispatch } from "@/store/configureStore";
import { setListings } from "@/store/slices/listingsSlice";
=======
>>>>>>> ef3643d0d0927c1731578b17d8df37e087c513fe
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
<<<<<<< HEAD
	// const [listings, setListings] = useState<any[]>([]);
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
=======
	const [listings, setListings] = useState<any[]>([]);
	const [singleListing, setSingleListing] = useState<any>(null);
	const [listingType, setListingType] = useState<ListingType>(ListingType.Rent);
	const [isMobile, setIsMobile] = useState<boolean>(true);
	const { data }: any = useFetch(`/api`);
	useEffect(() => {
		if (!data) return;
		setListings(data);
	}, [data]);
>>>>>>> ef3643d0d0927c1731578b17d8df37e087c513fe
	useLayoutEffect(() => {
		if (window.innerWidth > 450) {
			setIsMobile(false);
		} else {
			setIsMobile(true);
		}
	}, []);
	// function GlobalHooks() {
	// 	useFetchAll();
	// 	return null;
	// }

	return (
		<AppContext.Provider
			value={{
				heroHeight,
				setHeroHeight,
<<<<<<< HEAD
				// listings,
				// setListings,
=======
				listings,
				setListings,
>>>>>>> ef3643d0d0927c1731578b17d8df37e087c513fe
				listingType,
				setListingType,
				isMobile,
				singleListing,
				setSingleListing,
<<<<<<< HEAD
				isLoggedIn,
				setIsLoggedIn,
=======
>>>>>>> ef3643d0d0927c1731578b17d8df37e087c513fe
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
