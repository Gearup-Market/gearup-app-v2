"use client";

import React from "react";
import styles from "./PricingView.module.scss";
import { Button, InputField } from "@/shared";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import { HeaderSubText } from "@/components/Admin";
import { useGetAllPricings, usePostPricing } from "@/app/api/hooks/Admin/pricing";
import { PageLoader } from "@/shared/loaders";
import { PricingData } from "@/app/api/hooks/Admin/pricing/types";
import toast from "react-hot-toast";
import { useAppSelector } from "@/store/configureStore";

const PricingView = () => {
	const user = useAppSelector(s => s.user);
	const { mutateAsync: postPricing, isPending } = usePostPricing();
	const { data: allPricings, isLoading } = useGetAllPricings();

	const initialValues: PricingData = {
		gearSellerFee: allPricings?.gearSellerFee || 0,
		gearBuyerFee: allPricings?.gearBuyerFee || 0,
		gearLeaseFee: allPricings?.gearLeaseFee || 0,
		gearRenterFee: allPricings?.gearRenterFee || 0,
		courseCreatorFee: allPricings?.courseCreatorFee || 0,
		courseBuyerFee: allPricings?.courseBuyerFee || 0,
		studioLeaseFee: allPricings?.studioLeaseFee || 0,
		studioRenterFee: allPricings?.studioRenterFee || 0,
		talentServiceFee: allPricings?.talentServiceFee || 0,
		talentEmployerFee: allPricings?.talentEmployerFee || 0,
		withdrawalFee: allPricings?.withdrawalFee || 0,
		valueAddedTax: allPricings?.valueAddedTax || 0,
		disputeResolutionFee: allPricings?.disputeResolutionFee || 0,
		currencyConversionFee: allPricings?.currencyConversionFee || 0,
		lateCancellationFee: allPricings?.lateCancellationFee || 0,
		withdrawalLimit: allPricings?.withdrawalLimit || 0
	};
	const handleSubmit = async (values: PricingData) => {
		try {
			const updatedFields = Object.entries(values).reduce((acc, [key, value]) => {
				const fieldKey = key as keyof PricingData;
				if (value !== initialValues[fieldKey]) {
					acc[fieldKey] = value;
				}
				return acc;
			}, {} as Partial<PricingData>);

			if (!Object.keys(updatedFields).length) {
				toast.error("No changes made");
				return;
			}
			await postPricing(
				{ ...updatedFields, userId: user._id },
				{
					onSuccess: value => {
						toast.success("Pricings updated successfully");
					}
				}
			);
		} catch (error) {
			console.error("Error updating pricing:", error);
			toast.error("Failed to update pricing");
		}
	};
	return (
		<div className={styles.container}>
			{isLoading ? (
				<PageLoader />
			) : (
				<div className={styles.container__form_container}>
					<Formik initialValues={initialValues} onSubmit={handleSubmit}>
						{({ errors, touched, isSubmitting, values }) => (
							<Form>
								<div className={styles.header_title}>
									<HeaderSubText title="Pricings" variant="main" />
								</div>
								<div className={styles.container__form_container__form}>
									<div className={styles.form_field}>
										<Field name="courseBuyerFee">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="Course Buyer Fee"
													type="number"
													placeholder="Enter a Course Buyer Fee"
													error={
														(touched.courseBuyerFee &&
															errors.courseBuyerFee) ||
														""
													}
													suffix="%"
												/>
											)}
										</Field>
									</div>
									<div className={styles.form_field}>
										<Field name="gearSellerFee">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="Gear Seller Fee"
													type="number"
													placeholder="Enter a Gear Seller Fee"
													error={
														(touched.gearSellerFee &&
															errors.gearSellerFee) ||
														""
													}
													suffix="%"
												/>
											)}
										</Field>
									</div>
									<div className={styles.form_field}>
										<Field name="gearBuyerFee">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="Gear Buyer Fee"
													type="number"
													placeholder="Enter a Gear Buyer Fee"
													error={
														(touched.gearBuyerFee &&
															errors.gearBuyerFee) ||
														""
													}
													suffix="%"
												/>
											)}
										</Field>
									</div>
									<div className={styles.form_field}>
										<Field name="gearLeaseFee">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="Gear Lease Fee"
													type="number"
													placeholder="Enter a Gear Lease Fee"
													error={
														(touched.gearLeaseFee &&
															errors.gearLeaseFee) ||
														""
													}
													suffix="%"
												/>
											)}
										</Field>
									</div>
									<div className={styles.form_field}>
										<Field name="gearRenterFee">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="Gear Renter Fee"
													type="number"
													placeholder="Enter a Gear Renter Fee"
													error={
														(touched.gearRenterFee &&
															errors.gearRenterFee) ||
														""
													}
													suffix="%"
												/>
											)}
										</Field>
									</div>
									<div className={styles.form_field}>
										<Field name="courseCreatorFee">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="Course Creator Fee"
													type="number"
													placeholder="Enter a Course Creator Fee"
													error={
														(touched.courseCreatorFee &&
															errors.courseCreatorFee) ||
														""
													}
													suffix="%"
												/>
											)}
										</Field>
									</div>
									<div className={styles.form_field}>
										<Field name="studioLeaseFee">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="Studio Lease Fee"
													type="number"
													placeholder="Enter a Studio Lease Fee"
													error={
														(touched.studioLeaseFee &&
															errors.studioLeaseFee) ||
														""
													}
													suffix="%"
												/>
											)}
										</Field>
									</div>
									<div className={styles.form_field}>
										<Field name="studioRenterFee">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="Studio Renter Fee"
													type="number"
													placeholder="Enter a Studio Renter Fee"
													error={
														(touched.studioRenterFee &&
															errors.studioRenterFee) ||
														""
													}
													suffix="%"
												/>
											)}
										</Field>
									</div>
									<div className={styles.form_field}>
										<Field name="talentServiceFee">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="Talent Service Fee"
													type="number"
													placeholder="Enter a Talent Service Fee"
													error={
														(touched.talentServiceFee &&
															errors.talentServiceFee) ||
														""
													}
													suffix="%"
												/>
											)}
										</Field>
									</div>
									<div className={styles.form_field}>
										<Field name="talentEmployerFee">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="Talent Employer Fee"
													type="number"
													placeholder="Enter a Talent Employer Fee"
													error={
														(touched.talentEmployerFee &&
															errors.talentEmployerFee) ||
														""
													}
													suffix="%"
												/>
											)}
										</Field>
									</div>
									<div className={styles.form_field}>
										<Field name="withdrawalFee">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="Withdrawal Fee"
													type="number"
													placeholder="Enter a Withdrawal Fee"
													error={
														(touched.withdrawalFee &&
															errors.withdrawalFee) ||
														""
													}
													prefix="₦"
												/>
											)}
										</Field>
									</div>
									<div className={styles.form_field}>
										<Field name="withdrawalLimit">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="Withdrawal Limit"
													type="number"
													placeholder="Enter a Withdrawal Limit"
													error={
														(touched.withdrawalLimit &&
															errors.withdrawalLimit) ||
														""
													}
													prefix="₦"
												/>
											)}
										</Field>
									</div>
									<div className={styles.form_field}>
										<Field name="valueAddedTax">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="Value Added Tax"
													type="number"
													placeholder="Enter Value Added Tax"
													error={
														(touched.valueAddedTax &&
															errors.valueAddedTax) ||
														""
													}
													suffix="%"
												/>
											)}
										</Field>
									</div>
									<div className={styles.form_field}>
										<Field name="disputeResolutionFee">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="Dispute Resolution Fee"
													type="number"
													placeholder="Enter Dispute Resolution Fee"
													error={
														(touched.disputeResolutionFee &&
															errors.disputeResolutionFee) ||
														""
													}
													suffix="%"
												/>
											)}
										</Field>
									</div>
									<div className={styles.form_field}>
										<Field name="currencyConversionFee">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="Currency Conversion Fee"
													type="number"
													placeholder="Enter Currency Conversion Fee"
													error={
														(touched.currencyConversionFee &&
															errors.currencyConversionFee) ||
														""
													}
													suffix="%"
												/>
											)}
										</Field>
									</div>
									<div className={styles.form_field}>
										<Field name="lateCancellationFee">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="Late Cancellation Fee"
													type="number"
													placeholder="Enter Late Cancellation Fee"
													error={
														(touched.lateCancellationFee &&
															errors.lateCancellationFee) ||
														""
													}
													suffix="%"
												/>
											)}
										</Field>
									</div>
								</div>
								<div className={styles.submit_btn_container}>
									<Button
										buttonType="primary"
										type="submit"
										disabled={isPending}
									>
										{isPending ? "Updating..." : "Save changes"}
									</Button>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			)}
		</div>
	);
};

export default PricingView;
