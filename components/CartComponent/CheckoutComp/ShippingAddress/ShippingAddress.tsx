import React from "react";
import styles from "./ShippingAddress.module.scss";
import { Button, InputField, Select } from "@/shared";
import { Form, Formik } from "formik";
import { HeaderSubText } from "@/components/UserDashboard";
import * as Yup from "yup";
import Image from "next/image";

interface CheckoutFormValues {
	cardNumber: string;
	expired: string;
	cvc: string;
	country: string;
}

interface Props {
	handleNext: () => void;
	handlePrev: () => void;
}

const ShippingAddress = ({ handleNext, handlePrev }: Props) => {
	const initialValues: CheckoutFormValues = {
		cardNumber: "",
		expired: "",
		cvc: "",
		country: ""
	};

	const validationSchema = Yup.object().shape({
		cardNumber: Yup.string().required("Card number is required"),
		expired: Yup.string().required("Expired date is required"),
		cvc: Yup.string().required("CVC is required"),
		country: Yup.string().required("Country is required")
	});

	const handleSubmit = (values: CheckoutFormValues) => {
		// Handle form submission
		console.log(values);
	};

	const countries = [
		"Nigeria",
		"Ghana",
		"South Africa",
		"Kenya",
		"Uganda",
		"Togo",
		"Benin"
	];

	return (
		<div className={styles.container}>
			<HeaderSubText variant="main" title="Checkout" />
			<div className={styles.container__form_container}>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					<Form>
						<div className={styles.container__form_container__form}>
							<div className={styles.form_field}>
								<Select label="Country" options={countries} />
							</div>
							<div className={styles.form_field}>
								<InputField label="Name" placeholder="Enter full name" />
							</div>
							<div className={styles.form_field}>
								<InputField
									label="Company(optional)"
									placeholder="Enter company name"
								/>
							</div>
							<div className={styles.form_field}>
								<InputField
									label="VAT number(optional)"
									placeholder="Enter VAT number"
								/>
							</div>
							<div className={styles.form_field}>
								<InputField label="Address" placeholder="Enter address" />
							</div>
							<div className={styles.flex_fields}>
								<div className={styles.form_field}>
									<InputField
										label="Zip"
										placeholder="Enter zip code"
									/>
								</div>
								<div className={styles.form_field}>
									<InputField label="City" placeholder="Enter city" />
								</div>
							</div>
							<div className={styles.form_field}>
								<InputField
									label="Mobile number"
									placeholder="Phone number"
								/>
							</div>

							<div className={styles.submit_btn_container}>
								<Button onClick={handleNext} iconSuffix="/svgs/arrow.svg">
									Continue
								</Button>
								<Button
									buttonType="secondary"
									onClick={handlePrev}
									iconSuffix="/svgs/arrow.svg"
								>
									Back
								</Button>
							</div>
						</div>
					</Form>
				</Formik>
			</div>
		</div>
	);
};

export default ShippingAddress;
