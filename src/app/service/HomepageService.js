const db = require("../models/index");

let getDoctorsClinics = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let listDoctors = await db.User.findAll({
        where: { roleID: 2 },
        raw: true,
        include: { model: db.Clinic, raw: true },
      });
      if (listDoctors) {
        resolve(listDoctors);
      } else {
        resolve([]);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getClinics = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let listClinics = await db.Clinic.findAll({
        raw: true,
      });
      if (listClinics) {
        resolve(listClinics);
      } else {
        resolve([]);
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getDoctorsClinics,
  getClinics,
};
