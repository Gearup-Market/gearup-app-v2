import { AdminAuthProvider } from "@/contexts/AuthContext/AdminAuthContext";

export default function AdminMainLayout({ children }: { children: React.ReactNode }) {
	return <AdminAuthProvider>{children}</AdminAuthProvider>;
}
