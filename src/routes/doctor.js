var express = require("express");
var router = express.Router();
let multer = require("multer");
const upload = multer({
  dest: "src/public/uploads/",
});

const doctorController = require("../app/controllers/DoctorController");

router.use("/", doctorController.index);
module.exports = router;
