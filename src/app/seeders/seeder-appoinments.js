"use strict";
const { v4: uuidv4 } = require("uuid");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("appointments", [
      {
        id: uuidv4(),
        userID: "d83e9fbe-abf6-42e4-90cf-aa782dc0b5fa",
        doctorID: "5c5c3fd5-5e5c-48f3-bf06-0dfd9c689db1",
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
        userID: "369ebab6-348e-4e6d-b263-849946fec966",
        doctorID: "5c5c3fd5-5e5c-48f3-bf06-0dfd9c689db1",
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
