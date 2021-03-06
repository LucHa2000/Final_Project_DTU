"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("conversations", {
      id: {
        allowNull: false,

        primaryKey: true,
        type: Sequelize.STRING,
      },
      senderID: {
        type: Sequelize.STRING,
      },
      recipientID: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      icon: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("conversations");
  },
};
