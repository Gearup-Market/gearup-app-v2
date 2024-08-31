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
	usePostUserSignUp,
} from "@/app/api/hooks/users";
import { api } from "@/app/api";
import toast from "react-hot-toast";

// ** Defaults
export const defaultAuthProvider: DefaultProviderType = {
	isAuthenticated: false,
	isOtpVerified: false,
	user: null,
	loading: false,
	signup: async (user: any) => {},
	logout: async () => {},
	resendOTP: async (email: string) => false,
	checkAuth: (rolev1: number, rolev2: object, permission: string) => false,
	hasAuth: (permission: string) => false,
};

const AuthContext = createContext(defaultAuthProvider);

export const PUBLIC_PATHNAME = [
	"/login",
	"/signup",
	"/reset-password-request",
	"/reset-password",
	"/account-verification",
	"/account-verified",
];

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

	const [userRole, setUserRole] = useState<any>(null);
	const [userRoleV2, setUserRoleV2] = useState<any>({});

	const [token, setToken] = useState("");
	const [isTokenValid, setIsTokenValid] = useState(false);
	const searchParams = useSearchParams();
	const returnUrl = searchParams.get("returnUrl") || "/user/dashboard";

	const { mutateAsync: postUserSignUp } = usePostUserSignUp();
	const { mutateAsync: postSignIn } = usePostUserSignIn();
	const { mutateAsync: postOTP } = usePostResendOTP();
	// const { mutateAsync: postUpdateUser } = usePostUpdateUser();

	

	useEffect(() => {
		const token = getAuthToken() || "";
		const decodedJwt = parseJwt(token || "");
		const isTokenValid = !!decodedJwt && decodedJwt?.exp * 1000 > Date.now();

		setToken(token);
		setIsTokenValid(isTokenValid);

		if (!isTokenValid) {
			setUser(mockUser);
			removeAuthToken();
			delete api.defaults.headers.Authorization;
		}
	}, []);

	const { isFetching: loading } = useGetUser({
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
		removeAuthToken();
		setUser(null);
		setUserRole(null);
		setUserRoleV2(null);
		delete api.defaults.headers.Authorization;
		setTimeout(() => {
			router.replace(`/login?returnUrl=${pathname}`);
		}, 0);
	};

	
	const checkAuth = (rolev1: number, rolev2: any, permission: string) => {
		if (rolev1 === 0) {
			return true;
		}

		if (rolev2 === undefined) {
			return false;
		}

		if (rolev2?.root) {
			return true;
		}

		const scopePermission = permission.split(".");

		if (!rolev2[scopePermission[0]]) {
			return false;
		}

		if (
			scopePermission.length == 2 &&
			!rolev2[scopePermission[0]].includes(scopePermission[1])
		) {
			return false;
		}
		return true;
	};

	const hasAuth = (permission: string) => {
		if (userRole == undefined || userRoleV2 == undefined) {
			return false;
		}
		return checkAuth(userRole, userRoleV2, permission);
	};

	const values = useMemo(
		() => ({
			isAuthenticated: user !== null && !isEqual(user, mockUser),
			isOtpVerified: user !== null && !isEqual(user, mockUser),
			user,
			loading,
			signup,
			logout,
			// updateUser,
			resendOTP,
			checkAuth,
			hasAuth,
		}),
		[user, loading]
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
		if (user === null) {
			return;
		}

		if (!isAuthenticated && !isOtpVerified && !PUBLIC_PATHNAME.includes(pathname)) {
			delete api.defaults.headers.Authorization;
			localStorage.removeItem("token");
			router.replace(`/login?returnUrl=${pathname}`);
		} else if (
			isAuthenticated &&
			isOtpVerified &&
			PUBLIC_PATHNAME.includes(pathname)
		) {
			router.replace("/dashboard");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated, isOtpVerified, user, pathname]);

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
				<CircularProgress />
			</Box>
		);
	} else {
		return <>{props.children}</>;
	}
};
