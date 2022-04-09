const express = require("express");
const router = express.Router();

class CallVideoController {
  index(req, res, next) {
    res.render("user/callVideo");
  }
}
module.exports = new CallVideoController();
