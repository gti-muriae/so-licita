import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import fs from 'fs'

dotenv.config();

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

export async function uploadFile({ filename, filePath, mineType }) {
    const file = fs.readFileSync(filePath)

    const data = await s3.upload({
        Bucket: process.env.S3_BUCKET,
        Key: filename,
        Body: file
    }).promise();
}