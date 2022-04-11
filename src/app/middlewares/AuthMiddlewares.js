const express = require("express");
const router = express.Router();
import {
  getUserByEmailAndPassword,
  getUserByEmail,
  createNewUser,
  sendMail,
  getUserById,
} from "../service/UserService";
class AuthMiddlewares {
  async checkAccount(req, res, next) {
    if (!req.session.userID) {
      res.redirect("/auth/login");
      //return;
    } else {
      let user = await getUserById(req.session.userID);
      if (user) {
        next();
      } else {
        res.redirect("/auth/login");
      }
    }
  }
  checkRoleAdmin(req, res, next) {
    if (req.session.roleID) {
      if (req.session.roleID === 1) {
        next();
      } else {
        res.redirect("/auth/login");
      }
    } else res.redirect("/auth/login");
  }
  checkRoleUser(req, res, next) {
    if (req.session.roleID) {
      if (req.session.roleID === 3) {
        next();
      } else {
        res.redirect("/auth/login");
      }
    } else res.redirect("/auth/login");
  }
  checkRoleDoctor(req, res, next) {
    if (req.session.roleID) {
      if (req.session.roleID === 2) {
        next();
      } else {
        res.redirect("/auth/login");
      }
    } else res.redirect("/auth/login");
  }
}
module.exports = new AuthMiddlewares();
