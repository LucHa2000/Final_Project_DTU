const db = require("../models/index");

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
module.exports = {
  getAppointmentsByUserID: getAppointmentsByUserID,
  getAppointmentsByTitle,
};
