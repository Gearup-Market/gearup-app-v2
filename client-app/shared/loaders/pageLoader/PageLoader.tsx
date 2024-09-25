import styles from "./PageLoader.module.scss";

interface Props {
	className?: string;
}

const PageLoader = ({ className }: Props) => {
	return <div className={`${styles.smallLoader} ${className}`}></div>;
};

export default PageLoader;
