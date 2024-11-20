"use client";
import { Box, CircularProgress } from "@mui/material";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { createContext, useState, useEffect, useContext, useMemo } from "react";
import { AuthProviderProps, ProtectRouteProps } from "./types";
import { getAuthToken, removeAuthToken } from "@/utils/tokenStorage";
import { DefaultProviderType, UserType } from "@/interfaces/authcontext";
import { useGetUser, useGetVerifyToken } from "@/app/api/hooks/users";
import { api, queryClient } from "@/app/api";
import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import { clearUser, updateUser } from "@/store/slices/userSlice";
import useCart from "@/hooks/useCart";
import { CircularProgressLoader } from "@/shared/loaders";

// ** Defaults
export const defaultAuthProvider: DefaultProviderType = {
	isAuthenticated: false,
	isOtpVerified: false,
	user: null,
	loading: false,
	logout: async () => {},
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

	// const [token, setToken] = useState("");
	const [isTokenValid, setIsTokenValid] = useState(false);
	const { isFetching: loading, data: userData } = useGetUser({
		userId: user._id || ""
	});
	const { data } = useGetVerifyToken({ token: user.token || "" });
	const { syncCartItems } = useCart();

	const verifyUser = async () => {
		console.log("user", user);
		// const response = await useGetVerifyToken({ token: user.token || "" });
		console.log("data", data);
		setIsTokenValid(true);
	};

	useEffect(() => {
		verifyUser();
	}, [pathname]);

	const logout = async () => {
		// setToken("");
		removeAuthToken();
		dispatch(clearUser());
		router.replace(`/login?returnUrl=${pathname}`);
		queryClient.clear();
	};

	useEffect(() => {
		if (userData) {
			updateUser(userData.data);
		}
	}, [userData]);

	useEffect(() => {
		if (user?.userId) {
			syncCartItems();
		}
	}, [user?.userId]);

	const values = useMemo(
		() => ({
			// isAuthenticated: user !== null && isTokenValid,
			// isOtpVerified: user !== null && isTokenValid,
			isAuthenticated: true,
			isOtpVerified: true,
			user,
			loading,
			logout,
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
	const searchParams = useSearchParams();
	const router = useRouter();
	const returnUrl = searchParams.get("returnUrl") ?? "/user/dashboard";

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

	if (loading) {
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "400px"
				}}
			>
				<CircularProgressLoader color="#ffb30f" size={40} />
			</Box>
		);
	}

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
