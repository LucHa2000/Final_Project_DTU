const express = require("express");
const router = express.Router();

class AdminController {
  async index(req, res, next) {
    res.render("admin/home");
  }
}
module.exports = new AdminController();
