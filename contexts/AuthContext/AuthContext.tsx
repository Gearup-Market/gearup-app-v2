"use client";
import { Box } from "@mui/material";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AuthProviderProps, ProtectRouteProps } from "./types";
import { removeAuthToken, setAuthToken } from "@/utils/tokenStorage";
import { DefaultProviderType } from "@/interfaces/authcontext";
import { useGetUser, useGetVerifyToken } from "@/app/api/hooks/users";
import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import { clearUser, updateToken, updateUser } from "@/store/slices/userSlice";
import useCart from "@/hooks/useCart";
import { CircularProgressLoader } from "@/shared/loaders";
import { queryClient } from "@/app/api";
import { useQueryClient } from "@tanstack/react-query";
import { clearState, updateVerification } from "@/store/slices/verificationSlice";

const AuthContext = createContext<DefaultProviderType>({
	isAuthenticated: false,
	isOtpVerified: false,
	user: null,
	loading: false,
	logout: async () => {}
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const dispatch = useAppDispatch();
	const user = useAppSelector(state => state.user);

	const [isTokenValid, setIsTokenValid] = useState(false);
	const { isFetching: isUserLoading, data: userData } = useGetUser({
		userId: user.userId as string
	});

	const { data: tokenData, isFetched } = useGetVerifyToken({
		token: user.token as string
	});
	const { syncCartItems } = useCart();

	const queryClient = useQueryClient();

	useEffect(() => {
		queryClient.invalidateQueries({
			queryKey: ["verifyToken"],
			exact: true
		});
	}, [pathname, queryClient]);

	// Verify Token
	useEffect(() => {
		if (tokenData?.token) {
			dispatch(updateToken(tokenData.token));
			setAuthToken(tokenData.token);
		}

		setIsTokenValid(!!tokenData);
	}, [isFetched, tokenData]);

	// Sync User Data
	useEffect(() => {
		if (userData) {
			dispatch(
				updateUser({ isAdmin: false, isAuthenticated: true, ...userData.data })
			);
			if (userData.data.kyc) {
				dispatch(updateVerification(userData.data.kyc));
			}
		}
	}, [userData, dispatch]);

	// Sync Cart Data
	useEffect(() => {
		if (user?.userId) syncCartItems();
	}, [user?.userId, syncCartItems]);

	// Logout Function
	const logout = async () => {
		removeAuthToken();
		dispatch(clearUser());
		dispatch(clearState());
		queryClient.clear();
		router.replace("/login");
	};

	const authValues = useMemo(
		() => ({
			isAuthenticated: isTokenValid,
			isOtpVerified: isTokenValid,
			user,
			loading: isUserLoading,
			logout
		}),
		[user, isTokenValid, isUserLoading, logout]
	);

	return <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export const ProtectRoute = ({ children }: ProtectRouteProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const { isAuthenticated, loading } = useAuth();
	const user = useAppSelector(state => state.user);

	const UNPROTECTED_ROUTES = useMemo(
		() => [
			"/login",
			"/signup",
			"/forgot-password",
			"/password-reset",
			"/verify",
			"/reset"
		],
		[]
	);

	const returnUrl = searchParams.get("returnUrl") || pathname;

	useEffect(() => {
		if (!loading && !user.isAuthenticated) {
			if (!isAuthenticated && !UNPROTECTED_ROUTES.includes(pathname)) {
				router.replace(`/login`);
			} else if (isAuthenticated && pathname === "/login") {
				router.replace("/user/dashboard");
			}
		}
	}, [
		isAuthenticated,
		loading,
		pathname,
		UNPROTECTED_ROUTES,
		router,
		user.isAuthenticated
	]);

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

	return <>{children}</>;
};
