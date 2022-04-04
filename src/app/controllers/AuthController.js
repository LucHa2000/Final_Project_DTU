const express = require("express");
const router = express.Router();

let Random = Math.floor(Math.random() * 1000000 + 100).toString();
import {
  getUserByEmailAndPassword,
  getUserByEmail,
  createNewUser,
  sendMail,
} from "../service/UserService";
class AuthController {
  index(req, res) {
    res.render("auth/login");
  }
  //login
  async login(req, res) {
    let user = await getUserByEmailAndPassword(
      req.body.email,
      req.body.password
    );
    console.log(user);
    if (user) {
      const accountRole = user.roleID;
      const accountID = user.id;

      //save account to session
      req.session.userID = accountID;
      req.session.roleID = accountRole;

      //console.log(req.session);
      if (accountRole === 1) {
        res.redirect("/admin");
      }
      if (accountRole === 2) {
        res.redirect("/doctor");
      }

      if (accountRole === 3) {
        res.redirect("/");
      }
    } else {
      res.redirect("back");
    }
  }
  logout(req, res) {
    req.session.destroy();
    res.redirect("/");
  }
  // register page
  registerPage(req, res) {
    res.render("auth/signup_email");
  }
  //render confirm email page
  registerConfirmEmail(req, res) {
    res.render("auth/confirmEmail_view");
  }
  //confirm email register
  async confirmEmailRegister(req, res) {
    //check account
    let userExists = await getUserByEmail(req.body.email);

    if (userExists !== null) {
      //Email is already registered
      console.log("Email already registered !");
      res.cookie("message", "Email is already registered !");
      res.redirect("/auth/register");
      //sendmail
    } else {
      req.session.code = Random;
      req.session.email = req.body.email;
      sendMail(
        req.body.email,
        "danchoiphonui27@gmail.com",
        "danchoiphonui27",
        Random
      );
      //save session :code,email

      // console.log(req.session);

      res.redirect("/auth/code");
    }
  }
  confirmCode(req, res) {
    let code = req.body.code;
    let codeConfirm = req.session.code;
    // if (code === codeConfirm) {
    req.session.accountVerified = true;
    res.redirect("/auth/registerAccount");
    // } else {
    //   res.redirect("back");
    // }
  }
  registerAccount(req, res) {
    //  if (req.session.accountVerified == true) {
    req.session.accountVerified = false;
    res.render("auth/signup");
    // } else {
    //res.redirect("/auth/register");
    //}
  }
  async saveAccount(req, res) {
    req.body.email = req.session.email;
    let createUser = await createNewUser(req.body);
    if (createUser) {
      res.redirect("/auth/login");
    } else res.redirect("/auth/register");
  }
}
module.exports = new AuthController();
