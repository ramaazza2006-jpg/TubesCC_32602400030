const multer = require("multer");

// Keep the file in memory; we stream it straight to S3 (LocalStack) instead
// of writing it to the container's local disk.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 }, // 25 MB
});

module.exports = upload;
