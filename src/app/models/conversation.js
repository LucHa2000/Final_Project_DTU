"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Conversation.belongsTo(models.User);
      models.User.hasMany(Conversation);
    }
  }
  Conversation.init(
    {
      senderID: DataTypes.INTEGER,
      recipientID: DataTypes.INTEGER,
      content: DataTypes.STRING,
      image: DataTypes.STRING,
      icon: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Conversation",
    }
  );
  return Conversation;
};
