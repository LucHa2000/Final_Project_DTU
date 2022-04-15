const bcrypt = require("bcryptjs");
const db = require("../models/index");
let salt = bcrypt.genSaltSync(5);
const nodemailer = require("nodemailer"); //sendEmailConfirm

let getAppointmentsByUserID = (userID, roleID) => {
  return new Promise(async (resolve, reject) => {
    try {
      //role of doctor
      if (roleID == 2) {
        let appointment = await db.getAppointmentsByUserID.findAll({
          where: { patientID: userID },
          raw: true,
        });
      }
      //role of user
      else if (role == 3) {
        let appointment = await db.getAppointmentsByUserID.findAll({
          where: { patientID: userID },
          raw: true,
        });
      }

      if (appointment) {
        resolve(appointment);
      } else {
        resolve(null);
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAppointmentsByUserID,
};
