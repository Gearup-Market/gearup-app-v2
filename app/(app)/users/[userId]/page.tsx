import { UserDetailsView } from "@/views";
import React from "react";

const Page = ({ params }: { params: { userId?: string } }) => {
	return <UserDetailsView userId={params.userId ?? ""} />;
};

export default Page;
