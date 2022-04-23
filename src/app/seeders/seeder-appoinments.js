"use strict";
const { v4: uuidv4 } = require("uuid");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("appointments", [
      {
        id: uuidv4(),
        userID: "11fa15eb-e1b5-46ad-ad78-823a9e384317",
        doctorID: "0ceeabed-67f5-49a2-a8e1-95c9bc4b2b1a",
        title: "appointment_day_122",
        date: new Date(),
        startTime: "13:00",
        endTime: "15:00",
        isCanceled: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        userID: "5b7f2d52-9049-4f8f-8ace-481b488eb165",
        doctorID: "0ceeabed-67f5-49a2-a8e1-95c9bc4b2b1a",
        date: new Date(),
        startTime: "8:00",
        endTime: "10:00",
        isCanceled: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("appointments", null, {});
  },
};
