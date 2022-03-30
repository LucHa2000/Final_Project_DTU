"use strict";

const { query } = require("express");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //addColumn
    queryInterface.addConstraint("users", {
      fields: ["documentID"],
      type: "foreign key",
      name: "document_role_association", // optional
      references: {
        table: "documents",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },
  down: async (queryInterface, Sequelize) => {},
};
