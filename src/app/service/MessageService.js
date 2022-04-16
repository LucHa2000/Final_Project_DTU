const db = require("../models/index");

let getMessageByAppointmentID = (appointmentID) => {
  return new Promise(async (resolve, reject) => {
    try {
      let messages = await db.Message.findAll({
        where: { appointmentID: appointmentID },
        raw: true,
      });
      if (messages) {
        resolve(messages);
      } else {
        resolve([]);
      }
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
        appointmentID: data.appointmentID,
        userID: data.userID,
        message: data.message,
      });

      resolve("add successfully !");
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createMessage,
  getMessageByAppointmentID,
};
