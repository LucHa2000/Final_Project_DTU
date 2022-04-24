const express = require("express");
const router = express.Router();

import { getListAccounts } from "../service/AccountService";

class AdminController {
  async index(req, res, next) {
    res.render("admin/home");
  }

  async accountPage(req, res, next) {
    let accounts = await getListAccounts();
    res.render("admin/account_view", { accounts });
  }
}
module.exports = new AdminController();
