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
import { api } from "@/app/api";
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
	resendOTP: async (email: string) => false,
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
			setUser(mockUser);
			removeAuthToken();
			delete api.defaults.headers.Authorization;
		}
	}, []);

	const { isFetching: loading, data: userData } = useGetUser({
		token: token,
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
	};


	const values = useMemo(
		() => ({
			isAuthenticated: user !== null && isTokenValid,
			isOtpVerified: user !== null && isTokenValid,
			user,
			setUser,
			loading,
			signup,
			logout,
			resendOTP,
		}),
		[user, loading, userData]
	);

	return <AuthContext.Provider value={values}>{params.children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export const ProtectRoute = (props: ProtectRouteProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const { isAuthenticated, isOtpVerified, loading, user } = useAuth();


	useEffect(() => {
		// ignore initial default provider context value
		if (isEqual(user, {}) || user === null) {
			return;
		}

		if (!isAuthenticated && !isOtpVerified) {
			delete api.defaults.headers.Authorization;
			localStorage.removeItem("user_token");
			router.replace(`/login?returnUrl=${pathname}`);
		} else if (isAuthenticated && isOtpVerified) {
			router.replace("/user/dashboard");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	if (loading) {
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "400px",

				}}
			>
				<CircularProgress color="info" />
			</Box>
		);
	} else {
		return <>{props.children}</>;
	}
};
