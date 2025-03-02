"use client";
import { Box } from "@mui/material";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AuthProviderProps, ProtectRouteProps } from "./types";
import { removeAuthToken } from "@/utils/tokenStorage";
import { DefaultProviderType } from "@/interfaces/authcontext";
import { useGetUser, useGetVerifyToken } from "@/app/api/hooks/users";
import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import { clearUser, updateUser } from "@/store/slices/userSlice";
import useCart from "@/hooks/useCart";
import { CircularProgressLoader } from "@/shared/loaders";
import { queryClient } from "@/app/api";
import { useQueryClient } from "@tanstack/react-query";
import { useGetAdmin, useGetVerifyAdminToken } from "@/app/api/hooks/Admin/users";

const AuthContext = createContext<DefaultProviderType>({
	isAuthenticated: false,
	isOtpVerified: false,
	user: null,
	loading: false,
	logout: async () => {}
});

export const AdminAuthProvider = ({ children }: AuthProviderProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const dispatch = useAppDispatch();
	const user = useAppSelector(state => state.user);

	const [isTokenValid, setIsTokenValid] = useState(false);
	const { isFetching: isAdminLoading, data: adminData } = useGetAdmin({
		adminId: user._id as string
	});
	const { data: tokenData, isFetched } = useGetVerifyAdminToken({
		token: user.token as string
	});
	const { syncCartItems } = useCart();

	const queryClient = useQueryClient();

	useEffect(() => {
		queryClient.invalidateQueries({
			queryKey: ["verifyAdminToken"],
			exact: true
		});
	}, [pathname, queryClient]);

	// Verify Token
	useEffect(() => {
		setIsTokenValid(!!tokenData);
	}, [isFetched, tokenData]);

	// Sync User Data
	useEffect(() => {
		if (adminData) {
			dispatch(
				updateUser({ isAdmin: true, isAuthenticated: true, ...adminData.data })
			);
		}
	}, [adminData, dispatch]);

	// Sync Cart Data
	useEffect(() => {
		if (user?.userId) syncCartItems();
	}, [user?.userId, syncCartItems]);

	// Logout Function
	const logout = async () => {
		removeAuthToken();
		dispatch(clearUser());
		queryClient.clear();
		router.replace(`/admin/login?returnUrl=${pathname}`);
	};

	const authValues = useMemo(
		() => ({
			isAuthenticated: isTokenValid,
			isOtpVerified: isTokenValid,
			user,
			loading: isAdminLoading,
			logout
		}),
		[user, isTokenValid, isAdminLoading, logout]
	);

	return <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>;
};

export const useAdminAuth = () => useContext(AuthContext);

export const AdminProtectRoute = ({ children }: ProtectRouteProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const { isAuthenticated, loading } = useAdminAuth();

	const UNPROTECTED_ROUTES = useMemo(() => ["/admin/login"], []);

	const returnUrl = searchParams.get("returnUrl") || "/admin/dashboard";

	useEffect(() => {
		if (!loading) {
			if (!isAuthenticated && !UNPROTECTED_ROUTES.includes(pathname)) {
				router.replace(`/admin/login?returnUrl=${pathname}`);
			} else if (isAuthenticated && pathname === "/admin/login") {
				router.replace(returnUrl);
			}
		}
	}, [isAuthenticated, loading, pathname, UNPROTECTED_ROUTES, router]);

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
				<CircularProgressLoader color="#F76039" size={40} />
			</Box>
		);
	}

	return <>{children}</>;
};
