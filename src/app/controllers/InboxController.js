const express = require("express");
const router = express.Router();
import {
  createMessage,
  getMessageByAppointmentID,
} from "../service/MessageService";
import {
  getAppointmentsByUserID,
  getAppointmentsByTitle,
} from "../service/AppoinmentsService";
class InboxController {
  async index(req, res, next) {
    let userID = req.session.userID;
    let roleID = req.session.roleID;
    let getGroupChat = await getAppointmentsByUserID(userID, roleID);

    let account = {
      id: req.session.userID,
      lastName: req.session.lastName,
      firstName: req.session.firstName,
    };
    console.log(getGroupChat);
    res.render("user/inbox-list", {
      appointments: getGroupChat,
      account: account,
    });
  }
  async saveMessage(req, res) {
    // message: message,
    // senderID: senderID,
    // senderName: senderName,
    // room: room,
    // console.log(getNameSender, getNameReceiver);
    // req.body.userID = req.body.senderID;
    // id: data.id,
    // appointmentID: data.appointmentID,
    // userID: data.userID,
    // message: data.message,
    // let createConversation = await createMessage(req.body);
    // if (createConversation) {
    //   console.log("insert Success ! ");
    // } else console.log("insert Error ! ");
  }
  async displayChat(req, res) {
    // let userID = req.session.userID;
    // let roleID = req.session.roleID;
    let room = req.params.name;
    let getRoomID = await getAppointmentsByTitle(room);
    let account = {
      id: req.session.userID,
      lastName: req.session.lastName,
      firstName: req.session.firstName,
      room: room,
    };
    res.render("user/inbox", {
      account: account,
      roomID: getRoomID.id,
    });
  }
}
module.exports = new InboxController();
