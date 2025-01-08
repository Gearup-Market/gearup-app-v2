import React from "react";
import styles from "./BlogDetailsView.module.scss";
import { BlogDetailsComponent } from "@/components/home";
import { IGetArticle } from "@/app/api/hooks/blogs/types";

interface Props {
	blogData: IGetArticle;
	isLoading: boolean;
}

const BlogDetailsView = ({ blogData, isLoading }: Props) => {
	return (
		<div className={styles.container}>
			<BlogDetailsComponent data={blogData} isLoading={isLoading} />
		</div>
	);
};

export default BlogDetailsView;
