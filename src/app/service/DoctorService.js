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
let getResumeById = (resumeId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let resume = await db.Resume.findOne({
        where: { id: resumeId },
        raw: true,
      });

      if (resume) {
        resolve(resume);
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
let updateResume = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let resume = await db.Resume.findOne({
        where: { id: data.id },
      });
      if (resume) {
        resume.title = data.title;
        resume.description = data.description.trim();
        await resume.save();
        resolve("update done !");
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getResumeById,
  getDoctorByClinicId,
  updateResume,
  getDoctorAppointmentAndResumeById,
};
