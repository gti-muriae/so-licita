import aws, { S3 } from "aws-sdk";
import mime from "mime";
import path from "path";
import upload from '../config/upload';


class s3Storage {
    private client: S3;
    constructor() {
        this.client = new aws.S3({ region: process.env.AWS_REGION });
    }
    async saveFile(filename: string): Promise<void> {
        const original = path.resolve(upload.directory, filename);
        const ContentType = mime

        if (!ContentType) {
            throw new Error('File not found')
        }
    }
}
