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
        firstName: "LAng",
        lastName: "Ha",
        phoneNumber: "0321222112",
        gender: 1,
        password: await hashUserPassword("123"),
        address: "QN",
        status: 1,
        roleID: 1,
        email: "admin@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        firstName: "Davit",
        lastName: "Nguyen",
        phoneNumber: "0123211",
        gender: 1,
        password: await hashUserPassword("123"),
        address: "QN",
        status: 1,
        roleID: 3,
        image: "c3bd87aaa75922c4465eef6f3f0604be",
        email: "user@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        firstName: "Zed",
        lastName: "Le",
        phoneNumber: "0123211",
        gender: 1,
        password: await hashUserPassword("123"),
        address: "QN",
        status: 1,
        roleID: 3,
        email: "user1@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        firstName: "Mark",
        lastName: "Lee",
        phoneNumber: "0123211",
        gender: 1,
        password: await hashUserPassword("123"),
        address: "QN",
        status: 1,
        roleID: 2,
        image: "f10396ed7305ce07a559cc4ceab1162c",
        email: "doctor@gmail.com",
        image: "../img/doctor1.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        firstName: "Kata",
        lastName: "Zed",
        phoneNumber: "0123211",
        gender: 1,
        password: await hashUserPassword("123"),
        address: "QN",
        status: 1,
        roleID: 2,
        email: "doctor2@gmail.com",
        image: "2c4b796880286f5a4be2135994d0b41c",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        firstName: "Jain",
        lastName: "Huynh",
        phoneNumber: "0123211",
        gender: 2,
        password: await hashUserPassword("123"),
        address: "QN",
        status: 1,
        roleID: 2,
        email: "doctor3@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        firstName: "PhanAnh",
        lastName: "Juss",
        phoneNumber: "0123211",
        gender: 2,
        password: await hashUserPassword("123"),
        address: "QN",
        status: 1,
        roleID: 2,
        email: "doctor4@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        firstName: "duyle",
        lastName: "dang",
        phoneNumber: "0123211",
        gender: 2,
        password: await hashUserPassword("123"),
        address: "QN",
        status: 1,
        roleID: 2,
        email: "doctor5@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
