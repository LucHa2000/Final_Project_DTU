const express = require("express");
const router = express.Router();

import { getListAccounts } from "../service/AccountService";
import { getUserById } from "../service/UserService";
import { getListClinics } from "../service/ClinicService";
import { getAppointment } from "../service/AppoinmentService";
import { transactionHistoryManage } from "../service/TransactionHistoryService";
import {
  statisticalCalculation,
  statisticsByDay,
  statisticsAppointment,
} from "../service/StatisticService";
class AdminController {
  //[GET] statistic page
  async index(req, res, next) {
    try {
      let statistics = await statisticalCalculation();
      let appoinments = await statisticsAppointment();

      for (let e of appoinments) {
        e.tranBalence = e["TransactionHistory.balance"];
      }

      let doctorNumber = statistics[0];
      let userNumber = statistics[1];
      let clinicNumber = statistics[2];
      let transacsionNumber = statistics[3];
      let revenue = statistics[4];
      res.render("admin/home", {
        doctorNumber,
        userNumber,
        clinicNumber,
        transacsionNumber,
        revenue,
        Transactions: appoinments,
      });
    } catch (err) {
      console.log(err);
    }
  }

  //[POST] statistic by date page
  async pickStatisticsPage(req, res, next) {
    try {
      let statistics = await statisticalCalculation();

      let doctorNumber = statistics[0];
      let userNumber = statistics[1];
      let clinicNumber = statistics[2];
      let transacsionNumber = statistics[3];
      let revenue = statistics[4];

      let detailTransaction = await statisticsByDay(req.body);
      for (let e of detailTransaction) {
        e.tranBalence = e["TransactionHistory.balance"];
      }
      req.session.messageDate = req.body;
      res.render("admin/home", {
        doctorNumber,
        userNumber,
        clinicNumber,
        transacsionNumber,
        revenue,
        Transactions: detailTransaction,
        messageDate: req.session.messageDate,
      });
      req.session.messageDate = null;
    } catch (err) {
      console.log(err);
    }
  }
  //[GET] Account page
  async accountPage(req, res, next) {
    try {
      let accountsAndClinics = await getListAccounts();
      let accounts = accountsAndClinics[0];
      let clinics = accountsAndClinics[1];
      let messageExist = req.session.messageExist;
      res.render("admin/account_view", { accounts, clinics, messageExist });
      req.session.messageExist = null;
    } catch (err) {
      console.log(err);
    }
  }
  //[GET] Clinic page
  async clinicPage(req, res, next) {
    try {
      let messageExist = req.session.messageExist;
      let clinics = await getListClinics();
      res.render("admin/clinic_view", {
        clinics,
        messageExist,
      });
      req.session.messageExist = null;
    } catch (err) {
      console.log(err);
    }
  }
  //[GET] Apointment page
  async appoinmentPage(req, res, next) {
    try {
      let appointment = await getAppointment();
      for (let p of appointment) {
        let user = await getUserById(p.userID);
        let doctor = await getUserById(p.doctorID);
        p.nameUser = user.firstName + " " + user.lastName;
        p.nameDoctor = doctor.firstName + " " + doctor.lastName;
      }
      res.render("admin/appointment_view", {
        appointment,
      });
    } catch (err) {
      console.log(err);
    }
  }
  //[GET] Transaction page
  async transactionHistoryView(req, res, next) {
    try {
      let appointment = await transactionHistoryManage();
      for (let p of appointment) {
        let user = await getUserById(p.userID);
        let doctor = await getUserById(p.doctorID);
        p.nameUser = user.firstName + " " + user.lastName;
        p.nameDoctor = doctor.firstName + " " + doctor.lastName;
        p.balance = p["TransactionHistory.balance"];
      }
      res.render("admin/transactionHistory_view", {
        appointment,
      });
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = new AdminController();
