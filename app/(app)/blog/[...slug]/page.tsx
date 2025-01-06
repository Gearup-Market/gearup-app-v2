import { BlogDetailsView } from "@/views";
import React from "react";

const Page = ({ params }: { params: { slug: string } }) => {
	const { slug } = params;
	console.log(params);

	return <BlogDetailsView slug={slug} />;
};

export default Page;
