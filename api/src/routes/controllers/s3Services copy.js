require('dotenv').config()
const {S3}=require("aws-sdk")
const uuid = require('uuid').v4;

// Only recieve one file
exports.s3Uploadv2 = async (file) => {
    // console.log(file)
    const s3 = new S3()
    const param = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `uploads/${uuid()}-${file.originalname}`,
        Body: file.buffer
    }
    return await s3.upload(param).promise();
}

/* 

aws-s3-nodejs-uploadd

arn:aws:s3:::aws-s3-nodejs-uploadd/*


nodejs-aws-s3-multer-example

AKIASH5HOC53AQC7FZXF

KeTccogUqyJgcAff83aD2375+iomtyFd/Ax1MTtT
*/