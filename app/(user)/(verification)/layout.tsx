import { AuthProvider } from "@/contexts/AuthContext";

export default function VerficationLayout({ children }: { children: React.ReactNode }) {
	return (
		<AuthProvider>
			<aside>{children}</aside>
		</AuthProvider>
	);
}
