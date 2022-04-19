var express = require("express");
var router = express.Router();
let multer = require("multer");
const upload = multer({
  dest: "src/public/uploads/",
});

const siteController = require("../app/controllers/SiteController");
const homeController = require("../app/controllers/HomeController");

router.use("/homepage", homeController.index);
router.use("/", siteController.index);
module.exports = router;
