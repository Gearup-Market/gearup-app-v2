"use client";

import { useGetVerifyToken } from "@/app/api/hooks/users";
import { useGlobalContext } from "@/contexts/AppContext";
import { AppState } from "@/store/configureStore";
import { clearUser } from "@/store/slices/userSlice";
import { usePathname, useRouter } from "next/navigation";
import { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useAuthCheck = () => {
	const dispatch = useDispatch();
	const pathName = usePathname();
	const base_url = process.env.NEXT_PUBLIC_BASE_URL;
	const { token } = useSelector((state: AppState) => state.user);
	// const { setIsLoading } = useGlobalContext();
	const router = useRouter();
	console.log(token);

	useEffect(() => {
		// setIsLoading(true);
		const checkAuth = async () => {
			if (!token) {
				router.push(`/login?returnUrl=${pathName}`);
				return;
			}

			try {
				// const response = await useGetVerifyToken({ token });
				// console.log(response);
				// if (response.ok) {
				// 	const data = await response.json();
				// 	router.push(pathName);
				// } else {
				// 	dispatch(clearUser());
				// 	router.push("/signin");
				// }
			} catch (error) {
				dispatch(clearUser());
				router.push(`/login?returnUrl=${pathName}`);
			}
		};
		checkAuth();
	}, [router, token]);
};
