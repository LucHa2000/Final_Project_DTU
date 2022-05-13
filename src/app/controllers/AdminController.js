const express = require('express');
const router = express.Router();

import { getListAccounts } from '../service/AccountService';
import { getUserById } from '../service/UserService';
import { getListClinics } from '../service/ClinicService';
import {
  statisticalCalculation,
  statisticsByDay,
  statisticsAppointment,
} from '../service/StatisticService';
class AdminController {
  //[GET] statistic
  async index(req, res, next) {
    let statistics = await statisticalCalculation();

    let appoinments = await statisticsAppointment();

    for (let e of appoinments) {
      e.tranBalence = e['TransactionHistory.balance'];
    }

    let doctorNumberNumber = statistics[0];
    let userNumber = statistics[1];
    let clinicNumber = statistics[2];
    let transacsionNumber = statistics[3];
    let revenue = statistics[4];
    res.render('admin/home', {
      doctor: doctorNumberNumber,
      user: userNumber,
      clinicsss: clinicNumber,
      transacsion: transacsionNumber,
      revenue,
      Transactions: appoinments,
    });
  }

  //[POST]
  async PickStatisticsPage(req, res, next) {
    let statistic = await statisticalCalculation();

    let doctor = statistic[0];
    let user = statistic[1];
    let clinicsss = statistic[2];
    let transacsion = statistic[3];
    let revenue = statistic[4];

    let detailTransaction = await statisticsByDay(req.body);
    for (let e of detailTransaction) {
      e.tranBalence = e['TransactionHistory.balance'];
    }

    res.render('admin/home', {
      doctor,
      user,
      clinicsss,
      transacsion,
      revenue,
      Transactions: detailTransaction,
    });
  }
  //[GET] Account
  async accountPage(req, res, next) {
    let accountsAndClinics = await getListAccounts();
    let accounts = accountsAndClinics[0];
    let clinics = accountsAndClinics[1];
    res.render('admin/account_view', { accounts, clinics });
  }
  //[GET] Clinic
  async clinicPage(req, res, next) {
    try {
      let clinics = await getListClinics();
      res.render('admin/clinic_view', {
        clinics,
      });
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = new AdminController();
