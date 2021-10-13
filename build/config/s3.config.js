"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const crypto_1 = require("crypto");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const storageFile = {
    local: multer_1.default.diskStorage({
        destination: (request, file, callback) => {
            callback(null, path_1.default.resolve(__dirname, "..", "..", "tmp", "arquivos"));
        },
        filename: (request, file, cb) => {
            (0, crypto_1.randomBytes)(10, (err, hash) => {
                if (err)
                    cb(err);
                file.key = `${hash.toString("hex")}-${file.originalname}`;
                console.log(file.key);
                cb(null, file.key);
            });
        }
    }),
    s3: (0, multer_s3_1.default)({
        s3: new aws_sdk_1.default.S3(),
        bucket: process.env.AWS_BUCKET,
        contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
        acl: "public-read",
        key: (request, file, callback) => {
            (0, crypto_1.randomBytes)(10, (err, hash) => {
                if (err)
                    callback(err);
                const filename = `${hash.toString("hex")}-${file.originalname}`;
                print(filename);
                callback(null, filename);
            });
        }
    }),
};
module.exports = {
    dest: path_1.default.resolve(__dirname, "..", "..", "tmp", "arquivos"),
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
        }
        else {
            callback(new Error("Arquivo inválido"));
        }
    },
};
//# sourceMappingURL=s3.config.js.map