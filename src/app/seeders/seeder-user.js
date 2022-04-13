"use strict";
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
let salt = 5;

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        id: uuidv4(),
        name: "John",
        phoneNumber: "0321222112",
        password: await hashUserPassword("123"),
        status: 1,
        roleID: 1,
        email: "admin@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "Davit",
        phoneNumber: "0123211",
        password: await hashUserPassword("123"),
        status: 1,
        roleID: 3,
        email: "user@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "Zed",
        phoneNumber: "0123211",
        password: await hashUserPassword("123"),
        status: 1,
        roleID: 3,
        email: "user1@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "Mark",
        phoneNumber: "0123211",
        password: await hashUserPassword("123"),
        status: 1,
        roleID: 2,
        email: "doctor@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
