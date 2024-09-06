"use client";
import { Box, CircularProgress } from "@mui/material";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { createContext, useState, useEffect, useContext, useMemo } from "react";
import { AuthProviderProps, ProtectRouteProps } from "./types";
import { isEqual } from "lodash";
import { getAuthToken, removeAuthToken, setAuthToken } from "@/utils/tokenStorage";
import { DefaultProviderType, UserType } from "@/interfaces/authcontext";
import {
	useGetUser,
	usePostResendOTP,
	usePostUserSignIn,
	usePostUserSignUp
} from "@/app/api/hooks/users";
import { api, queryClient } from "@/app/api";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

// ** Defaults
export const defaultAuthProvider: DefaultProviderType = {
	isAuthenticated: false,
	isOtpVerified: false,
	user: null,
	setUser: (user: UserType) => {},
	loading: false,
	signup: async (user: any) => {},
	logout: async () => {},
	resendOTP: async (email: string) => false
};

const AuthContext = createContext(defaultAuthProvider);

const mockUser = {};

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
	const [user, setUser] = useState<UserType | null>(null);

	const [token, setToken] = useState("");
	const [isTokenValid, setIsTokenValid] = useState(false);

	const { mutateAsync: postUserSignUp } = usePostUserSignUp();
	const { mutateAsync: postOTP } = usePostResendOTP();

	useEffect(() => {
		const token = getAuthToken() || "";
		const decodedJwt = parseJwt(token || "");
		const isTokenValid = !!decodedJwt && decodedJwt?.exp * 1000 > Date.now();
		setToken(decodedJwt?.userId);
		setIsTokenValid(isTokenValid);

		if (!isTokenValid) {
			setUser(null);
			removeAuthToken();
			delete api.defaults.headers.Authorization;
		} else {
			api.defaults.headers.Authorization = `Bearer ${token}`;
		}
	}, []);

	const { isFetching: loading, data: userData } = useGetUser({
		token: token
	});

	const signup = async (user: any) => {
		await postUserSignUp(user);
	};

	const resendOTP = async (email: string) => {
		const res = await postOTP({ email });
		return !!res.status;
	};

	const logout = async () => {
		setToken("");
		removeAuthToken();
		setUser(null);
		delete api.defaults.headers.Authorization;
		setTimeout(() => {
			router.replace(`/login?returnUrl=${pathname}`);
		}, 0);
		queryClient.clear();
	};

	useEffect(() => {
		if (userData) {
			setUser(userData.data);
		}
	}, [userData]);

	const values = useMemo(
		() => ({
			isAuthenticated: user !== null && isTokenValid,
			isOtpVerified: user !== null && isTokenValid,
			user,
			setUser,
			loading,
			signup,
			logout,
			resendOTP
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[user, loading, userData, isTokenValid]
	);

	return <AuthContext.Provider value={values}>{params.children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export const ProtectRoute = (props: ProtectRouteProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const { isAuthenticated, loading, user } = useAuth();
	const searchParams = useSearchParams();
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

	useEffect(() => {
		if (user === null) {
			return;
		}
		if (!loading) {
			if (!isAuthenticated && !unprotectedRoutes.includes(pathname)) {
				router.replace(`/login?returnUrl=${pathname}`);
			} else if (isAuthenticated && unprotectedRoutes.includes(pathname)) {
				if (pathname !== "/login") {
					router.replace(returnUrl);
				}
			}
		}
	}, [isAuthenticated, loading, pathname, router, unprotectedRoutes, user]);

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
				<CircularProgress style={{ color: "#FFB30F" }} />
			</Box>
		);
	}

	if (isAuthenticated || unprotectedRoutes.includes(pathname)) {
		return <>{props.children}</>;
	}

	// Return null while redirecting
	return null;
};
