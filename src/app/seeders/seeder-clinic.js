"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("clinics", [
      {
        id: uuidv4(),
        name: "Khoa Sản",
        description: "Sinh Sản Sinh Đẻ",
        image: "../img/khoasan.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "Khoa Mắt",
        description: "Chăm Sóc Mắt Bệnh Nhân",
        image: "../img/khoamat.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "Khoa Răng Hàm Mặt",
        description: "Chắm Sóc Hàm Răng Của Bạn Như Chén Bát Nhà Tôi",
        image: "..img/nganh-rang-ham-mat.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "Khoa Tai Mũi Họng",
        description: "Tai Mũi Họng Nè Mấy Chú",
        image: "../img/taimuihong.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("clinics", null, {});
  },
};
