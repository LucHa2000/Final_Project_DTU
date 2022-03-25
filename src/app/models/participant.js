"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Participant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Participant.belongsTo(models.User);
      models.User.hasMany(Participant);

      Participant.belongsTo(models.Appointment);
      models.Appointment.hasMany(Participant);
    }
  }
  Participant.init(
    {
      userID: DataTypes.INTEGER,
      appointmentID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Participant",
    }
  );
  return Participant;
};
