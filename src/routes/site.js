var express = require("express");
var router = express.Router();
let multer = require("multer");
const upload = multer({
  dest: "src/public/uploads/",
});
const authMiddlewares = require("../app/middlewares/AuthMiddlewares");
const siteController = require("../app/controllers/SiteController");
const appointmentController = require("../app/controllers/AppointmentController");

router.use("/", siteController.index);
router.use("/home", appointmentController.index);
module.exports = router;
