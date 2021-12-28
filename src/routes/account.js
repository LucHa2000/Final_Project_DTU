const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "src/public/uploads/" });
const accountController = require("../app/controllers/AccountController");
router.get("/addAccount", accountController.createAccount);
router.get("/:username", accountController.updateAccountPage);
module.exports = router;
