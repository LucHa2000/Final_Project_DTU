const express = require("express");
const router = express.Router();

class DoctorController {
  async index(req, res, next) {
    res.render("doctor/home");
  }
}
module.exports = new DoctorController();
