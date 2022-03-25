"use strict";

const { query } = require("express");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addConstraint("participants", {
      fields: ["userID"],
      type: "foreign key",
      name: "participant_user_association", // optional
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
