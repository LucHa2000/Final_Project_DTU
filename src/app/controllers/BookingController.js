const express = require("express");
const moment = require("moment");
const app = express();
const server = require("http").Server(app);
var io = require("socket.io")(server);

const router = express.Router();
const { v4: uuidv4 } = require("uuid");
import appoinment from "../models/appoinment";
import { formatDate } from "../../util/dateNow";
import {
  getAppointmentsByUserID,
  createNewAppointment,
  updateAppointment,
  cancelAppointment,
  checkingAvailableTime,
} from "../service/AppoinmentService";
import {
  createNotification,
  socketServerNotification,
} from "../service/NotificationService";
import {
  getUserById,
  addBalanceById,
  minusBalanceById,
} from "../service/UserService";
import { createNewTransactionHistory } from "../service/TransactionHistoryService";

import {
  bookingNotification,
  serverNotification,
} from "../../public/script/socketServer";
const dateNow = formatDate(new Date().toString());
class BookingController {
  async index(req, res, next) {
    let user = await getUserById(req.session.userID);
    console.log(req.body);
    let doctor = await getUserById(req.body.doctorID);
    let dateBooking = req.body.dateBooking;
    let timeStart = req.body.timeStart;
    let timeEnd = req.body.timeEnd;
    let serviceFee = req.body.serviceFee;
    let bookingDetail = {
      user: user,
      doctor: doctor,
      serviceFee: serviceFee,
      dateBooking: dateBooking,
      timeStart: timeStart,
      timeEnd: timeEnd,
    };
    req.session.bookingDetail = bookingDetail;
    res.redirect("/booking/displayBookingForm");
  }
  displayBookingForm(req, res) {
    let bookingDetail = req.session.bookingDetail;
    res.render("user/booking-form", {
      bookingDetail: bookingDetail,
      errorMessage: req.session.error,
      successfullyMessage: req.session.successfullyMessage,
    });

    if (req.session.error) {
      req.session.error = null;
    }
    if (req.session.successfullyMessage) {
      req.session.successfullyMessage = null;
    }
    if (req.session.appointmentId) {
      req.session.appointmentId = null;
    }
    //req.session.bookingDetail = null;
  }
  async createAppointment(req, res, next) {
    try {
      let userID = req.session.userID;
      let roleID = req.session.roleID;
      let date = req.body.date;
      let user = await getUserById(userID);
      let userAppointment = await getAppointmentsByUserID(userID, roleID);
      let doctorAppointment = await getAppointmentsByUserID(
        req.body.doctorID,
        2,
      );
      let startTime = req.body.startTime;
      if (
        checkingAvailableTime(startTime, userAppointment,date) === false ||
        checkingAvailableTime(startTime, doctorAppointment,date) === false
      ) {
        req.session.error = "Bạn không thể đặt lịch vào thời gian này!";
        res.redirect("back");
      } else if (user.balance < req.body.serviceFee) {
        req.session.error = "Số xu của bạn không đủ ! bạn có thể nạp thêm xu ";
        res.redirect("back");
      } else {
        req.body.id = uuidv4();
        console.log(req.body);
        console.log(userID);

        let newAppointmentId = await createNewAppointment(userID, req.body);
        console.log(newAppointmentId);
        if (newAppointmentId) {
          let amountForDoctor = (req.body.serviceFee * 70) / 100;
          await addBalanceById(req.body.doctorID, amountForDoctor);
          await minusBalanceById(userID, req.body.serviceFee);
          await createNewTransactionHistory(userID, req.body, newAppointmentId);
          req.session.successfullyMessage = "Đặt lịch thành công";
          //create notification
          const titleNotificationForAppointment = "Thông Báo Lịch Hẹn";
          const contentNotificationForAppointment =
            "Vừa có lịch hẹn được đặt, bạn có thể kiểm tra lịch !";
          const notification = {
            appointmentId: newAppointmentId,
            title: titleNotificationForAppointment,
            content: contentNotificationForAppointment,
            link: `?date=${dateNow}`,
            fromUserID: userID,
            doctorID: req.body.doctorID,
          };

          //create Notification in db
          let newNotification = await createNotification(notification);
          //create Notification in client side
          serverNotification(io, notification);
          req.session.messageBooking =
            "Bạn đã đặt lịch thành công, bạn có thể vào lịch cá nhân để kiểm tra !";
          res.redirect(`/detailDoctor/${req.body.doctorID}?date=${date}`);
          //clear req.session.bookingDetail
          req.session.bookingDetail = null;
        } else {
          console.log("error");
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new BookingController();
