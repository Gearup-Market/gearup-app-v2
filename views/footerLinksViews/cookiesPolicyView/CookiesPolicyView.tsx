"use client";

import { SecondaryHero, Title } from "@/shared";
import Link from "next/link";
import React from "react";
import styles from "./CookiesPolicyView.module.scss";

const CookiesPolicyView = () => {
	return (
		<>
			<SecondaryHero
				title="Cookies Policy"
				description="Last updated - 5th November 2024"
			/>
			<div className={styles.section}>
				<div className={styles.container}>
					<Title description="GearUp.market ('we,' 'us,' 'our') uses cookies and similar technologies to enhance your experience on our website. This Cookies Policy explains what cookies are, how we use them, and how you can manage your preferences." />
					<div className={styles.detail}>
						<div className={styles.title}>
							<h3>What Are Cookies?</h3>
							<p>
								Cookies are small text files stored on your device
								(computer, smartphone, or tablet) when you visit our
								website. They help us remember information about your
								visit, such as your language preference and other
								settings, to provide a better user experience.
							</p>
						</div>
					</div>
					<div className={styles.detail}>
						<div className={styles.title}>
							<h3>Types of Cookies We Use</h3>
							<p>We use the following types of cookies on GearUp.market:</p>
						</div>
						<ul className={styles.list}>
							<li className={styles.list_item}>
								<span>Strictly Necessary Cookies:</span> These cookies are
								essential for our website to function correctly. They
								enable core features such as secure login and account
								management. Without these cookies, the services you’ve
								requested cannot be provided.
							</li>
							<li className={styles.list_item}>
								<span>Performance Cookies:</span> These cookies collect
								information about how you use our site, such as which
								pages you visit most frequently and any error messages you
								encounter. This data helps us improve our website's
								performance and user experience. Performance cookies do
								not collect personal information.
							</li>
							<li className={styles.list_item}>
								<span>Functionality Cookies:</span> These cookies allow
								our website to remember choices you make (e.g., language
								preferences) to provide a more personalized experience.
							</li>
							<li className={styles.list_item}>
								<span>Advertising and Targeting Cookies:</span> We may use
								these cookies to deliver content and advertisements
								tailored to your interests. They help us measure the
								effectiveness of advertising campaigns and understand user
								interests.
							</li>
						</ul>
					</div>
					<div className={styles.detail}>
						<div className={styles.title}>
							<h3>Third-Party Cookies</h3>
							<p>
								Some cookies on our site may be set by third-party
								providers to help deliver advertisements, analyze usage,
								or provide additional functionality. These third parties
								may use their cookies to collect information about your
								online activities across different websites.
							</p>
						</div>
					</div>
					<div className={styles.detail}>
						<div className={styles.title}>
							<h3>Why We Use Cookies</h3>
							<p>We use cookies to:</p>
							<ul className={styles.list}>
								<li className={styles.list_item}>
									Enable essential functionality and ensure our site
									operates smoothly.
								</li>
								<li className={styles.list_item}>
									Improve our site’s performance and understand how
									users engage with it.
								</li>
								<li className={styles.list_item}>
									Personalize your experience based on your preferences.
								</li>
								<li className={styles.list_item}>
									Deliver relevant content and advertising tailored to
									your interests.
								</li>
							</ul>
						</div>
					</div>
					<div className={styles.detail}>
						<div className={styles.title}>
							<h3>Managing Cookies</h3>
							<p>
								You have control over how cookies are used on our website.
								You can manage or disable cookies through your browser
								settings. Please note:
							</p>
							<ul className={styles.list}>
								<li className={styles.list_item}>
									<span>Accepting or Rejecting Cookies:</span> Most
									browsers allow you to accept or reject cookies.
									However, rejecting certain cookies may impact the
									functionality of our website.
								</li>
								<li className={styles.list_item}>
									<span>Cookie Settings:</span> You can adjust your
									cookie settings within your browser’s options or
									preferences menu. For more information on managing
									cookies, visit the "Help" section of your browser.
								</li>
							</ul>
							<div className={styles.title}>
								<p>
									For more details about managing or deleting cookies,
									please visit{" "}
									<Link
										href="https://support.google.com"
										target="_blank"
										rel="noreferrer noopener"
									>
										support.google.com
									</Link>
								</p>
							</div>
						</div>
					</div>
					<div className={styles.detail}>
						<div className={styles.title}>
							<h3>Updates to This Cookies Policy</h3>
							<p>
								We may update this Cookies Policy at any time to reflect
								changes in our practices or for other operational, legal,
								or regulatory reasons. When we make updates, we will
								revise the "Effective Date" at the top of this page.
								Please revisit this page regularly to stay informed about
								our use of cookies.
							</p>
						</div>
					</div>
					<div className={styles.detail}>
						<div className={styles.title}>
							<h3>Contact Us</h3>
							<p>
								If you have any questions about this Cookies Policy or our
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

export default CookiesPolicyView;
