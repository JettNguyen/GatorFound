// uploadConfig.js
import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';

// dotenv.config({path: './backend/config/.env'});

        const s3 = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    });
    console.log("AWS Access Key ID:", process.env.AWS_ACCESS_KEY_ID);  // Debugging step
    console.log("AWS Secret Access Key:", process.env.AWS_SECRET_ACCESS_KEY);  // Debugging step
    console.log("AWS Region:", process.env.AWS_REGION);  // Debugging step

    const upload = multer({
    storage: multerS3({
        s3,
        bucket: 'cen3031',
        acl: 'public-read',
        metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
        cb(null, `uploads/${Date.now().toString()}-${file.originalname}`);
        },
    }),
    });

 export default upload;


