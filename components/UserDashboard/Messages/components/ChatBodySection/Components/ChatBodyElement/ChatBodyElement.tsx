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

	const sortedMessages = chatMessages?.data?.messages?.sort((a, b) => {
		return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
	});

	const groupedMessages = sortedMessages
		? Object.entries(
				sortedMessages!.reduce((groups, message) => {
					const date = new Date(message.timestamp).toLocaleDateString();
					if (!groups[date]) {
						groups[date] = [];
					}
					groups[date].push(message);
					return groups;
				}, {} as Record<string, typeof sortedMessages>)
		  ).map(([date, messages]) => ({ date, messages }))
		: [];

	return (
		<div className={styles.chat_body}>
			{isLoading ? (
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					height="40rem"
				>
					<CircularProgressLoader color="#F76039" size={30} />
				</Box>
			) : (
				<>
					<div className={styles.chat_content} ref={chatRef}>
						<div className={styles.chats}>
							{groupedMessages?.map((messageBlock, index) => (
								<div
									key={index}
									ref={
										index === groupedMessages.length - 1
											? lastMessageRef
											: null
									}
									className={styles.chat_block}
								>
									<div className={styles.centered_text}>
										<p>{formatDate(messageBlock.date)}</p>
									</div>
									{messageBlock.messages?.map(message => {
										return message.sender._id === userId ? (
											<MessageSent
												message={message.message}
												timestamp={message.timestamp}
											/>
										) : (
											<MessageReceived
												message={message.message}
												timestamp={message.timestamp}
											/>
										);
									})}
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

const formatDate = (isoString: string): string => {
	const [day, month, year] = isoString.split("/").map(Number);
	const date = new Date(year, month - 1, day);
	const options: Intl.DateTimeFormatOptions = {
		weekday: "short",
		month: "short",
		day: "numeric"
	};
	const formattedDate = date.toLocaleDateString("en-US", options);

	const today = new Date();
	const isToday = date.toDateString() === today.toDateString();

	return isToday ? `${formattedDate} (today)` : formattedDate;
};

const mockChatData = {
	chatHistory: [
		{
			_id: "67c3c30848574a3c69eac68c",
			id: "67c3c30848574a3c69eac68c",
			sender: {
				_id: "67b50926ea077b8ce3af9ec4",
				id: "67b50926ea077b8ce3af9ec4",
				userId: "67b50926ea077b8ce3af9ec4",
				email: "francisifegwu@gmail.com",
				password: "$2b$10$xyu/aCv6jrM4Fg6BbPOIneWYS40b9QDcI.XLvPQopjv3.mMLDxdTW",
				userName: "francis",
				avatar: "",
				isVerified: true,
				rating: 0,
				createdAt: "2025-02-18T22:26:39.125Z",
				__v: 0,
				token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2I1MDkyNmVhMDc3YjhjZTNhZjllYzQiLCJpYXQiOjE3NDA4ODM2MzQsImV4cCI6MTc0MTE0MjgzNH0.AbVctFy6tnDEjLlbwNlbs5nbPiHtLyFulnF79KkMDSA",
				dedicatedAccountBank: "Wema Bank",
				dedicatedAccountBankSlug: "wema-bank",
				dedicatedAccountName: "GEARUP/IFEGWU OBASI",
				dedicatedAccountNumber: "9773749914",
				hasDedicatedAccount: true,
				paystackCustomerCode: "CUS_8ltnv4hq2uvhj50",
				hasPin: true,
				pin: 123123,
				facebook: "",
				instagram: "",
				linkedin: "",
				twitter: ""
			},
			message: "Hello",
			status: "sent",
			timestamp: "2025-03-02T02:31:36.721Z",
			attachment: []
		},
		{
			_id: "67c3c32d48574a3c69eac70a",
			id: "67c3c32d48574a3c69eac70a",
			sender: {
				_id: "67b2ed8b516ced253c10800f",
				id: "67b2ed8b516ced253c10800f",
				userId: "67b2ed8b516ced253c10800f",
				email: "revivaladolor@gmail.com",
				password: "$2b$10$T7FacLedbmobLiv2qkYPCeJR2OpNl5uz/ZcIBPcXRh3fHUWBugrUK",
				userName: "Nano",
				avatar: "",
				isVerified: true,
				rating: 0,
				createdAt: "2025-02-17T08:01:04.944Z",
				__v: 0,
				token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2IyZWQ4YjUxNmNlZDI1M2MxMDgwMGYiLCJpYXQiOjE3NDA4ODM1OTIsImV4cCI6MTc0MTE0Mjc5Mn0.nu9qPbIul8WOH9Rqo-_5jyIxqfQs_1m8EWTDxzNnfgY",
				dedicatedAccountBank: "Wema Bank",
				dedicatedAccountBankSlug: "wema-bank",
				dedicatedAccountName: "GEARUP/ADOLOR REVIVAL",
				dedicatedAccountNumber: "9773700614",
				hasDedicatedAccount: true,
				paystackCustomerCode: "CUS_ncklepn1pkpjd8g",
				hasPin: true,
				pin: 987654,
				about: "I'm a very good merchant that is here to make as much money as possible",
				address: "",
				firstName: "",
				lastName: "",
				phoneNumber: "08140692874"
			},
			message: "Hi",
			status: "sent",
			timestamp: "2025-03-02T02:32:13.497Z",
			attachment: []
		},
		{
			_id: "67c3c30848574a3c69eac68d",
			id: "67c3c30848574a3c69eac68d",
			sender: {
				_id: "67b2ed8b516ced253c10800f",
				id: "67b2ed8b516ced253c10800f",
				userId: "67b2ed8b516ced253c10800f",
				email: "john.doe@example.com",
				password: "hashed_password_1",
				userName: "John Doe",
				avatar: "",
				isVerified: true,
				rating: 5,
				createdAt: "2025-03-01T10:00:00.000Z",
				__v: 0,
				token: "token_1",
				dedicatedAccountBank: "Bank A",
				dedicatedAccountBankSlug: "bank-a",
				dedicatedAccountName: "John's Account",
				dedicatedAccountNumber: "1234567890",
				hasDedicatedAccount: true,
				paystackCustomerCode: "CUS_1",
				hasPin: true,
				pin: 111111,
				facebook: "",
				instagram: "",
				linkedin: "",
				twitter: ""
			},
			message: "Are we still on for the meeting?",
			status: "sent",
			timestamp: "2025-03-01T12:00:00.000Z",
			attachment: []
		},
		{
			_id: "67c3c30848574a3c69eac68e",
			id: "67c3c30848574a3c69eac68e",
			sender: {
				_id: "67b2ed8b516ced253c10800f",
				id: "67b2ed8b516ced253c10800f",
				userId: "67b2ed8b516ced253c10800f",
				email: "jane.smith@example.com",
				password: "hashed_password_2",
				userName: "Jane Smith",
				avatar: "",
				isVerified: true,
				rating: 4,
				createdAt: "2025-03-01T10:00:00.000Z",
				__v: 0,
				token: "token_2",
				dedicatedAccountBank: "Bank B",
				dedicatedAccountBankSlug: "bank-b",
				dedicatedAccountName: "Jane's Account",
				dedicatedAccountNumber: "0987654321",
				hasDedicatedAccount: true,
				paystackCustomerCode: "CUS_2",
				hasPin: true,
				pin: 222222,
				facebook: "",
				instagram: "",
				linkedin: "",
				twitter: ""
			},
			message: "Yes, I will be there.",
			status: "sent",
			timestamp: "2025-03-01T12:05:00.000Z",
			attachment: []
		},
		{
			_id: "67c3c30848574a3c69eac68f",
			id: "67c3c30848574a3c69eac68f",
			sender: {
				_id: "67b50926ea077b8ce3af9ec4",
				id: "67b50926ea077b8ce3af9ec4",
				userId: "67b50926ea077b8ce3af9ec4",
				email: "alice.johnson@example.com",
				password: "hashed_password_3",
				userName: "Alice Johnson",
				avatar: "",
				isVerified: true,
				rating: 5,
				createdAt: "2025-03-02T10:00:00.000Z",
				__v: 0,
				token: "token_3",
				dedicatedAccountBank: "Bank C",
				dedicatedAccountBankSlug: "bank-c",
				dedicatedAccountName: "Alice's Account",
				dedicatedAccountNumber: "1122334455",
				hasDedicatedAccount: true,
				paystackCustomerCode: "CUS_3",
				hasPin: true,
				pin: 333333,
				facebook: "",
				instagram: "",
				linkedin: "",
				twitter: ""
			},
			message: "Looking forward to it!",
			status: "sent",
			timestamp: "2025-03-02T10:10:00.000Z",
			attachment: []
		},
		{
			_id: "67c3c30848574a3c69eac690",
			id: "67c3c30848574a3c69eac690",
			sender: {
				_id: "67b50926ea077b8ce3af9ec4",
				id: "67b50926ea077b8ce3af9ec4",
				userId: "67b50926ea077b8ce3af9ec4",
				email: "bob.williams@example.com",
				password: "hashed_password_4",
				userName: "Bob Williams",
				avatar: "",
				isVerified: true,
				rating: 3,
				createdAt: "2025-03-02T10:00:00.000Z",
				__v: 0,
				token: "token_4",
				dedicatedAccountBank: "Bank D",
				dedicatedAccountBankSlug: "bank-d",
				dedicatedAccountName: "Bob's Account",
				dedicatedAccountNumber: "5566778899",
				hasDedicatedAccount: true,
				paystackCustomerCode: "CUS_4",
				hasPin: true,
				pin: 444444,
				facebook: "",
				instagram: "",
				linkedin: "",
				twitter: ""
			},
			message: "Can we reschedule?",
			status: "sent",
			timestamp: "2025-03-02T10:15:00.000Z",
			attachment: []
		},
		{
			_id: "67c3c30848574a3c69eac691",
			id: "67c3c30848574a3c69eac691",
			sender: {
				_id: "67b50926ea077b8ce3af9ec4",
				id: "67b50926ea077b8ce3af9ec4",
				userId: "67b50926ea077b8ce3af9ec4",
				email: "charlie.brown@example.com",
				password: "hashed_password_5",
				userName: "Charlie Brown",
				avatar: "",
				isVerified: true,
				rating: 2,
				createdAt: "2025-03-03T10:00:00.000Z",
				__v: 0,
				token: "token_5",
				dedicatedAccountBank: "Bank E",
				dedicatedAccountBankSlug: "bank-e",
				dedicatedAccountName: "Charlie's Account",
				dedicatedAccountNumber: "9988776655",
				hasDedicatedAccount: true,
				paystackCustomerCode: "CUS_5",
				hasPin: true,
				pin: 555555,
				facebook: "",
				instagram: "",
				linkedin: "",
				twitter: ""
			},
			message: "I can't make it today.",
			status: "sent",
			timestamp: "2025-03-03T10:20:00.000Z",
			attachment: []
		},
		{
			_id: "67c3c30848574a3c69eac692",
			id: "67c3c30848574a3c69eac692",
			sender: {
				_id: "67b50926ea077b8ce3af9ec4",
				id: "67b50926ea077b8ce3af9ec4",
				userId: "67b50926ea077b8ce3af9ec4",
				email: "david.jones@example.com",
				password: "hashed_password_6",
				userName: "David Jones",
				avatar: "",
				isVerified: true,
				rating: 1,
				createdAt: "2025-03-04T10:00:00.000Z",
				__v: 0,
				token: "token_6",
				dedicatedAccountBank: "Bank F",
				dedicatedAccountBankSlug: "bank-f",
				dedicatedAccountName: "David's Account",
				dedicatedAccountNumber: "2233445566",
				hasDedicatedAccount: true,
				paystackCustomerCode: "CUS_6",
				hasPin: true,
				pin: 666666,
				facebook: "",
				instagram: "",
				linkedin: "",
				twitter: ""
			},
			message: "Let's catch up later.",
			status: "sent",
			timestamp: "2025-03-04T10:25:00.000Z",
			attachment: []
		},
		{
			_id: "67c3c30848574a3c69eac693",
			id: "67c3c30848574a3c69eac693",
			sender: {
				_id: "67b2ed8b516ced253c10800f",
				id: "67b2ed8b516ced253c10800f",
				userId: "67b2ed8b516ced253c10800f",
				email: "emily.clark@example.com",
				password: "hashed_password_7",
				userName: "Emily Clark",
				avatar: "",
				isVerified: true,
				rating: 0,
				createdAt: "2025-03-04T10:30:00.000Z",
				__v: 0,
				token: "token_7",
				dedicatedAccountBank: "Bank G",
				dedicatedAccountBankSlug: "bank-g",
				dedicatedAccountName: "Emily's Account",
				dedicatedAccountNumber: "3344556677",
				hasDedicatedAccount: true,
				paystackCustomerCode: "CUS_7",
				hasPin: true,
				pin: 777777,
				facebook: "",
				instagram: "",
				linkedin: "",
				twitter: ""
			},
			message: "See you soon!",
			status: "sent",
			timestamp: "2025-03-04T10:35:00.000Z",
			attachment: []
		}
	]
};
