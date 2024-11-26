import styles from "./layout.module.scss";
import { ProtectRoute } from "@/contexts/AuthContext";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<ProtectRoute>
			{" "}
			<main className={styles.main}>{children}</main>
		</ProtectRoute>
	);
}
