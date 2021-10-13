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
            callback(null, path.resolve(__dirname, "..", "..", "tmp", "arquivos"));
        },
        filename: (request, file, cb) => {
            randomBytes(10, (err, hash) => {
                if (err) cb(err);

                file.key = `${hash.toString("hex")}-${file.originalname}`;
                console.log(file.key);
                cb(null, file.key);
            });
        }
    }),
    s3: multerS3({
        s3: new aws.S3(),
        bucket: process.env.AWS_BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: "public-read",
        key: (request, file, callback) => {
            randomBytes(10, (err, hash) => {
                if (err) callback(err);
                const filename = `${hash.toString("hex")}-${file.originalname}`;
                print(filename);
                callback(null, filename);
            });
        }
    }),
   

};
module.exports = {
    dest: path.resolve(__dirname, "..", "..", "tmp", "arquivos"),
    storage: storageFile[process.env.STORAGE],
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (request, file, callback) => {
        const allow = [
            "arquivos/pdf",

        ];

        if (!allow.includes(file.mimetype)) {
            console.log(process.env.AWS_BUCKET);
            callback(null, true);
        } else {
            callback(new Error("Arquivo inválido"))
        }
    },

};







