"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./FaceMatch.module.scss";
import Modal from "@/shared/modals/modal/Modal";
import { Button } from "@/shared";
import { CautionIcon } from "@/shared/svgs/dashboard";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import { usePostSubmitKycDoc } from "@/app/api/hooks/users";
import { useUploadFiles } from "@/app/api/hooks/listings";
import { updateVerification } from "@/store/slices/verificationSlice";
import { isEmpty } from "lodash";
import toast from "react-hot-toast";
import { iPostSubmitKycReq } from "@/app/api/hooks/users/types";
import { useRouter } from "next/navigation";

const FaceMatch = () => {
	const [openModal, setOpenModal] = useState(true);
	const [cameraActive, setCameraActive] = useState(false);
	const [stream, setStream] = useState<MediaStream | null>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [capturedImage, setCapturedImage] = useState("");
	const router = useRouter();

	const verificationState = useAppSelector(s => s.verification);
	const user = useAppSelector(s => s.user);
	const dispatch = useAppDispatch();
	const { mutateAsync: postSubmitDoc, isPending } = usePostSubmitKycDoc();
	// const { mutateAsync: postUploadFile, isPending: uploadingImgs } = useUploadFiles();

	const startCamera = async () => {
		setCameraActive(true);
	};

	useEffect(() => {
		const startCamera = async () => {
			try {
				const mediaStream = await navigator.mediaDevices.getUserMedia({
					video: true
				});
				setStream(mediaStream);
				if (videoRef.current) {
					videoRef.current.srcObject = mediaStream;
				}
			} catch (error) {
				console.error("Error accessing the camera:", error);
			}
		};

		if (cameraActive) {
			startCamera();
		}

		return () => {
			stream?.getTracks().forEach(track => track.stop());
		};
	}, [cameraActive]);

	const stopCamera = () => {
		stream?.getTracks().forEach(track => track.stop());
		setCameraActive(false);
	};

	const captureImage = () => {
		if (canvasRef.current && videoRef.current) {
			const canvas = canvasRef.current;
			const video = videoRef.current;

			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;

			const context = canvas.getContext("2d");

			if (context) {
				context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
				const _capturedImage = canvas.toDataURL("image/png");
				setCapturedImage(_capturedImage);
				stopCamera();
				// setOpenModal(false);
			}
		}
	};

	const handleSubmit = async () => {
		try {
			dispatch(
				updateVerification({
					isLoading: true
				})
			);
			if (!isEmpty(capturedImage)) {
				const blob = await (await fetch(capturedImage)).blob();

				// Create a File object from Blob
				// const file = new File(
				// 	[blob],
				// 	`${verificationState.firstName}-${verificationState.lastName}-selfie.png`,
				// 	{
				// 		type: "image/png"
				// 	}
				// );

				// const imgUploadRes = await postUploadFile([file]);
				// const selfie = imgUploadRes?.imageUrls[0];
				const selfie = capturedImage.split("base64,")[1];

				const payload = {
					userId: user.userId,
					documentNo: verificationState.documentNo,
					documentType: verificationState.documentType,
					documentPhoto: verificationState.documentPhoto,
					...(verificationState.isRejected ? { hasResubmitted: true } : null)
				} as iPostSubmitKycReq;

				// if (selfie) {
				const res = await postSubmitDoc({ ...payload, selfie });
				if (res?.data) {
					dispatch(updateVerification(res?.data));
				}
				router.replace("user/dashboard");
				// }
			} else {
				toast.error("Please re-capture image");
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
		<Modal title="Verify with a selfie" openModal={openModal} setOpenModal={() => {}}>
			<div className={styles.container}>
				{cameraActive ? (
					<div className={styles.video_container}>
						<video
							ref={videoRef}
							autoPlay
							playsInline
							className={styles.video}
						></video>
					</div>
				) : (
					<div className={styles.image_container}>
						<Image
							src={
								capturedImage ||
								"https://images.unsplash.com/photo-1507081323647-4d250478b919?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2Zlc3Npb25hbCUyMHBob3RvfGVufDB8fDB8fHww"
							}
							alt="face-match"
							fill
							objectFit="cover"
						/>
					</div>
				)}
				<canvas ref={canvasRef} className={styles.canvas} hidden></canvas>
				<div className={styles.btn_text_container}>
					<div className={styles.caution_container}>
						<span className={styles.icon}>
							<CautionIcon />
						</span>
						Please make sure the picture is clear because if it isn’t, it can
						affect your verification
					</div>
					{!cameraActive ? (
						<Button
							onClick={startCamera}
							buttonType="primary"
							className={styles.button}
						>
							{capturedImage ? "Retake" : "Start Camera"}
						</Button>
					) : (
						<Button
							onClick={captureImage}
							buttonType="primary"
							className={styles.button}
						>
							Capture
						</Button>
					)}

					{capturedImage && (
						<Button
							onClick={handleSubmit}
							buttonType="secondary"
							className={styles.button}
							disabled={isPending}
						>
							Submit
						</Button>
					)}
				</div>
			</div>
		</Modal>
	);
};

export default FaceMatch;
