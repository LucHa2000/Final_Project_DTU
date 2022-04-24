const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({
  dest: "src/public/uploads/",
});

const accountController = require("../app/controllers/AccountController");

router.post("/storeAccount", accountController.storeAccount);
router.use("/", accountController.index);

module.exports = router;
