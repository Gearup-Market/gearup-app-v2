import { Request } from "express";
import multer, { FileFilterCallback, memoryStorage } from "multer";
import path from "path";

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedTypes = /jpeg|jpg|png|gif|mp4|pdf|txt|doc|docx/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Only images,videos and documents are allowed (jpeg, jpg, png)"));
  }
};

const upload = multer({
  storage: memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024, // 20 MB max size
  },
  fileFilter,
});

export default upload;
