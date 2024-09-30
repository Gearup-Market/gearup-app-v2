import React from "react";
import styles from "./EmptyCart.module.scss";
import Image from "next/image";

const EmptyCart = () => {
	return (
		<div className={styles.container}>
			<div>
				<Image
					src="/svgs/colored-cart-icon.svg"
					alt="empty cart"
					height={200}
					width={200}
				/>
			</div>
			<h3 className={styles.empty_cart_text}>No Item In Your Cart</h3>
		</div>
	);
};

export default EmptyCart;
