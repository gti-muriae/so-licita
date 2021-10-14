"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const s3 = new aws_sdk_1.default.S3({ accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY, region: process.env.AWS_REGION, Bucket: process.env.AWS_BUCKET });
const uploadS3 = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3: s3,
        acl: 'public-read',
        bucket: process.env.AWS_BUCKET,
        metadata: (req, file, call) => {
            call(null, { fieldName: file.fieldname });
        },
        key: (req, file, call) => {
            call(null, Date.now().toString() + '-' + file.originalname);
        }
    })
});
module.exports = {
    uploadS3
};
//# sourceMappingURL=s3.config.js.map