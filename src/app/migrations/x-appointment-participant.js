"use strict";
const { query } = require("express");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addConstraint("participants", {
      fields: ["appointmentID"],
      type: "foreign key",
      name: "participant_appointment_association", // optional
      references: {
        table: "appointments",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },
  down: async (queryInterface, Sequelize) => {},
};
