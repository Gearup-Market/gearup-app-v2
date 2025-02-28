import React from "react";
import Modal from "@/shared/modals/modal/Modal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button, InputField } from "@/shared";
import toast from "react-hot-toast";
import { useAppSelector } from "@/store/configureStore";
import * as Yup from "yup";
import { useConfirmTransactionPin } from "@/app/api/hooks/settings";
import { useRouter } from "next/navigation";
import styles from "./ConfirmPin.module.scss";

interface PinFormValues {
	accountPin: string;
}

interface Props {
	openModal: boolean;
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
	onSuccess: (e?: any) => void;
	disabled?: boolean;
}
const ConfirmPin = ({ openModal, setOpenModal, onSuccess, disabled }: Props) => {
	const user = useAppSelector(state => state.user);
	const { mutateAsync: confirmPin, isPending } = useConfirmTransactionPin();
	const router = useRouter();

	const initialValues: PinFormValues = {
		accountPin: ""
	};

	const validationSchema = Yup.object().shape({
		accountPin: Yup.string()
			.required("Please enter transaction pin to continue")
			.matches(/^\d{6}$/, "Pin must be exactly 6 digits")
	});

	const handleSubmit = async (
		values: PinFormValues,
		{ resetForm }: { resetForm: () => void }
	) => {
		try {
			await confirmPin({
				userId: user._id as string,
				pin: parseInt(values.accountPin)
			});
			await onSuccess();
			resetForm();
			onClose();
		} catch (error: any) {
			toast.error(
				error?.response?.data?.message ??
					"Could not confirm transaction pin, try again later!!!"
			);
		}
	};

	const onClose = () => {
		setOpenModal(false);
	};

	return (
		<Modal title="Transaction pin" openModal={openModal} setOpenModal={onClose}>
			<div className={styles.container}>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{({ isSubmitting }) => (
						<Form>
							<div className={styles.container__form_container}>
								<div className={styles.form_field}>
									<Field
										name="accountPin"
										as={InputField}
										placeholder="Enter transaction pin "
										isPassword
										type="number"
									/>
									<ErrorMessage
										name="accountPin"
										component="div"
										className={styles.error_message}
									/>
								</div>

								<div className={styles.submit_btn_container}>
									<Button
										buttonType="primary"
										type="submit"
										disabled={isSubmitting || disabled}
									>
										{isPending ? "Processing..." : "Proceed"}
									</Button>
								</div>

								<div className={styles.forgot_pin_container}>
									<p>
										Forgot pin?{" "}
										<span
											className={styles.contact_support}
											onClick={() =>
												router.push("/user/settings?q=account")
											}
										>
											Reset Pin
										</span>
									</p>
								</div>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</Modal>
	);
};

export default ConfirmPin;
