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

module.exports = {
  createNewTransactionHistory,
};
