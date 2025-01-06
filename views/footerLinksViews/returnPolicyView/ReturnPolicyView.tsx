import { SecondaryHero, Title } from "@/shared";
import Link from "next/link";
import React from "react";
import styles from "./ReturnPolicyView.module.scss";

const ReturnPolicyView = () => {
	return (
		<>
			<SecondaryHero
				title="Cookies Policy"
				description="Last updated - 5th November 2024"
			/>
			<div className={styles.section}>
				<div className={styles.container}>
					<Title description="At GearUp.market, we prioritize customer satisfaction and want you to be happy with your gear. Please review our return policy for rentals, purchases, and courses to understand your options." />
					<div className={styles.detail}>
						<div className={styles.title}>
							<h3>General Return Policy</h3>
							<p>
								Gearup.market accepts returns on eligible items within
								specific timeframes. Our return policy varies based on the
								type of transaction (rental, purchase, or course
								enrollment).
							</p>
						</div>
					</div>
					<div className={styles.detail}>
						<div className={styles.title}>
							<h3>Returns for Purchased Items</h3>
						</div>
						<ul className={styles.list}>
							<li className={styles.list_item}>
								<span>Eligibility:</span> Most items purchased on GearUp
								can be returned within 30 days of the delivery date. Items
								must be in their original, unused condition with all tags,
								labels, and accessories included.
							</li>
							<li className={styles.list_item}>
								<span>Non-Returnable Items:</span> Certain items may be
								ineligible for returns, including digital products,
								courses, and items marked "final sale." Check the
								individual listing for return eligibility.
							</li>
							<li className={styles.list_item}>
								<span>Return Process:</span>
								<ol className={styles.ordered_list}>
									<li className={styles.list_item}>
										<span>Initiate a Return:</span> Contact our
										support team at{" "}
										<Link
											href="mailto:support@gearup.market"
											target="_blank"
										>
											support@gearup.market
										</Link>{" "}
										within 30 days of receiving your item to request a
										return.
									</li>
									<li className={styles.list_item}>
										<span>Shipping Instructions:</span> Once your
										return is approved, you will receive detailed
										instructions on how to ship the item back to us.
									</li>
									<li className={styles.list_item}>
										<span>Condition Verification:</span> Upon
										receiving your returned item, we will inspect it
										to ensure it meets the return criteria.
									</li>
								</ol>
							</li>
							<li className={styles.list_item}>
								<span>Refunds:</span> Refunds will be issued to your
								original payment method within 5-7 business days after the
								item passes our inspection. Original shipping fees are
								non-refundable, and return shipping costs are the
								customer’s responsibility unless the item is defective or
								incorrect.
							</li>
						</ul>
					</div>
					<div className={styles.detail}>
						<div className={styles.title}>
							<h3>Rental Returns</h3>
							<li className={styles.list_item}>
								<span>Timely Returns:</span> Items rented from Gearup must
								be returned by the agreed-upon return date. Late returns
								will incur additional fees based on the daily rental rate
								of the item.
							</li>
							<li className={styles.list_item}>
								<span>Condition of Returned Rentals:</span> Rented items
								should be returned in the same condition as they were
								received. If an item is returned damaged, additional
								repair or replacement costs may be charged.
							</li>
							<li className={styles.list_item}>
								<span>Rental Extensions:</span> If you need to extend your
								rental period, please contact our support team at least 24
								hours before your original return date. Rental extensions
								are subject to availability and additional fees.
							</li>
						</div>
					</div>
					<div className={styles.detail}>
						<div className={styles.title}>
							<h3>Course Cancellations and Refunds</h3>
							<li className={styles.list_item}>
								<span>Course Fees:</span> Course enrollment fees are
								generally non-refundable, except in cases where a course
								is canceled by Gearup.market.
							</li>
							<li className={styles.list_item}>
								<span>Course Cancellations by Gearup:</span> If we cancel
								a course, you will be notified promptly and will receive a
								full refund of your enrollment fee within 5-7 business
								days.
							</li>
						</div>
					</div>
					<div className={styles.detail}>
						<div className={styles.title}>
							<h3>Damaged or Incorrect Items</h3>
							<p>
								If you receive an item that is damaged or incorrect,
								please reach out to our support team within 7 days of
								delivery. We will arrange for a return or replacement at
								no cost to you. Items damaged or altered by the customer
								after delivery may not be eligible for a refund or
								replacement.
							</p>
						</div>
					</div>
					<div className={styles.detail}>
						<div className={styles.title}>
							<h3>Contact Information</h3>
							<p>
								For questions about our Return Policy or to initiate a
								return, please contact us at:{" "}
								<Link href="mailto:support@gearup.market" target="_blank">
									support@gearup.market
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ReturnPolicyView;
