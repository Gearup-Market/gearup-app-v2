import React from "react";
import styles from "./ChatBodyElement.module.scss";
import MessageReceived from "../MessageReceived/MessageReceived";
import MessageSent from "../MessageSent/MessageSent";
import { Button } from "@/shared";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAddChatMessage, useCreateChatMessage, useFetchChatMessages } from "@/app/api/hooks/messages";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { CircularProgressLoader } from "@/shared/loaders";
import { Box } from "@mui/material";
import { useChatSocket } from "@/hooks";
import { queryClient } from "@/app/api";

// Define the validation schema using Yup
const ChatMessageSchema = Yup.object().shape({
	message: Yup.string().required("Message is required")
});

const ChatBodyElement = () => {
	const searchParams = useSearchParams();
	const chatId = searchParams.get("activeChatId") ?? "";
	useChatSocket(chatId); 
	const participantId = searchParams.get("participantId");
	const listingId = searchParams.get("listingId");
	const { user } = useAuth();
	const router = useRouter();
	const pathname = usePathname();
	const { mutateAsync: createChatMessage } = useCreateChatMessage();
	const { mutateAsync: addChatMessage } = useAddChatMessage();
	const {data: chatMessages,isFetching: isPending, refetch, isLoading} = useFetchChatMessages(chatId);

	console.log(chatMessages,"chatMessages")


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

				await addChatMessage({
					senderId: user?._id as string,
					chatId: chatId ?? resp.data._id,
					message: values.message,
					attachments: []
				});

				// refetch();
				resetForm(); // Clear the form after submission
			} catch (error) {
				console.error("Failed to send message:", error);
				toast.error("Failed to send message");
			}
		}
	};

	return (
		<div className={styles.chat_body}>
			{
				isLoading ? 
				<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				height="40rem"
			>
				<CircularProgressLoader color="#ffb30f" size={30} />
			</Box>
				:
			
			<>
			<p className={styles.chat_date}>Sun, Dec 17 (Today)</p>
			<div className={styles.chat_content}>
				<div className={styles.chats}>
					{
						
							chatMessages?.data?.messages?.map((message, index) => {
								if (message.sender._id === user?._id) {
									return <MessageSent key={index} message={message.message} />;
								} else {
									return <MessageReceived key={index} message={message.message} />;
								}
							})
					
					}
				</div>
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
			</>
			}
		</div>
	);
};

export default ChatBodyElement;
