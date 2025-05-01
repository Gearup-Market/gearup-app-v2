import { AuthProvider } from "@/contexts/AuthContext";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "GearUp | The Peer-2-Peer Marketplace for African Creators",
	description:
		"GearUp connects African creators with opportunities to rent, buy, and sell creative gear, book studio spaces, access professional courses, and land gigs."
};

export default function UserMainLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<AuthProvider>{children}</AuthProvider>;
		</>
	);
}
