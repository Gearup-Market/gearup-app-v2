import { UserDetailsComponent } from "@/components/home";
import React from "react";

const UserDetailsView = ({ userId }: { userId: string }) => {
	return <UserDetailsComponent userId={userId} />;
};

export default UserDetailsView;
