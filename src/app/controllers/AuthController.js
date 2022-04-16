const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
let salt = 5;

let Random = Math.floor(Math.random() * 1000000 + 100).toString();
import { response } from "express";
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
    // console.log("req.session.userId: ", req.session.userId);

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
    res.render("auth/confirmEmail_view", {
      message: req.session.errorConfirmCode,
    });
    req.session.errorConfirmCode = null;
  }
  //confirm email register
  async confirmEmailRegister(req, res) {
    //check account
    let userExists = await getUserByEmail(req.body.email);

    if (userExists !== null) {
      //Email is already registered
      // req.session.errorRegister = "Email is already registered !";
      // res.redirect("/auth/register");
      res.send({
        error: "Email này đã được sử dụng",
      });
      //sendmail
    } else {
      req.session.code = Random;
      req.session.email = req.body.email;
      console.log("code: ", req.session.code);
      sendMail(
        req.body.email,
        "danchoiphonui27@gmail.com",
        "danchoiphonui27",
        Random
      );
      //save session :code,email
      req.session.code = Random;
      req.session.email = req.body.email;
      // res.redirect("/auth/code");
      res.send({ code: req.session.code });
    }
  }
  confirmCode(req, res) {
    let code = req.body.code;
    let codeConfirm = req.session.code;
    if (code === codeConfirm) {
      req.session.accountVerified = true;
      req.session.code = null;
      // res.redirect("/auth/registerAccount");
      res.send({ ok: true });
    } else {
      // req.session.errorConfirmCode =
      //   "The code is wrong, please check the code again!";
      // res.redirect("back");
      res.status(400).send({ message: "The code is not correct." });
    }
  }
  registerAccount(req, res) {
    if (req.session.accountVerified == true) {
      req.session.accountVerified = null;
      res.render("auth/signup");
    } else {
      res.redirect("/auth/register");
    }
  }
  async saveAccount(req, res) {
    req.body.id = uuidv4();
    req.body.email = req.session.email;
    let createUser = await createNewUser(req.body);
    if (createUser) {
      req.session.messageRegister =
        "Đăng ký thành công, vui lòng đăng nhập để tiếp tục!";
      res.redirect("/auth/login");
    } else res.redirect("/auth/register");
  }
  //forgot Password
  forgotPasswordPage(req, res) {
    res.render("auth/forgotPassword");
  }
  async sendPasswordToEmail(req, res) {
    //check account
    let userExists = await getUserByEmail(req.body.email);

    if (userExists !== null) {
      //sendmail
      sendMail(
        req.body.email,
        "danchoiphonui27@gmail.com",
        "danchoiphonui27",
        Random
      );
      //save session :code,email
      res.redirect("/auth/login");
    } else {
      //Email is does not exist
      req.session.errorForgotPassword = "Account does not exist !";
      res.redirect("back");
    }
  }
}
module.exports = new AuthController();
