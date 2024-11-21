import { AdminProtectRoute } from "@/contexts/AuthContext/AdminAuthContext";
import AdminLoginView from "@/views/AdminViews/AdminLoginView";

export default function AdminLogin() {
	return (
		<AdminProtectRoute>
			<AdminLoginView />
		</AdminProtectRoute>
	);
}
