"use strict";

const { query } = require("express");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addConstraint("conversations", {
      fields: ["senderID"],
      type: "foreign key",
      name: "conversation_user_association", // optional
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },
  down: async (queryInterface, Sequelize) => {},
};
