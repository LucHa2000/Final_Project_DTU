"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Appointment.belongsTo(models.User);
      models.User.hasMany(Appointment);
    }
  }
  Appointment.init(
    {
      patientID: DataTypes.STRING,
      doctorID: DataTypes.STRING,
      title: DataTypes.STRING,
      date: DataTypes.DATE,
      isCanceled: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Appointment",
    }
  );
  return Appointment;
};
