const db = require("../models/index");
const { v4: uuidv4 } = require("uuid");

let createNewTransactionHistory = (userID, data, appointmentID) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.TransactionHistory.create({
        id: uuidv4(),
        userID: userID,
        appointmentID: appointmentID,
        balance: data.serviceFee,
        status: "none",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      resolve("add successfully !");
    } catch (e) {
      reject(e);
    }
  });
};
let getTransactionHistoryByAppointmentId = (appointmentId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let transactionHistory = await db.TransactionHistory.findOne({
        where: { appointmentID: appointmentId },
      });

      if (transactionHistory) {
        resolve(transactionHistory);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};
let rollBackMoneyForUser = (userId, balance) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
      });

      if (user) {
        user.balance = user.balance + balance;
        await user.save();

        resolve(user);
      } else {
        resolve(null);
      }
    } catch (e) {
      reject(e);
    }
  });
};
let rollBackMoneyForDoctor = (doctorId, balance) => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctor = await db.User.findOne({
        where: { id: doctorId },
      });

      if (doctor) {
        doctor.balance = doctor.balance - balance;
        await doctor.save();
        resolve(doctor);
      } else {
        resolve(null);
      }
    } catch (e) {
      reject(e);
    }
  });
};
//[ADMIN] lịch sử giao dịch
let transactionHistoryManage = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let transacsionHis = await db.Appointment.findAll({
        raw: true,
        where: {
          isCanceled: 2,
        },
        include: [
          {
            model: db.TransactionHistory,
            attributes: ["balance"],
          },
        ],
        order: [["date", "DESC"]],
      });
      if (transacsionHis) {
        resolve(transacsionHis);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createNewTransactionHistory,
  rollBackMoneyForDoctor,
  rollBackMoneyForUser,
  getTransactionHistoryByAppointmentId,
  transactionHistoryManage,
};
