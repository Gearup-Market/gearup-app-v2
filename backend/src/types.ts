/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { UploadedFile } from 'express-fileupload';

export interface Routes {
    path?: string;
    router: Router;
}
// Augment the Express module to include the 'files' property in the Request interface
declare module 'express-serve-static-core' {
    interface Request {
        files?: { [key: string]: UploadedFile | UploadedFile[] };
    }
}