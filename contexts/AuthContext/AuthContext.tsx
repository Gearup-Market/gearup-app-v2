"use client";
import { Box, CircularProgress } from "@mui/material";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { createContext, useState, useEffect, useContext, useMemo } from "react";
import { AuthProviderProps, ProtectRouteProps } from "./types";
import { getAuthToken, removeAuthToken } from "@/utils/tokenStorage";
import { DefaultProviderType, UserType } from "@/interfaces/authcontext";
import { useGetUser } from "@/app/api/hooks/users";
import { api, queryClient } from "@/app/api";
import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import { updateUser } from "@/store/slices/userSlice";

// ** Defaults
export const defaultAuthProvider: DefaultProviderType = {
	isAuthenticated: false,
	isOtpVerified: false,
	user: null,
	loading: false,
	logout: async () => { }
};

const AuthContext = createContext(defaultAuthProvider);

export const parseJwt = (token: string) => {
	try {
		return JSON.parse(atob(token.split(".")[1]));
	} catch (e) {
		return null;
	}
};

export const AuthProvider = (params: AuthProviderProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const user = useAppSelector(state => state.user);
	const dispatch = useAppDispatch();

	const [token, setToken] = useState("");
	const [isTokenValid, setIsTokenValid] = useState(false);
	const { isFetching: loading, data: userData } = useGetUser({
		token: token
	});

	useEffect(() => {
		const token = getAuthToken() ?? "";
		const decodedJwt = parseJwt(token ?? "");
		const isTokenValid = !!decodedJwt && decodedJwt?.exp * 1000 > Date.now();
		setToken(decodedJwt?.userId);
		setIsTokenValid(isTokenValid);
		if (!isTokenValid) {
			dispatch(updateUser(null));
			removeAuthToken();
			delete api.defaults.headers.Authorization;
		} else {
			api.defaults.headers.Authorization = `Bearer ${token}`;
		}
	}, [user]);

	const logout = async () => {
		setToken("");
		removeAuthToken();
		dispatch(updateUser(null));
		delete api.defaults.headers.Authorization;
		setTimeout(() => {
			router.replace(`/login?returnUrl=${pathname}`);
		}, 0);
		queryClient.clear();
	};

	useEffect(() => {
		if (userData) {
			updateUser(userData.data);
		}
	}, [userData]);

	const values = useMemo(
		() => ({
			isAuthenticated: user !== null && isTokenValid,
			isOtpVerified: user !== null && isTokenValid,
			user,
			loading,
			logout
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[user, loading, userData, isTokenValid]
	);

	return <AuthContext.Provider value={values}>{params.children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export const ProtectRoute = (props: ProtectRouteProps) => {
	const pathname = usePathname();
	const { isAuthenticated, loading, user } = useAuth();
	const router = useRouter();

	const unprotectedRoutes = useMemo(
		() => [
			"/login",
			"/signup",
			"/forgot-password",
			"/password-reset",
			"/reset",
			"/verified",
			"/verify"
		],
		[]
	);


	// if (loading) {
	// 	return (
	// 		<Box
	// 			sx={{
	// 				display: "flex",
	// 				justifyContent: "center",
	// 				alignItems: "center",
	// 				height: "400px"
	// 			}}
	// 		>
	// 			<CircularProgress style={{ color: "#FFB30F" }} />
	// 		</Box>
	// 	);
	// }

	if (!isAuthenticated && !unprotectedRoutes.includes(pathname)) {
		router.replace(`/login?returnUrl=${pathname}`);
		return null;
	}

	if (isAuthenticated || unprotectedRoutes.includes(pathname)) {
		return <>{props.children}</>;
	}

	// Return null while redirecting
	return null;
};
