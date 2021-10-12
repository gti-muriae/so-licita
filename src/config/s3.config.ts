import multer from 'multer';
import path from 'path';
import { randomBytes } from 'crypto';
import aws from 'aws-sdk'
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';
dotenv.config();

const storageFile = {
    local: multer.diskStorage({
        destination: (request, file, callback) => {
            callback(null, path.resolve(__dirname, "..", "..", "tmp", "files"));
        },
        filename: (request, file, cb) => {
            randomBytes(10, (err, hash) => {
                if (err) cb(err,'');
            });
        }
    }),
    s3: multerS3({
        s3: new aws.S3(),
        bucket: process.env.AWS_BUCKET!,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: "public-read",
        key: (request, file, callback) => {
            randomBytes(10, (err, hash) => {
                if (err) callback(err);
                const filename = `${hash.toString("hex")}-${file.originalname}`;
                callback(null, filename);
            });
        }
    })

};
export = {
    dest: path.resolve(__dirname, "..", "..", "tmp", "files"),
    storage: storageFile['local'],
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (request: string, file: { mimetype: string; }, callback: any) => {
        const allow = [
            "files/pdf"
        ];

        if (allow.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(new Error("Arquivo inválido"))
        }
    }

};







