import multer from 'multer'
import aws from 'aws-sdk'
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';

dotenv.config();
const s3 = new aws.S3({ accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY, region: process.env.AWS_REGION, Bucket: process.env.AWS_BUCKET });


const uploadS3 = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: process.env.AWS_BUCKET,
        metadata: (req, file, call) => {
            call(null, { fieldName: file.fieldname })
        },
        key: (req, file, call) => {
            call(null, Date.now().toString() + '-' + file.originalname)
        }
    })
});

module.exports = {
    uploadS3
}

