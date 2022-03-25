"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        name: "John",
        phoneNumber: "0321222112",
        password: "123",
        status: 1,
        email: "admin@gmail.com",

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Davit",
        phoneNumber: "0123211",
        password: "1234",
        status: 1,
        email: "user@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
