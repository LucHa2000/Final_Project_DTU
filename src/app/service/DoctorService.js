const bcrypt = require("bcryptjs");
const db = require("../models/index");
import { formatDate } from "../../util/dateNow";
let getDoctorByClinicId = (clinicId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findAll({
        where: { clinicID: clinicId, roleID: 2 },
        raw: true,
        include: [
          {
            model: db.Clinic,
          },
        ],
      });
      if (user) {
        resolve(user);
      } else {
        resolve(null);
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getDoctorAppointmentAndResumeById = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dateNow = new Date().toString();
      let user = await db.User.findOne({
        where: { id: doctorId, roleID: 2 },
        raw: true,
        include: [
          {
            model: db.Resume,
          },
        ],
      });
      let appointment = await db.Appointment.findAll({
        where: { doctorID: doctorId, date: formatDate(dateNow) },
        raw: true,
      });
      if (user || appointment) {
        resolve([user, appointment]);
      } else {
        resolve(null);
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getDoctorByClinicId,
  getDoctorAppointmentAndResumeById,
};
