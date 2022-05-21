const db = require("../models/index");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
import { raw } from "body-parser";
import { formatDate } from "../../util/dateNow";
let getAppointmentsByUserID = (userID, roleID) => {
  return new Promise(async (resolve, reject) => {
    try {
      let appointment;
      if (roleID == 2) {
        appointment = await db.Appointment.findAll({
          where: { doctorID: userID, isCanceled: { [Op.or]: [0, 1] } },
          raw: true,
        });
      } else if (roleID == 3) {
        appointment = await db.Appointment.findAll({
          where: { userID: userID, isCanceled: { [Op.or]: [0, 1] } },
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
let getAppointmentsAndTransactionsByUserID = (userID, roleID) => {
  return new Promise(async (resolve, reject) => {
    try {
      let appointment;
      if (roleID == 2) {
        appointment = await db.Appointment.findAll({
          where: { doctorID: userID },
          raw: true,
          include: db.TransactionHistory,
          order: [["startTime", "ASC"]],
        });
      } else if (roleID == 3) {
        appointment = await db.Appointment.findAll({
          where: { userID: userID },
          raw: true,
          include: db.TransactionHistory,
          order: [["startTime", "ASC"]],
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
let getAppointmentById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let appointment = await db.Appointment.findOne({
        where: { id: id },
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
let createNewAppointment = (userID, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let createAppointment = await db.Appointment.create({
        id: uuidv4(),
        userID: userID,
        doctorID: data.doctorID,
        title: data.title,
        startTime: data.startTime,
        date: data.date,
        endTime: data.endTime,
        isCanceled: 0,
      });
      resolve(createAppointment);
    } catch (e) {
      reject(e);
    }
  });
};
let checkingAvailableTime = (time, appointment, date) => {
  for (let i = 0; i < appointment.length; i++) {
    if (appointment[i].startTime === time && appointment[i].date === date) {
      return false;
    }
  }
  return true;
};

let updateAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let appointment = await db.Appointment.findOne({
        where: { id: data.id },
      });
      if (appointment) {
        await db.Appointment.update({
          id: data.id,
          userID: userID,
          doctorID: data.doctorID,
          title: data.title,
          date: data.date,
          startTime: data.startTime,
          endTime: data.endTime,
          isCancel: false,
        });
        resolve("Update Successfully!");
      } else {
        resolve(null);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let cancelAppointment = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let appointment = await db.Appointment.findOne({
        where: { id: id },
      });

      if (appointment) {
        appointment.isCanceled = 3;
        await appointment.save();
        resolve(appointment);
      } else {
        resolve(null);
      }
    } catch (e) {
      reject(e);
    }
  });
};
let acceptAppointment = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let appointment = await db.Appointment.findOne({
        where: { id: id },
      });

      if (appointment) {
        appointment.isCanceled = 1;
        await appointment.save();
        resolve(appointment);
      } else {
        resolve(null);
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getAppointmentsOnDayByUserID = (userID, roleID, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      let appointment;
      if (roleID == 2) {
        appointment = await db.Appointment.findAll({
          where: {
            doctorID: userID,
            isCanceled: { [Op.or]: [0, 1, 2, 3] },
            date: date,
          },

          raw: true,
          order: [["startTime", "ASC"]],
        });
      } else if (roleID == 3) {
        appointment = await db.Appointment.findAll({
          where: {
            userID: userID,
            isCanceled: { [Op.or]: [0, 1, 2] },
            date: date,
          },
          raw: true,
          order: [["startTime", "ASC"]],
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

//[appoinment admin]
let getAppointment = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let appointment = await db.Appointment.findAll({
        raw: true,
        order: [["date", "DESC"]],
      });
      if (appointment) {
        resolve(appointment);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getAppointmentsByUserID: getAppointmentsByUserID,
  getAppointmentsByTitle,
  getAppandMessage,
  updateAppointment,
  checkingAvailableTime,
  getAppointmentById,
  cancelAppointment,
  acceptAppointment,
  getAppointmentsOnDayByUserID,
  createNewAppointment,
  getAppointmentsAndTransactionsByUserID,
  getAppointment,
};
