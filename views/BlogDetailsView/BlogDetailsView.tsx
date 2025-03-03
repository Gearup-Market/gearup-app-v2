import React from "react";
import styles from "./BlogDetailsView.module.scss";
import { BlogDetailsComponent } from "@/components/home";
import { IGetArticle } from "@/app/api/hooks/blogs/types";

interface Props {
	blogData: IGetArticle;
}

const BlogDetailsView = ({ blogData }: Props) => {
	return (
		<div className={styles.container}>
			<BlogDetailsComponent data={blogData} />
		</div>
	);
};

export default BlogDetailsView;
