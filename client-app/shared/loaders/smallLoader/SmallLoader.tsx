import { CSSProperties } from "react";
import styles from "./SmallLoader.module.scss";

interface Props {
	className?: string;
	style?: CSSProperties;
}

const SmallLoader = ({ className, style }: Props) => {
	return <div className={`${styles.smallLoader} ${className}`} style={style}></div>;
};

export default SmallLoader;
