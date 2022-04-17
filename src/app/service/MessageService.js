const db = require("../models/index");

let getMessageAndAppointmentByAppointmentIDandTile = (title) => {
  return new Promise(async (resolve, reject) => {
    try {
      let appointment = await db.Appointment.findOne({
        where: { title: title.trim() },
        raw: true,
      });

      let messages = await db.Message.findAll({
        where: { appointmentID: appointment.id },
        raw: true,
      });
      let arrayMessage = messages;
      let returnName = async () => {
        for (let e of arrayMessage) {
          console.log("item" + e.userID);
          let user = await db.User.findOne({
            where: { id: e.userID },
            raw: true,
          });
          e.userName = user.firstName + " " + user.lastName;
        }

        if (appointment) {
          resolve([appointment, arrayMessage]);
        } else {
          resolve([]);
        }
      };

      returnName();
    } catch (e) {
      reject(e);
    }
  });
};

let createMessage = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Message.create({
        id: data.id,
        appointmentID: data.roomID,
        message: data.message,
        userID: data.senderID,
      });

      resolve("add successfully !");
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createMessage: createMessage,
  getMessageAndAppointmentByAppointmentIDandTile,
};
