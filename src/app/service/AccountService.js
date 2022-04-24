const bcrypt = require("bcryptjs");
const db = require("../models/index");
let salt = bcrypt.genSaltSync(5);
const { v4: uuidv4 } = require("uuid");

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, 5);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let getListAccounts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let listUsers = await db.User.findAll({ raw: true });
      resolve(listUsers); // == return listUsers
    } catch (e) {
      reject(e);
    }
  });
};

//Create Account
let createNewAccount = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await hashUserPassword(data.password);

      let user = await db.User.findOne({
        where: { email: data.email },
        raw: true,
      });
      if (user) {
        resolve("Người dùng đã tồn tại");
      } else {
        await db.User.create({
          id: uuidv4(),
          email: data.email,
          password: hashPassword,
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          roleID: data.roleID,
          status: "1",
        });
        resolve("Thêm thành công !");
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getListAccounts,
  createNewAccount,
};
