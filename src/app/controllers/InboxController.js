const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
import {
  getAppointmentsByUserID,
  getAppointmentsByTitle,
} from "../service/AppoinmentService";
import {
  createMessage,
  getMessageAndAppointmentByAppointmentIDandTile,
} from "../service/MessageService";
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
    //save id room

    res.render("user/inbox-list", {
      appointments: getGroupChat,
      account: account,
    });
  }
  async saveMessage(req, res) {
    req.body.id = uuidv4();

    req.body.message = req.body.message;
    let newMessage = await createMessage(req.body);
    if (newMessage) {
      console.log("insert Success ! ");
    } else console.log("insert Error ! ");
  }
  async displayChat(req, res) {
    let userID = req.session.userID;
    let roleID = req.session.roleID;
    let allRooms = await getAppointmentsByUserID(userID, roleID);
    let room = req.params.appointmentTitle;
    try {
      let result = await getMessageAndAppointmentByAppointmentIDandTile(room);

      let account = {
        id: req.session.userID,
        lastName: req.session.lastName,
        firstName: req.session.firstName,
        avatar: req.session.image,
        room: room,
      };

      const appointment = result[0];
      const messages = result[1];

      res.render("user/inbox", {
        account: account,
        roomID: appointment.id,
        messages: messages,
        rooms: allRooms,
      });
    } catch (e) {
      console.log(e);
    }
  }
}
module.exports = new InboxController();
