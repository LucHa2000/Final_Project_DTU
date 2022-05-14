const express = require("express");
const app = express();
const server = require("http").Server(app);
var io = require("socket.io")(server);
const moment = require("moment");
import { formatDate } from "../../util/dateNow";
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
// const schedule = require("node-schedule");
import {
  createNotification,
  socketServerNotification,
} from "../service/NotificationService";
import {
  getAppointmentsOnDayByUserID,
  cancelAppointment,
} from "../service/AppoinmentService";
import {
  bookingNotification,
  serverNotification,
} from "../../public/script/socketServer";
import {
  rollBackMoneyForDoctor,
  rollBackMoneyForUser,
  getTransactionHistoryByAppointmentId,
} from "../service/TransactionHistoryService";
import { getUserById } from "../service/UserService";
const dateNow = formatDate(new Date().toString());
class JobController {
  async index(req, res, next) {
    let defaultDate = req.query.date;

    let userSchedule = await getAppointmentsOnDayByUserID(
      req.session.userID,
      req.session.roleID,
      defaultDate
    );
    for (let element of userSchedule) {
      // console.log(element.doctorID);
      let user = await getUserById(element.userID);
      element.userAvatar = user.image;
      element.userName = user.firstName + " " + user.lastName;
    }

    res.render("doctor/schedule", {
      userSchedule: userSchedule,
      defaultDate,
      messageCancelBooking: req.session.messageCancelBooking,
    });
    req.session.messageCancelBooking = null;
  }

  async cancelAppointment(req, res, next) {
    try {
      let appointmentCanceled = await cancelAppointment(
        req.params.appoinmentId
      );

      if (appointmentCanceled) {
        let transactionHistory = await getTransactionHistoryByAppointmentId(
          appointmentCanceled.id
        );

        let moneyRollBackForDoctor = (transactionHistory.balance * 70) / 100;
        let moneyRollBackForUser = transactionHistory.balance;

        //rollback money
        let rBDoctor = await rollBackMoneyForDoctor(
          appointmentCanceled.doctorID,
          moneyRollBackForDoctor
        );
        let rBUser = await rollBackMoneyForUser(
          appointmentCanceled.userID,
          moneyRollBackForUser
        );
        //save notification
        const titleNotificationForAppointment = "Thông Báo Lịch Hẹn Đã Huỷ";
        const contentNotificationForAppointment =
          "Vừa có lịch hẹn đã được huỷ, bạn có thể kiểm tra lịch !";
        const notification = {
          appointmentId: appointmentCanceled.id,
          title: titleNotificationForAppointment,
          content: contentNotificationForAppointment,
          link: `?date=${dateNow}`,
          type: "cancelAppointment",
          fromUserID: appointmentCanceled.doctorID,
          doctorID: appointmentCanceled.userID,
        };

        //create Notification in db
        let newNotification = await createNotification(notification);
        //create Notification in client side
        serverNotification(io, notification);
        req.session.messageCancelBooking = "Bạn đã đặt huỷ lịch thành công !";
        res.redirect("back");
      } else {
        console.log("cancel error");
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new JobController();
