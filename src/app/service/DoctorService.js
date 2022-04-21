const bcrypt = require("bcryptjs");
const db = require("../models/index");

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
let getDoctorAndResumeById = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: doctorId, roleID: 2 },
        raw: true,
        include: [
          {
            model: db.Resume,
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
module.exports = {
  getDoctorByClinicId,
  getDoctorAndResumeById,
};
