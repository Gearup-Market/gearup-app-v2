import { SecondaryHero, Title } from "@/shared";
import Link from "next/link";
import React from "react";
import styles from "./TermsView.module.scss";

const TermsView = () => {
	return (
		<>
			<SecondaryHero
				title="Terms & Conditions"
				description="Last updated - 5th November 2024"
			/>
			<div className={styles.section}>
				<div className={styles.container}>
					<Title description="Welcome to GearUp.market! By accessing or using our website, you ('User,' 'you,' or 'your') agree to comply with and be bound by these Terms & Conditions. If you do not agree, please refrain from using our services." />
					<div className={styles.detail}>
						<div className={styles.title}>
							<h3>Introduction</h3>
							<p>
								GearUp.market ("we," "us," "our") is an online platform
								for renting, buying, selling, and learning about various
								types of gear and equipment. These Terms & Conditions
								outline the rules and responsibilities of all users.
							</p>
						</div>
					</div>
					<div className={styles.detail}>
						<div className={styles.title}>
							<h3>Eligibility</h3>
							<p>
								To use our services, you must be at least 18 years old or
								have the legal capacity to enter into agreements in your
								jurisdiction. By creating an account, you represent that
								you meet these eligibility requirements.
							</p>
						</div>
					</div>
					<div className={styles.detail}>
						<div className={styles.title}>
							<h3>Accounts and Registration</h3>
						</div>
						<ul className={styles.list}>
							<li className={styles.list_item}>
								<span>Account Creation:</span> To access certain features
								of GearUp, you must create an account by providing
								accurate information, including a valid email address and
								password. You agree to update your information if it
								changes.
							</li>
							<li className={styles.list_item}>
								<span>Account Security:</span> You are responsible for
								safeguarding your account credentials and for any activity
								that occurs under your account. Notify us immediately if
								you suspect unauthorized access to your account.
							</li>
							<li className={styles.list_item}>
								<span>Account Termination:</span> GearUp reserves the
								right to suspend or terminate your account at any time for
								violations of these Terms or for any reason, at our
								discretion.
							</li>
						</ul>
					</div>
					<div className={styles.detail}>
						<div className={styles.title}>
							<h3>Services Provided</h3>
							<p>GearUp.market offers a platform for:</p>
							<ul className={styles.list}>
								<li className={styles.list_item}>
									<span>Renting Gear:</span> Users can browse and rent
									equipment for specified periods.
								</li>
								<li className={styles.list_item}>
									<span>Buying and Selling Gear:</span> Users can
									purchase new or used gear, or list their own equipment
									for sale.
								</li>
								<li className={styles.list_item}>
									<span>Educational Courses:</span> We provide courses
									to help users develop skills related to content
									creation, videography, photography, etc.
								</li>
							</ul>
						</div>
					</div>
					<div className={styles.detail}>
						<div className={styles.title}>
							<h3>User Responsibilities</h3>
							<p>By using GearUp, you agree to:</p>
							<ul className={styles.list}>
								<li className={styles.list_item}>
									<span>Use Our Services Lawfully:</span> You will not
									use GearUp for illegal purposes or in ways that could
									harm, disable, or impair our platform or services.
								</li>
								<li className={styles.list_item}>
									<span>Provide Accurate Information:</span> You will
									ensure all information you provide is current and
									accurate.
								</li>
								<li className={styles.list_item}>
									<span>Respect Other Users:</span> Treat all community
									members respectfully and follow any guidelines we may
									set for marketplace conduct.
								</li>
							</ul>
						</div>
					</div>
					<div className={styles.detail}>
						<div className={styles.title}>
							<h3>Payments and Fees</h3>
							<ul className={styles.list}>
								<li className={styles.list_item}>
									<span>Rental and Sales Transactions:</span> Payments
									for rentals, purchases, and sales are securely
									processed through our payment system. You agree to pay
									all applicable fees and charges associated with your
									transactions.
								</li>
								<li className={styles.list_item}>
									<span>Commission on Sales:</span> For items sold
									through GearUp, we charge a small commission through
									our escrow services to maintain our platform and
									services. The exact rate will be displayed when
									listing an item for sale.
								</li>
								<li className={styles.list_item}>
									<span>Refunds and Returns:</span> All refunds and
									returns are governed by our{" "}
									<Link href="/privacy-policy">Privacy Policy</Link>.
								</li>
							</ul>
						</div>
					</div>
					<div className={styles.detail}>
						<div className={styles.title}>
							<h3>Late Returns and Damage</h3>
							<ul className={styles.list}>
								<li className={styles.list_item}>
									<span>Rental Returns:</span> Items rented through
									GearUp must be returned on or before the agreed return
									date. Late returns will incur additional charges based
									on the daily rental rate.
								</li>
								<li className={styles.list_item}>
									<span>Damage to Rented Gear:</span> Users are
									responsible for returning items in the same condition
									as received. Any damage beyond normal wear and tear
									may result in additional charges to cover repair or
									replacement costs.
								</li>
							</ul>
						</div>
					</div>
					<div className={styles.detail}>
						<div className={styles.title}>
							<h3>Intellectual Property Rights</h3>
							<ul className={styles.list}>
								<li className={styles.list_item}>
									<span>Content Ownership:</span> All content on GearUp,
									including text, graphics, logos, images, and software,
									is the property of GearUp or its content providers and
									is protected by copyright and other intellectual
									property laws.
								</li>
								<li className={styles.list_item}>
									<span>User Content:</span> By posting content on our
									platform (such as item listings, reviews, etc.), you
									grant GearUp a non-exclusive, royalty-free license to
									use, display, reproduce, and distribute your content
									in connection with our services.
								</li>
							</ul>
						</div>
					</div>
					<div className={styles.detail}>
						<div className={styles.title}>
							<h3>Limitation of Liability</h3>
							<ul className={styles.list}>
								<li className={styles.list_item}>
									<span>No Liability for User Transactions:</span>{" "}
									GearUp acts as an escrow platform for the items rented
									or sold on the platform. Users (gear owners, renters,
									buyers, sellers) are encouraged to inspect the items
									before they rent, buy and/or return the gear. When in
									doubt, users are encouraged to use the GearUp third
									party check service.
								</li>
								<li className={styles.list_item}>
									<span>Service Availability:</span> GearUp does not
									guarantee uninterrupted service. We reserve the right
									to modify, suspend, or discontinue parts or all of our
									services at any time.
								</li>
							</ul>
							<div className={styles.title}>
								<p>
									In no event shall GearUp be liable for any indirect,
									incidental, or consequential damages arising from your
									use of our services, including but not limited to lost
									profits, personal injury, or loss of data.
								</p>
							</div>
						</div>
					</div>
					<div className={styles.detail}>
						<div className={styles.title}>
							<h3>Indemnification</h3>
							<p>
								You agree to indemnify and hold GearUp, its affiliates,
								and their officers, employees, and agents harmless from
								any claims, losses, damages, or expenses (including
								attorney's fees) arising from:
							</p>
							<ul className={styles.list}>
								<li className={styles.list_item}>
									Your violation of these Terms & Conditions.
								</li>
								<li className={styles.list_item}>
									Your use of our services.
								</li>
								<li className={styles.list_item}>
									Any claims related to items rented, sold, or purchased
									by you.
								</li>
							</ul>
						</div>
					</div>

					<div className={styles.detail}>
						<div className={styles.title}>
							<h3>Modifications to Terms</h3>
							<p>
								GearUp reserves the right to change these Terms &
								Conditions at any time. When we make changes, we will post
								the updated Terms on this page and update the "Effective
								Date" at the top. Continued use of our services after such
								changes constitutes your acceptance of the new Terms.
							</p>
						</div>
					</div>
					<div className={styles.detail}>
						<div className={styles.title}>
							<h3>Governing Law</h3>
							<p>
								These Terms & Conditions are governed by the laws of
								Nigeria, without regard to its conflict of law principles.
								Any legal action or proceeding arising out of or related
								to these Terms will be brought exclusively in the courts
								of Nigeria.
							</p>
						</div>
					</div>
					<div className={styles.detail}>
						<div className={styles.title}>
							<h3>Contact Information</h3>
							<p>
								If you have questions or concerns about these Terms &
								Conditions, please contact us at:{" "}
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

export default TermsView;
