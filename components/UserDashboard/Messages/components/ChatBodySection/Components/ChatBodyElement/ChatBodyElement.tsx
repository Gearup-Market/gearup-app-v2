import React, { useEffect, useRef } from "react";
import styles from "./ChatBodyElement.module.scss";
import MessageReceived from "../MessageReceived/MessageReceived";
import MessageSent from "../MessageSent/MessageSent";
import { Button } from "@/shared";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
	useAddChatMessage,
	useCreateChatMessage,
	useFetchChatMessages
} from "@/app/api/hooks/messages";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { CircularProgressLoader } from "@/shared/loaders";
import { Box } from "@mui/material";
import { useChatSocket } from "@/hooks";
import { useAppSelector } from "@/store/configureStore";

// Define the validation schema using Yup
const ChatMessageSchema = Yup.object().shape({
	message: Yup.string().required("Message is required")
});

interface Props {
	data?: any;
	listing?: any;
}

const ChatBodyElement = () => {
	const chatRef = useRef<HTMLDivElement>(null); // To track the chat container
	const lastMessageRef = useRef<HTMLDivElement>(null); // To track the last message
	const searchParams = useSearchParams();
	const chatId = searchParams.get("activeChatId") ?? "";
	useChatSocket(chatId);
	const participantId = searchParams.get("participantId");
	const listingId = searchParams.get("listingId");
	const router = useRouter();
	const pathname = usePathname();
	const { mutateAsync: createChatMessage } = useCreateChatMessage();
	const { mutateAsync: addChatMessage } = useAddChatMessage();
	const {
		data: chatMessages,
		isFetching: isPending,
		refetch,
		isLoading
	} = useFetchChatMessages(chatId);
	const { userId } = useAppSelector(state => state.user);

	const handleSubmit = async (values: { message: string }, { resetForm }: any) => {
		if (userId && participantId && listingId) {
			try {
				let newChatId = "";
				// update the chatId in the URL if it's a new chat
				if (!chatId) {
					const resp = await createChatMessage({
						participants: [userId as string, participantId],
						listingId
					});
					const currentParams = new URLSearchParams(searchParams.toString());
					currentParams.set("activeChatId", resp?.data?._id);
					router.push(`${pathname}?${currentParams.toString()}`);
					newChatId = resp?.data?._id;
				}

				await addChatMessage({
					senderId: userId as string,
					chatId: chatId || newChatId,
					message: values.message,
					attachments: []
				});
				resetForm();
				refetch();
			} catch (error) {
				toast.error("Failed to send message");
			}
		}
	};

	// Scroll to the last message whenever chatMessages change
	useEffect(() => {
		if (lastMessageRef.current) {
			lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [chatMessages, chatId]);

	return (
		<div className={styles.chat_body}>
			{isLoading ? (
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					height="40rem"
				>
					<CircularProgressLoader color="#ffb30f" size={30} />
				</Box>
			) : (
				<>
					<div className={styles.chat_content} ref={chatRef}>
						<div className={styles.chats}>
							{chatMessages?.data?.messages?.map((message, index) => (
								<div
									key={index}
									ref={
										index === chatMessages?.data?.messages.length - 1
											? lastMessageRef
											: null
									}
								>
									{message.sender._id === userId ? (
										<MessageSent message={message.message} />
									) : (
										<MessageReceived message={message.message} />
									)}
								</div>
							))}
						</div>

						<Formik
							initialValues={{ message: "" }}
							validationSchema={ChatMessageSchema}
							onSubmit={handleSubmit}
						>
							{({ isSubmitting }) => (
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
			)}
		</div>
	);
};

export default ChatBodyElement;
