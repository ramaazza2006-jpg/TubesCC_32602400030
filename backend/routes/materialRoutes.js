const router = require("express").Router();

const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const ctrl = require("../controllers/materialController");

router.use(auth);

router.get("/:id/download", ctrl.getDownloadUrl);

router.get("/", ctrl.list);

router.post(
  "/",
  upload.single("file"),
  ctrl.upload
);

router.get(
  "/:id/download",
  ctrl.getDownloadUrl
);

router.delete(
  "/:id",
  ctrl.remove
);

module.exports = router;