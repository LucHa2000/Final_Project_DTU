"use strict";
const { v4: uuidv4 } = require("uuid");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("appointments", [
      {
        id: uuidv4(),
        userID: "3b877c31-dd06-41f5-b96f-600975efef97",
        doctorID: "b90cecf2-3999-4b0d-a3cf-ba71a92f52cf",
        title: "ap1",
        date: new Date(),
        isCanceled: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        userID: "a73256a5-db2b-4b60-9889-00d9a527d9eb",
        doctorID: "b90cecf2-3999-4b0d-a3cf-ba71a92f52cf",
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
