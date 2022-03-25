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
  async index(req, res, next) {
    let data = await getListUsers();
    console.log(data);
    res.render("user/home");
  }
}
module.exports = new SiteController();
