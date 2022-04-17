"use strict";
const { v4: uuidv4 } = require("uuid");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("appointments", [
      {
        id: uuidv4(),
        userID: "041e76db-ef33-43ad-869d-f3f6d6a56fdc",
        doctorID: "0809ce59-e1bd-4534-9537-a68b174a6ecb",
        title: "ap1",
        date: new Date(),
        isCanceled: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        userID: "ac06291b-3c20-4ea6-9b6f-eb7c663790a6",
        doctorID: "0809ce59-e1bd-4534-9537-a68b174a6ecb",
        title: "app2",
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
