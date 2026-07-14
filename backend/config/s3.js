const {
  S3Client,
  CreateBucketCommand,
  HeadBucketCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

require("dotenv").config();

const s3Client = new S3Client({
  region: process.env.S3_REGION || "us-east-1",
  endpoint: process.env.S3_ENDPOINT || "http://host.docker.internal:4566",
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || "test",
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "test",
  },
});

const BUCKET = process.env.S3_BUCKET || "studysync-materials";

async function ensureBucket() {
  try {
    await s3Client.send(
      new HeadBucketCommand({
        Bucket: BUCKET,
      })
    );

    console.log(`✅ S3 bucket "${BUCKET}" ready`);
  } catch (err) {
    try {
      await s3Client.send(
        new CreateBucketCommand({
          Bucket: BUCKET,
        })
      );

      console.log(`✅ S3 bucket "${BUCKET}" created`);
    } catch (createErr) {
      console.log(
        `⚠️ Could not create/verify S3 bucket: ${createErr.message}`
      );
    }
  }
}

async function getFileUrl(key) {
  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: key,
  });

  return await getSignedUrl(s3Client, command, {
    expiresIn: 300,
  });
}

module.exports = {
  s3Client,
  BUCKET,
  ensureBucket,
  getFileUrl,
};