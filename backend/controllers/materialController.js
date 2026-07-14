const { PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { s3Client, BUCKET } = require("../config/s3");
const { Material } = require("../models");
const { getFileUrl } = require("../config/s3");

function formatSize(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}



exports.list = async (req, res) => {
  try {
    const rows = await Material.findAll({
      where: { userId: req.userId },
      order: [["id", "ASC"]],
    });
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.upload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "File tidak ditemukan." });
    }

    const { course } = req.body;
    const key = `materials/${req.userId}/${Date.now()}-${req.file.originalname}`;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      })
    );

    const publicEndpoint = process.env.S3_PUBLIC_ENDPOINT || process.env.S3_ENDPOINT;
    const url = `${publicEndpoint}/${BUCKET}/${key}`;

    const material = await Material.create({
      name: req.file.originalname,
      course: course || "",
      size: formatSize(req.file.size),
      type: req.file.originalname.split(".").pop().toUpperCase(),
      uploadDate: new Date().toLocaleDateString("id-ID"),
      s3Key: key,
      url,
      userId: req.userId,
    });

    res.status(201).json({ success: true, data: material });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const material = await Material.findOne({
      where: { id: req.params.id, userId: req.userId },
    });

    if (!material) {
      return res.status(404).json({ success: false, message: "Data tidak ditemukan." });
    }

    await s3Client.send(
      new DeleteObjectCommand({ Bucket: BUCKET, Key: material.s3Key })
    ).catch(() => {}); // don't block deletion if the object is already gone

    await material.destroy();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.getDownloadUrl = async (req, res) => {
  try {

    const material = await Material.findOne({
      where: {
        id: req.params.id,
        userId: req.userId,
      },
    });

    if (!material) {
      return res.status(404).json({
        success: false,
        message: "Material tidak ditemukan",
      });
    }

    const url = await getFileUrl(material.s3Key);

    res.json({
      success: true,
      url,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};