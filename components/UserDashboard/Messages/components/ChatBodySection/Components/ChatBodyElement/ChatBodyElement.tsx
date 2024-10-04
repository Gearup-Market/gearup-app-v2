import React from "react";
import styles from "./ChatBodyElement.module.scss";
import MessageReceived from "../MessageReceived/MessageReceived";
import MessageSent from "../MessageSent/MessageSent";
import { Button, InputField } from "@/shared";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAddChatMessage, useCreateChatMessage, useFetchChatMessages } from "@/app/api/hooks/messages";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { on } from "events";

// Define the validation schema using Yup
const ChatMessageSchema = Yup.object().shape({
	message: Yup.string().required("Message is required")
});

const ChatBodyElement = () => {
	const searchParams = useSearchParams();
	const chatId = searchParams.get("activeChatId") ?? "";
	const participantId = searchParams.get("participantId");
	const listingId = searchParams.get("listingId");
	const { user } = useAuth();
	const router = useRouter();
	const pathname = usePathname();
	const { mutateAsync: createChatMessage } = useCreateChatMessage();
	const { mutateAsync: addChatMessage } = useAddChatMessage();
	const {data: chatMessages, isFetching} = useFetchChatMessages(chatId);

	console.log(chatMessages, "Chat Messages");

	const handleSubmit = async (values: { message: string }, { resetForm }: any) => {
		if (user && participantId && listingId) {
			try {
				const resp = await createChatMessage({
					participants: [user?._id as string, participantId],
					listingId,
					message: values.message,
					chatId: chatId
				});

				// update the chatId in the URL if it's a new chat
				if (resp?.success && !chatId) {
					const currentParams = new URLSearchParams(searchParams.toString());
					currentParams.set("activeChatId", resp?.data?._id);
					router.push(`${pathname}?${currentParams.toString()}`);
				}

				console.log(resp, "Resp");
				const addMessageRes = await addChatMessage({
					senderId: user?._id as string,
					chatId: chatId ?? resp.data._id,
					message: values.message,
					attachments: []
				});
				console.log(addMessageRes, "Add Resp");
				resetForm(); // Clear the form after submission
			} catch (error) {
				console.error("Failed to send message:", error);
				toast.error("Failed to send message");
			}
		}
	};

	return (
		<div className={styles.chat_body}>
			<p className={styles.chat_date}>Sun, Dec 17 (Today)</p>
			<div className={styles.chat_content}>
				<div className={styles.chats}>
					<MessageReceived />
					<MessageSent />
				</div>

				{/* Formik form integration */}
				<Formik
					initialValues={{ message: "" }}
					validationSchema={ChatMessageSchema}
					onSubmit={handleSubmit}
				>
					{({ errors, touched, isSubmitting }) => (
						<Form className={styles.form_container}>
							<Field
								name="message"
								placeholder="Write a message..."
								className={`${styles.input_field}`}
								as="input"
							/>
							<Button
								buttonType="transparent"
								iconPrefix=""
								type="submit"
								disabled={isSubmitting}
							>
								<Image
									src="/svgs/submit-icon.svg"
									alt="send"
									height={24}
									width={24}
								/>
							</Button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default ChatBodyElement;
