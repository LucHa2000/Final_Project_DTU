const db = require("../models/index");

let findAllClinicAnDoctorWithClinic = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let clinics = await db.Clinic.findAll({
        raw: true,
      });

      let doctorsWithClinics = await db.User.findAll({
        where: { roleID: 2 },
        raw: true,
        include: [
          {
            model: db.Clinic,
          },
        ],
      });
      if (doctorsWithClinics || clinics) {
        resolve([clinics, doctorsWithClinics]);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  findAllClinicAnDoctorWithClinic,
};
