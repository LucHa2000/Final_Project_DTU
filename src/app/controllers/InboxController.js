const express = require("express");
const router = express.Router();
import {
  getUserByEmailAndPassword,
  getUserByEmail,
  createNewUser,
  sendMail,
  getListUsers,
} from "../service/UserService";
class InboxController {
  async index(req, res, next) {
    let users = await getListUsers();
    let account = req.session.name;

    req.res.render("user/inbox", { users: users, account: account });
  }
}
module.exports = new InboxController();
