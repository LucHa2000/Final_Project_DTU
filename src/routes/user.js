var express = require("express");
var router = express.Router();
let multer = require("multer");
const upload = multer({
  dest: "src/public/uploads/",
});

const userController = require("../app/controllers/UserController");

router.use("/", userController.index);
module.exports = router;
