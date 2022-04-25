const db = require("../models/index");

import { formatDate } from "../../util/dateNow";
let getAppointmentsByUserID = (userID, roleID) => {
  return new Promise(async (resolve, reject) => {
    try {
      let appointment;
      if (roleID == 2) {
        appointment = await db.Appointment.findAll({
          where: { doctorID: userID },
          raw: true,
        });
      } else if (roleID == 3) {
        appointment = await db.Appointment.findAll({
          where: { userID: userID },
          raw: true,
        });
      }
      if (appointment) {
        resolve(appointment);
      } else {
        resolve([]);
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getAppointmentsByTitle = (title) => {
  return new Promise(async (resolve, reject) => {
    try {
      let appointment = await db.Appointment.findOne({
        where: { title: title },
        raw: true,
      });

      if (appointment) {
        resolve(appointment);
      } else {
        resolve([]);
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getAppandMessage = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let appointment = await db.Appointment.findAll({
        include: db.Message,
      });

      if (appointment) {
        resolve(appointment);
      } else {
        resolve([]);
      }
    } catch (e) {
      reject(e);
    }
  });
};
let checkingAvailableTime = (time, appointment) => {
  let date = formatDate(new Date().toString());
  for (let i = 0; i < appointment.length; i++) {
    if (appointment[i].startTime === time && appointment[i].date === date) {
      return false;
    }
  }
  return true;
};
module.exports = {
  getAppointmentsByUserID: getAppointmentsByUserID,
  getAppointmentsByTitle,
  getAppandMessage,
  checkingAvailableTime,
};
