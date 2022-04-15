"use strict";
const { v4: uuidv4 } = require("uuid");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("appointments", [
      {
        id: uuidv4(),
        patientID: "c16763ea-748c-47e6-8889-8ad663804a82",
        doctorID: "5a25a46b-d9f5-476e-9c56-41ad004815c3",
        title: "LAngDoc_Mark",
        date: new Date(),
        isCanceled: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        patientID: "fab0d1a9-b858-44bb-87f0-6df5c3333c8f",
        doctorID: "5a25a46b-d9f5-476e-9c56-41ad004815c3",
        title: "LAngDoc_ZED",
        date: new Date(),
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
