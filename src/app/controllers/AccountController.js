const express = require("express");
const router = express.Router();

import { getListAccounts, createNewAccount } from "../service/AccountService";

class AccountController {
  //[POST]
  async index(req, res, next) {
    req.send("123");
  }
  async storeAccount(req, res, next) {
    let formData = req.body;

    if (formData === null) return res.redirect("/back");

    let newAccount = await createNewAccount(formData);

    if (!newAccount) return res.redirect("/error");

    res.redirect("/admin/account");
  }
}

module.exports = new AccountController();
