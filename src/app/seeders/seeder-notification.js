"use strict";
const { v4: uuidv4 } = require("uuid");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("notifications", [
      // {
      //   id: uuidv4(),
      //   AppointmentId: "2e335d05-3704-4de8-a019-3cac4ae2af85",
      //   title: "Thông Báo Cuộc Hẹn",
      //   content:
      //     "Bạn đã đặt lịch thành công, bạn có thể vào mục lịch tư vấn để kiểm tra lịch hẹn !",
      //   link: "/user/schedule",
      //   fromUserID: "5b1aa055-6211-4e9f-8d09-ef6909ff1636",
      //   UserId: "2e8abec9-ad3e-4b8e-8b9c-415033cf7fb2",
      // },
      {
        id: uuidv4(),
        AppointmentId: "56e0da38-c5de-4e6b-9c7d-8eeb795e2eaf",
        title: "Thông Báo Lịch Làm Việc",
        content:
          "Bạn đã vừa có khách đặt 08:00:00 - 10:00:00, bạn có thể vào mục xem lịch làm việc  để kiểm tra !",
        link: "/doctor/scheduleWork",
        fromUserID: "369ebab6-348e-4e6d-b263-849946fec966",
        UserId: "5c5c3fd5-5e5c-48f3-bf06-0dfd9c689db1",
      },
      {
        id: uuidv4(),
        AppointmentId: "2e335d05-3704-4de8-a019-3cac4ae2af85",
        title: "Thông Báo Lịch Làm Việc",
        content:
          "Bạn đã vừa có khách đặt 13:00:00 - 15:00:00, bạn có thể vào mục xem lịch làm việc để kiểm tra !",
        link: "/doctor/scheduleWork",
        fromUserID: "d83e9fbe-abf6-42e4-90cf-aa782dc0b5fa",
        UserId: "5c5c3fd5-5e5c-48f3-bf06-0dfd9c689db1",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("notifications", null, {});
  },
};
