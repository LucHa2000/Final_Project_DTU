const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
let salt = 5;

let Random = Math.floor(Math.random() * 1000000 + 100).toString();
import {
  getUserByEmailAndPassword,
  getUserByEmail,
  createNewUser,
  sendMail,
} from "../service/UserService";
class AuthController {
  index(req, res) {
    res.render("auth/login", {
      message: req.session.errorLogin,
      messageRegister: req.session.messageRegister,
    });
    if (req.session.errorLogin) {
      req.session.errorLogin = null;
    }
    if (req.session.messageRegister) {
      req.session.messageRegister = null;
    }
  }
  //login
  async login(req, res) {
    let captCha = req.body["g-recaptcha-response"];
    if (captCha) {
      let user = await getUserByEmailAndPassword(
        req.body.email,
        req.body.password
      );

      if (user) {
        const accountRole = user.roleID;
        const accountID = user.id;
        const accountName = user.name;

        //save account to session
        req.session.userID = accountID;
        req.session.roleID = accountRole;
        req.session.name = accountName;
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
        //return message
        req.session.errorLogin = "Email or password is wrong please re-enter !";
        res.redirect("back");
      }
    } else {
      //return message
      req.session.errorLogin = "Please confirm captcha !";
      res.redirect("back");
    }
  }
  logout(req, res) {
    req.session.destroy();
    res.redirect("/");
  }
  // register page
  registerPage(req, res) {
    res.render("auth/signup_email", { message: req.session.errorRegister });
    if (req.session.errorRegister) {
      req.session.errorRegister = null;
    }
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
      req.session.errorRegister = "Email is already registered !";
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
    req.body.id = uuidv4();
    req.body.email = req.session.email;
    let createUser = await createNewUser(req.body);
    if (createUser) {
      req.session.messageRegister = "Register Successfully !";
      res.redirect("/auth/login");
    } else res.redirect("/auth/register");
  }
}
module.exports = new AuthController();
