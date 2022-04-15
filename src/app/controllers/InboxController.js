const express = require("express");
const router = express.Router();
import {
  getUserByEmailAndPassword,
  getUserByEmail,
  createNewUser,
  sendMail,
  getListUsers,
  getUserByName,
} from "../service/UserService";
// import { saveConversation } from "../service/ConversationService";
class InboxController {
  async index(req, res, next) {
    let users = await getListUsers();
    let account = req.session.name;
    req.res.render("user/inbox", { users: users, account: account });
  }
  async saveMessage(req, res) {
    // let getNameSender = await getUserByName(req.body.sender);
    // let getNameReceiver = await getUserByName(req.body.receiver);
    // console.log(getNameSender, getNameReceiver);
    // req.body.senderID = getNameSender.id;
    // req.body.recipientID = getNameReceiver.id;
    // let createConversation = await saveConversation(req.body);
    // if (createConversation) {
    //   console.log("insert Success ! ");
    // } else console.log("insert Error ! ");
  }
  displayChat(req, res) {
    console.log(req.params.name);
  }
}
module.exports = new InboxController();
