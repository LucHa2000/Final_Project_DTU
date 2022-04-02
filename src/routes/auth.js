var express = require("express");
var router = express.Router();
let multer = require("multer");
const upload = multer({
  dest: "src/public/uploads/",
});
const authMiddlewares = require("../app/middlewares/AuthMiddlewares");
const authController = require("../app/controllers/AuthController");

router.get("/login", authController.index);
router.post("/login", authController.login);
router.get("/register", authController.registerPage);
router.post("/register", authController.confirmEmailRegister);
router.get("/code", authController.registerConfirmEmail);
router.post("/code", authController.confirmCode);
router.get("/registerAccount", authController.registerAccount);
router.post("/registerAccount", authController.saveAccount);
//router.post("/login", siteController.index);
module.exports = router;
