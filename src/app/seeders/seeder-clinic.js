"use strict";
const { v4: uuidv4 } = require("uuid");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("clinics", [
      {
        id: uuidv4(),
        name: "Khoa Sản",
        description: "Sinh Sản Sinh Đẻ",
        image: "f10396ed7305ce07a559cc4ceab1162c",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "Khoa Mắt",
        description: "Chăm Sóc Mắt Bệnh Nhân",
        image: "2c4b796880286f5a4be2135994d0b41c",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "Khoa Răng Hàm Mặt",
        description: "Chắm Sóc Hàm Răng Của Bạn Như Chén Bát Nhà Tôi",
        image: "2c4b796880286f5a4be2135994d0b41c",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "Khoa Tai Mũi Họng",
        description: "Tai Mũi Họng Nè Mấy Chú",
        image: "2c4b796880286f5a4be2135994d0b41c",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("clinics", null, {});
  },
};
