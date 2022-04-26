const express = require("express");
const router = express.Router();
import { getUserById, updateUser } from "../service/UserService";
class UserController {
  async index(req, res, next) {
    const userId = req.session.userID;
    let account = await getUserById(userId);
    //res.render("user/edit_profile", { account: account });
    res.render("user/profile", { account: account });
  }
  async updateAccountView(req, res, next) {
    const userId = req.session.userID;
    let account = await getUserById(userId);
    res.render("user/edit_profile", { account: account });
  }
  async changeAccount(req, res, next) {
    if (!req.file) {
      req.body.image = "";
    } else {
      req.body.image = req.file.path.split("\\").slice(3).join();
    }
    let accountChanged = await updateUser(req.body);
    if (accountChanged) {
      res.redirect("/user");
    } else {
      console.log("Change failed !");
    }
  }
}
module.exports = new UserController();
