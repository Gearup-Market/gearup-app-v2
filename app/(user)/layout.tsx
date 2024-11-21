import { AuthProvider } from "@/contexts/AuthContext";

export default function UserMainLayout({ children }: { children: React.ReactNode }) {
	return <AuthProvider>{children}</AuthProvider>;
}
