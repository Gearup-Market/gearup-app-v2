import React, { forwardRef, useImperativeHandle, useMemo, useRef, useState } from "react";
import styles from "./IdVerification.module.scss";
import HeaderSubText from "@/components/Admin/HeaderSubText/HeaderSubText";
import { InputField, Select } from "@/shared";
import { Formik, Form, FormikProps, Field, FieldProps } from "formik";
import * as Yup from "yup";
import { LogoutNavIcon } from "@/shared/svgs/dashboard";
import { UploadDetails } from "./components";
import { iPostSubmitKycReq } from "@/app/api/hooks/users/types";
import { usePostSubmitKycDoc } from "@/app/api/hooks/users";
import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import { updateVerification } from "@/store/slices/verificationSlice";
import toast from "react-hot-toast";
import { Option, SelectOption } from "@/shared/selects/select/Select";
import { useUploadFiles } from "@/app/api/hooks/listings";
import { isEmpty } from "@/utils";

export type DocumentIdentityFormValues = Omit<iPostSubmitKycReq, "userId">;

export interface IdentificationDocumentHandle {
	submitForm: () => void;
}

interface IdentificationDocumentProps {
	onSubmitSuccess: () => void;
}

const IdVerification = forwardRef<
	IdentificationDocumentHandle,
	IdentificationDocumentProps
>(({ onSubmitSuccess }, ref) => {
	const formRef = useRef<FormikProps<DocumentIdentityFormValues>>(null);
	const [displayedImages, setDisplayedImages] = useState<File[]>([]);
	const verificationState = useAppSelector(s => s.verification);
	const dispatch = useAppDispatch();
	const { mutateAsync: postUploadFile, isPending } = useUploadFiles();

	useImperativeHandle(ref, () => ({
		submitForm: () => {
			if (formRef.current) {
				formRef.current.submitForm();
			}
		}
	}));

	const validationSchema = Yup.object().shape({
		documentNo: Yup.string().required("Identity number is required"),
		documentType: Yup.string().required("Please select a document type")
	});

	const handleFormChange = (name: string, value: any) => {
		if (!name && !value) return;
		dispatch(
			updateVerification({
				[name]: value
			})
		);
	};

	const identificationOptions: Option[] = [
		{ label: "International Passport", value: "intl_passport" },
		{ label: "Driver’s License", value: "driver_license" },
		{ label: "Voter’s Card", value: "voters_card" },
		{ label: "National ID / NIN Slip", value: "national_id" }
	];

	const defaultOption = useMemo(
		() =>
			(identificationOptions || []).find(
				(option: Option) => option.value === verificationState.documentType
			)?.label,
		[verificationState.documentType]
	);

	const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files && files.length > 0) {
			const validFiles = Array.from(files).filter(file => file instanceof File);
			if (validFiles.length > 0) {
				const localArr = [...displayedImages, ...validFiles];
				setDisplayedImages(localArr);
			} else {
				toast.error("No valid File objects were selected");
			}
		} else {
			toast.error("No files selected");
		}
	};

	const removeExistingImage = (name: string) => {
		const images = [...displayedImages.filter(x => x.name !== name)];
		setDisplayedImages(images);
	};

	const initialValues: DocumentIdentityFormValues = {
		documentNo: verificationState.documentNo || "",
		documentType: verificationState.documentType || "intl_passport"
	};

	const handleSubmit = async (values: DocumentIdentityFormValues) => {
		// Handle form submission
		dispatch(updateVerification(values));

		try {
			dispatch(
				updateVerification({
					isLoading: true
				})
			);
			if (isEmpty(values.documentNo) || isEmpty(values.documentType)) {
				toast.error("Oops! All fields are required");
			} else if (displayedImages && displayedImages.length > 0) {
				const imgUploadRes = await postUploadFile(displayedImages);
				const documentPhoto = imgUploadRes?.imageUrls;

				if (documentPhoto.length > 0) {
					// const res = await postSubmitDoc({ ...payload, documentPhoto });
					// if (res?.data) {
					// }
					dispatch(
						updateVerification({
							...values,
							documentPhoto
						})
					);
					onSubmitSuccess();
				}
			} else {
				toast.error("Please upload the document image");
			}
		} catch (error: any) {
			toast.error(error.response.data.message);
		} finally {
			dispatch(
				updateVerification({
					isLoading: false
				})
			);
		}
	};

	return (
		<div className={styles.container}>
			<HeaderSubText
				title="ID verification"
				description="Please provide a valid means of identification"
			/>
			<div className={styles.container__form_container}>
				<Formik
					innerRef={formRef}
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{({ errors, touched, isSubmitting }) => (
						<Form>
							<div className={styles.container__form_container__form}>
								<div className={styles.field}>
									<Field name="documentNo">
										{({ field }: FieldProps) => (
											<InputField
												{...field}
												label="Identification number"
												placeholder="Enter identification number"
												className={styles.input}
												onChange={e => {
													handleFormChange(
														field.name,
														e.target.value
													);
													field.onChange(e);
												}}
												error={
													(touched.documentNo &&
														errors.documentNo) ||
													""
												}
											/>
										)}
									</Field>
								</div>
								<div className={styles.field}>
									<Field name="documentType">
										{({ field }: FieldProps) => (
											<Select
												{...field}
												label="Document type"
												options={identificationOptions}
												defaultOption={defaultOption}
												onOptionChange={option => {
													handleFormChange(field.name, option);
													field.onChange({
														target: {
															name: field.name,
															value: option
														}
													});
												}}
												error={
													(touched.documentType &&
														errors.documentType) ||
													""
												}
											/>
										)}
									</Field>

									{/* <Select
										label="Identification"
										options={identificationOptions}
									/> */}
								</div>
								<div className={styles.upload_box}>
									<span className={styles.rotate_icon}>
										<LogoutNavIcon color="#7B8086" />
									</span>
									<input
										type="file"
										className={styles.file_input}
										onChange={handleIconChange}
										accept="image/*"
										// required
									/>
									<p className={styles.drop_document_text}>
										Drop your documents here, or{" "}
										<span className={styles.click_to_upload}>
											click to upload
										</span>
									</p>
								</div>
							</div>
							<div className={styles.documents_container}>
								{displayedImages.map((item, index) => (
									<div key={index}>
										<UploadDetails
											item={item}
											removeExistingImage={removeExistingImage}
										/>
									</div>
								))}
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
});

IdVerification.displayName = "IdVerification";

export default IdVerification;
