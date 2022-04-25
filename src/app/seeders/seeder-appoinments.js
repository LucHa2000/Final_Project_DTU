"use strict";
const { v4: uuidv4 } = require("uuid");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("appointments", [
      {
        id: uuidv4(),
        userID: "8a484854-c129-481a-8de7-b977cf8d21ad",
        doctorID: "3fc80c17-89ab-4690-8254-eed07fcce266",
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
        userID: "f78e3604-89c0-45ae-a466-25465124e240",
        doctorID: "3fc80c17-89ab-4690-8254-eed07fcce266",
        date: new Date(),
        title: "appointment_day_212",
        startTime: "08:00",
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
