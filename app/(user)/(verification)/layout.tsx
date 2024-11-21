import { AuthProvider } from "@/contexts/AuthContext";
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Welcome to Gear Up",
    description: "Marketplace to get everything gears",
};

export default function VerficationLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <aside>{children}</aside>
        </AuthProvider>
    )
}
