import { BlogDetailsView } from "@/views";
import React from "react";

const Page = ({ params }: { params: { slug: string } }) => {
	const { slug } = params;

	return <BlogDetailsView slug={slug} />;
};

export default Page;
