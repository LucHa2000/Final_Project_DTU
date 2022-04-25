const db = require("../models/index");

let getNotificationByUserID = (userID) => {
  return new Promise(async (resolve, reject) => {
    try {
      let notifications = await db.Notification.findAll({
        where: { UserId: userID },
        raw: true,
      });
      if (notifications) {
        resolve(notifications);
      } else {
        resolve([]);
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getNotificationByUserID,
};
