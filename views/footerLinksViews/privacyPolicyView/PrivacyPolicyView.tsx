"use client";

import { SecondaryHero, Title } from "@/shared";
import React from "react";
import styles from "./PrivacyPolicyView.module.scss";
import Link from "next/link";

const PrivacyPolicyView = () => {
	return (
		<>
			<SecondaryHero
				title="Privacy Policy"
				description="Last updated - 30th November 2024"
			/>
			<div className={styles.section}>
				<div className={styles.container}>
					<Title description="At GearUp.market, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data." />
					<div className={styles.detail}>
						<div className={styles.title}>
							<h3>Introduction</h3>
							<p>
								GearUp (<Link href={"/"}>https://gearup.market</Link>)
								("we," "us," "our") is an online marketplace that allows
								users to rent, buy, sell various types of creative
								equipment, courses, list and find gig opportunities. We
								collect certain personal data to provide you with our
								services. By using the platform's website:
								<Link href={"/"}>https://gearup.market</Link>, you agree
								to the practices described in this policy.
							</p>
						</div>
					</div>
					<div className={styles.detail}>
						<div className={styles.title}>
							<h3>Information We Collect</h3>
							<h5>Personal Data</h5>
							<p>
								We collect personal data that you provide directly to us,
								including:
							</p>
						</div>
						<ul className={styles.list}>
							<li className={styles.list_item}>
								<span>Account Information:</span> Name, ID, biometric,
								age, location/address, country, date of birth, email
								address, phone number, and password.
							</li>
							<li className={styles.list_item}>
								<span>Transaction Information:</span> Payment details,
								billing and shipping addresses, and purchase history.
							</li>
							<li className={styles.list_item}>
								<span>Contact Information:</span> When you contact us for
								support or inquiries, we may retain your contact details
								for correspondence purposes.
							</li>
						</ul>
						<div className={styles.title}>
							<h5>Automatically Collected Data</h5>
							<p>
								When you use our site, we collect certain information
								automatically, including:
							</p>
						</div>
						<ul className={styles.list}>
							<li className={styles.list_item}>
								<span>Usage Data:</span> Information about your
								interaction with our platform, including pages visited,
								time spent, and referral sources.
							</li>
							<li className={styles.list_item}>
								<span>Device and Log Data:</span> Information such as IP
								address, browser type, device type, and operating system.
							</li>
						</ul>
						<div className={styles.title}>
							<h5>Cookies and Tracking Technologies</h5>
							<p>
								We use cookies and similar technologies to collect data
								about your preferences and improve our site’s performance.
								For more information, please refer to our{" "}
								<Link href={"/cookies-policy"}>Cookies Policy</Link>.
							</p>
						</div>
					</div>
					<div className={styles.detail}>
						<div className={styles.title}>
							<h3>How We Use Your Information</h3>
							<p>
								GearUp.market uses your data for the following purposes:
							</p>
						</div>
						<ul className={styles.list}>
							<li className={styles.list_item}>
								<span>Providing and Improving Services:</span> To process
								transactions, manage rentals and sales, and improve user
								experience.
							</li>
							<li className={styles.list_item}>
								<span>Communication:</span> To send you transactional
								information, respond to inquiries, and provide updates
								regarding your account.
							</li>
							<li className={styles.list_item}>
								<span>Marketing:</span> With your consent, we may send you
								promotional materials and special offers.
							</li>
							<li className={styles.list_item}>
								<span>Analytics and Research:</span> To analyze usage and
								performance to enhance our services and develop new
								features.
							</li>
						</ul>
					</div>
					<div className={styles.detail}>
						<div className={styles.title}>
							<h3>Data Sharing and Disclosure</h3>
							<h5>Third-Party Service Providers</h5>
							<p>
								We may share your information with trusted third-party
								service providers who assist us in processing payments,
								providing customer support, and conducting analytics.
								These providers are required to use your data solely to
								perform services on our behalf and are bound by
								confidentiality obligations.
							</p>
							<h5 style={{ marginTop: "1.6rem" }}>
								Legal Compliance and Protection
							</h5>
							<p>
								GearUp may disclose personal information if required by
								law, legal process, or in response to valid requests by
								public authorities. We may also disclose information to
								protect our rights, and users, and enforce our Terms &
								Conditions.
							</p>
						</div>
					</div>
					<div className={styles.detail}>
						<div className={styles.title}>
							<h3>Data Security</h3>
							<p>
								We implement appropriate technical and organizational
								measures to protect your personal information from
								unauthorized access, alteration, or destruction. This
								includes using secure payment gateways and encryption
								technologies.
							</p>
						</div>
					</div>
					<div className={styles.detail}>
						<div className={styles.title}>
							<h3>Your Rights and Choices</h3>
							<p>
								Depending on your location, you may have the following
								rights regarding your personal information:
							</p>
						</div>
						<ul className={styles.list}>
							<li className={styles.list_item}>
								<span>Access:</span> Request access to your data.
							</li>
							<li className={styles.list_item}>
								<span>Correction:</span> Request corrections to any
								inaccurate or incomplete information.
							</li>
							<li className={styles.list_item}>
								<span>Deletion:</span> Request deletion of your data,
								subject to certain legal obligations.
							</li>
							<li className={styles.list_item}>
								<span>Objection:</span> Object to our processing of your
								data or withdraw consent for marketing communications.
							</li>
						</ul>
						<p>
							To exercise these rights, please contact us at{" "}
							<Link href="mailto:support@gearup.market" target="_blank">
								support@gearup.market
							</Link>
						</p>
					</div>
					<div className={styles.detail}>
						<div className={styles.title}>
							<h3>Data Retention</h3>
							<p>
								We retain your personal information only as long as
								necessary to fulfill the purposes for which it was
								collected or as required by law. Once your data is no
								longer needed, we securely delete or anonymize it.
							</p>
						</div>
					</div>
					<div className={styles.detail}>
						<div className={styles.title}>
							<h3> Children’s Privacy</h3>
							<p>
								Our platform is not intended for children under the age of
								16. We do not knowingly collect personal data from
								children. If we learn that we have collected such
								information, we will take steps to delete it promptly.
							</p>
						</div>
					</div>
					<div className={styles.detail}>
						<div className={styles.title}>
							<h3> Changes to This Privacy Policy</h3>
							<p>
								GearUp reserves the right to update or modify this Privacy
								Policy at any time. Any changes will be posted on this
								page, with the "Last Updated" date revised. Continued use
								of our services after changes to this policy constitutes
								your acceptance of the updated terms.
							</p>
						</div>
					</div>
					<div className={styles.detail}>
						<div className={styles.title}>
							<h3>Contact Us</h3>
							<p>
								If you have any questions about this Privacy Policy or our
								data practices, please contact us at:{" "}
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

export default PrivacyPolicyView;
