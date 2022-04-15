"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("appointments", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      patientID: {
        type: Sequelize.STRING,
      },
      doctorID: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.DATE,
      },
      isCanceled: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("appointments");
  },
};
