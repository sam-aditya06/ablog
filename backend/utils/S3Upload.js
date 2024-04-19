import fs from 'fs';

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export default async function S3Upload(folder, path, newName, mimetype){

    const client = new S3Client({
        region: 'ap-south-1',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACESS_KEY
        }
    });

    try {

        await client.send(new PutObjectCommand({
            Bucket: 'adi-a-blog',
            Body: fs.readFileSync(path),
            Key: `${folder}/${newName}`,
            ContentType: mimetype,
            ACL: 'public-read'
        }));
        return `https://adi-a-blog.s3.ap-south-1.amazonaws.com/${folder}/${newName}`;
        
    } catch (error) {
        throw error;
    }
}