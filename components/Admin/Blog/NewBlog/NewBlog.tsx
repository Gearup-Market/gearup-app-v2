"use client";
import React, { useState, useRef } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import styles from "./NewBlog.module.scss";
import {
	Button,
	CustomTextEditor,
	InputField,
	LoadingSpinner,
	Select,
	UrlPath
} from "@/shared";
import * as Yup from "yup";
import { GridAddIcon } from "@mui/x-data-grid";
import { AddCategory } from "../components/BlogsCategories/components";
import Image from "next/image";
import toast from "react-hot-toast";
import {
	useGetAllCategories,
	useGetArticleById,
	usePostCreateBlog,
	usePostUpdateBlog
} from "@/app/api/hooks/blogs";
import { useUploadFiles } from "@/app/api/hooks/listings";
import { useAppSelector } from "@/store/configureStore";
import { useRouter, useSearchParams } from "next/navigation";
// import { base64ToBlob, base64ToFile } from "@/utils";

interface NewBlogFormValues {
	title?: string;
	content?: string;
	category?: string;
	readMinutes?: number;
	status?: string;
}

const NewBlog = () => {
	const editingMode = useSearchParams().get("edit_mode");
	const articleId = useSearchParams().get("blog_id");
	const [showAddCategory, setShowAddCategory] = useState(false);
	const inputUploadRef = useRef<HTMLInputElement>(null);
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [category, setCategory] = useState("");
	const { mutateAsync: createBlogPost, isPending: uploadingBlogPost } =
		usePostCreateBlog();
	const { mutateAsync: updateBlogPost, isPending: updatingBlogPost } =
		usePostUpdateBlog();
	const { mutateAsync: uploadImg, isPending: uploadingImg } = useUploadFiles();
	const user = useAppSelector(state => state.user);
	const [isDraft, setIsDraft] = useState(false);
	const { data, isLoading } = useGetArticleById(articleId as string);
	const { data: categories, refetch } = useGetAllCategories();
	const blogsCategories = categories?.data.map(item => item.name) || [];
	const [imageSrc, setImageSrc] = useState<string>(data?.bannerImage ?? "");
	const router = useRouter();

	const initialValues: NewBlogFormValues = {
		title: !!editingMode ? data?.title : "",
		content: !!editingMode ? data?.content.text : "",
		category: !!editingMode ? data?.category.name : "",
		readMinutes: !!editingMode ? data?.readMinutes : 0,
		status: !!editingMode ? data?.status : "available"
	};

	const validationSchema = Yup.object().shape({
		title: Yup.string().required("Blog title is required"),
		content: Yup.string().required("Blog content is required"),
		category: Yup.string().required("Blog category is required"),
		readMinutes: Yup.string().required("Read time is required")
	});

	const handleUpdateSubmit = async (
		values: NewBlogFormValues,
		{ resetForm }: any,
		isDraft: boolean
	) => {
		// Check if both selectedImage and imageSrc are missing
		if (!selectedImage && !imageSrc) {
			toast.error("Please upload an image");
			return;
		}

		// Parse blog content, handling embedded image uploads
		const parsedContent = await handleBlogContentImageUpload(
			values?.content as string
		);
		const status = isDraft ? "unavailable" : "available";

		// Get the category ID for the blog post
		const categoryId = getCategoryIndex(values?.category as string);
		if (!categoryId) {
			toast.error("Category does not exist");
			return;
		}

		// If selectedImage is a File, proceed with image upload
		if (selectedImage instanceof File) {
			await uploadImg([selectedImage], {
				onSuccess: async res => {
					const image = res.imageUrls[0];
					// Proceed with blog post update after successful image upload
					await updateBlogPost(
						{
							...values,
							bannerImage: image, // Use uploaded image
							user: user.userId,
							status,
							_id: articleId as string,
							category: categoryId,
							content: { text: parsedContent as string }
						},
						{
							onSuccess: () => {
								toast.success("Blog post updated successfully");
								setSelectedImage(null);
								resetForm();
								router.push("/admin/blog");
							},
							onError: () => {
								toast.error("Error updating blog post");
							}
						}
					);
				},
				onError: () => {
					toast.error("Error uploading image");
				}
			});
		} else {
			// If no new image (File), directly update the blog post with the existing imageSrc
			await updateBlogPost(
				{
					...values,
					bannerImage: imageSrc, // Use existing imageSrc
					user: user.userId,
					_id: articleId as string,
					category: categoryId,
					content: { text: parsedContent as string }
				},
				{
					onSuccess: () => {
						toast.success("Blog post updated successfully");
						resetForm();
						router.push("/admin/blog");
					},
					onError: () => {
						toast.error("Error updating blog post");
					}
				}
			);
		}
	};

	const handleSubmit = async (
		values: NewBlogFormValues,
		{ resetForm }: any,
		isDraft: boolean
	) => {
		if (!selectedImage) {
			toast.error("Please upload an image");
			return;
		}

		const parsedContent = await handleBlogContentImageUpload(
			values?.content as string
		);
		const status = isDraft ? "unavailable" : "available";
		const categoryId = getCategoryIndex(values?.category as string);

		if (!categoryId) {
			toast.error("Category does not exist");
			return;
		}

		await uploadImg([selectedImage], {
			onSuccess: async res => {
				const image = res.imageUrls[0];
				await createBlogPost(
					{
						...values,
						bannerImage: image,
						user: user.userId,
						status, // Set status based on save action
						category: categoryId,
						content: { text: parsedContent }
					},
					{
						onSuccess: () => {
							toast.success(
								isDraft
									? "Draft saved successfully"
									: "Blog post created successfully"
							);
							setSelectedImage(null);
							resetForm();
							router.push("/admin/blog");
						},
						onError: () => {
							toast.error("Error creating blog post");
						}
					}
				);
			},
			onError: () => {
				toast.error("Error uploading image");
			}
		});
	};

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files && event.target.files[0];
		if (file) {
			setSelectedImage(file);
			setImageSrc(URL.createObjectURL(file));
		}
	};

	const openUploadDialog = () => {
		inputUploadRef.current?.click();
	};

	const defaultOptionIndex = categories?.data.findIndex(
		option => option._id === data?.category._id
	);

	// for uploading blog content images
	const handleBlogContentImageUpload = async (content: string): Promise<string> => {
		const parser = new DOMParser();
		const doc = parser.parseFromString(content, "text/html");
		const imgElements = Array.from(doc.querySelectorAll("img")) as HTMLImageElement[];

		for (let img of imgElements) {
			const base64Image = img.getAttribute("src");
			if (base64Image && base64Image.startsWith("data:image/")) {
				const uniqueId = base64Image.substring(0, 10).replace(/\W/g, "");
				const fileName = `image_${uniqueId}_${Date.now()}.jpg`;

				const imageFile = base64ToFile(base64Image, fileName) as File;
				await uploadImg([imageFile], {
					onSuccess: res => {
						img.setAttribute("src", res.imageUrls[0]);
					},
					onError: () => {
						toast.error("Error uploading image");
					}
				});
			}
		}
		return doc.body.innerHTML;
	};

	const getCategoryIndex = (category: string) => {
		const cat = categories?.data.find(
			item => item?.name?.toLowerCase() === category.toLowerCase()
		);
		return cat?._id;
	};

	return (
		<div className={styles.section}>
			<div className={styles.title_container}>
				<UrlPath />
			</div>
			<div className={styles.container}>
				<div className={styles.container__form_container}>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={(values, { resetForm }) => {
							if (!editingMode) {
								handleSubmit(values, { resetForm }, false);
							} else {
								handleUpdateSubmit(values, { resetForm }, false);
							}
						}}
						enableReinitialize
					>
						{({ errors, touched, setFieldValue, values, resetForm }) => (
							<Form>
								<h2 className={styles.banner_title}>Banner Image</h2>
								<div className={styles.image_container}>
									<input
										id="fileInput"
										type="file"
										accept="image/*"
										ref={inputUploadRef}
										style={{ display: "none" }}
										onChange={handleImageChange}
									/>
									{selectedImage || data?.bannerImage ? (
										<div className={styles.image_wrapper}>
											<Image
												src={
													!!selectedImage
														? imageSrc
														: data?.bannerImage ?? ""
												}
												alt="image"
												fill
												className={styles.image}
											/>
										</div>
									) : (
										<div className={styles.image_placeholder}>
											<Image
												src="/svgs/icon-image.svg"
												height={30}
												width={30}
												alt="image-icon"
												onClick={openUploadDialog}
												style={{ cursor: "pointer" }}
											/>
											<p>
												Drop your image here, or{" "}
												<label
													onClick={openUploadDialog}
													className={
														styles.click_to_upload_text
													}
												>
													click to upload
												</label>
											</p>
										</div>
									)}
								</div>
								{(!!selectedImage || data?.bannerImage) && (
									<Button
										onClick={openUploadDialog}
										buttonType="secondary"
									>
										Change image
									</Button>
								)}

								<div className={styles.container__form_container__form}>
									<div className={styles.form_field}>
										<Field name="title">
											{({ field }: any) => (
												<InputField
													label="Title"
													placeholder="Enter title"
													{...field}
												/>
											)}
										</Field>
										<ErrorMessage
											name="title"
											component="div"
											className={styles.error_text}
										/>
									</div>

									<div className={styles.address_field}>
										<Field as="select" name="category">
											{({ field }: any) => (
												<Select
													label="Category"
													options={blogsCategories}
													defaultOptionIndex={
														defaultOptionIndex
													}
													defaultOption={
														data?.category.name || ""
													}
													{...field}
													onOptionChange={value => {
														setFieldValue("category", value);
													}}
												/>
											)}
										</Field>
										<ErrorMessage
											name="category"
											component="div"
											className={styles.error_text}
										/>
										<p
											className={styles.create_category_text}
											onClick={() => setShowAddCategory(true)}
										>
											<GridAddIcon /> Create new category
										</p>
									</div>

									<div className={styles.address_field}>
										<Field name="readMinutes">
											{({ field }: any) => (
												<InputField
													type="number"
													label="Read minutes"
													placeholder="Enter read minutes"
													{...field}
												/>
											)}
										</Field>
										<ErrorMessage
											name="readMinutes"
											component="div"
											className={styles.error_text}
										/>
									</div>

									<div className={styles.address_field}>
										<CustomTextEditor
											label="Content"
											value={values.content ?? ""}
											setValue={value =>
												setFieldValue("content", value)
											}
											placeholder="type to create content"
										/>
										<ErrorMessage
											name="content"
											component="div"
											className={styles.error_text}
										/>
									</div>
								</div>

								<div className={styles.submit_btn_container}>
									{!editingMode && (
										<Button
											buttonType="secondary"
											type="button"
											onClick={() => {
												setIsDraft(true);
												handleSubmit(values, { resetForm }, true);
											}}
											className={styles.upload_btn}
										>
											{(uploadingBlogPost || uploadingImg) &&
											isDraft ? (
												<LoadingSpinner size="small" />
											) : (
												"Save draft"
											)}
										</Button>
									)}
									<Button
										buttonType="primary"
										type="submit"
										className={styles.upload_btn}
									>
										{(uploadingBlogPost || uploadingImg) &&
										!isDraft ? (
											<LoadingSpinner size="small" />
										) : !!editingMode ? (
											"Update post"
										) : (
											"Create post"
										)}
									</Button>
								</div>
							</Form>
						)}
					</Formik>
				</div>
				<AddCategory
					refetch={refetch}
					openModal={showAddCategory}
					setOpenModal={setShowAddCategory}
					category={category}
					setCategory={setCategory}
				/>
			</div>
		</div>
	);
};

export default NewBlog;

function base64ToFile(base64Image: string, fileName: string) {
	// Split the base64 string into data and contentType
	const [base64Header, base64Data] = base64Image.split(",");
	const mimeMatch = base64Header.match(/:(.*?);/);
	const mimeType = mimeMatch ? mimeMatch[1] : "image/jpeg";

	// Decode the base64 string
	const byteCharacters = atob(base64Data);
	const byteNumbers = new Array(byteCharacters.length);
	for (let i = 0; i < byteCharacters.length; i++) {
		byteNumbers[i] = byteCharacters.charCodeAt(i);
	}
	const byteArray = new Uint8Array(byteNumbers);

	// Create a Blob with the binary data and MIME type
	const blob = new Blob([byteArray], { type: mimeType });

	// Convert the Blob to a File
	return new File([blob], fileName, { type: mimeType });
}
