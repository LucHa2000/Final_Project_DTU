const express = require("express");
const router = express.Router();
import {
  createNewUser,
  getListUsers,
  getUserById,
  deleteUser,
  updateUser,
} from "../service/SampleService";
class SiteController {
  index(req, res, next) {
    res.render("user/doctor-list");
  }
}
module.exports = new SiteController();
