const express = require("express");
const router = express.Router();

class UserController {
  async index(req, res, next) {
    const userId = req.session.userID;
    res.render("user/edit_profile");
  }
}
module.exports = new UserController();
