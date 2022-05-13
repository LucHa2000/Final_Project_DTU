const express = require('express');
const router = express.Router();

import { getListAccounts } from '../service/AccountService';
import { getUserById } from '../service/UserService';
import { getListClinics } from '../service/ClinicService';
import { getCountDoctos, statisticByDate, getTransaction } from '../service/StatisticService';

class AdminController {
  //[APPOINMENT]
  // async index(req, res, next) {
  //   let appointment = await getTransaction();
  //   for (let p of appointment) {
  //     let user = await getUserById(p.userID);
  //     let doctor = await getUserById(p.doctorID);
  //     p.nameUser = user.firstName + ' ' + user.lastName;
  //     p.nameDoctor = doctor.firstName + ' ' + doctor.lastName;
  //   }
  //   res.send(appointment);

  async index(req, res, next) {
    let startDate = req.query.startDate;
    let endDate = req.query.endDate;

    let statistic = await getCountDoctos();

    let detailTransaction = await getTransaction(startDate, endDate);
    for (let e of detailTransaction) {
      e.tranBalence = e['TransactionHistory.balance'];
    }

    let doctor = statistic[0];
    let user = statistic[1];
    let clinicsss = statistic[2];
    let transacsion = statistic[3];
    let revenue = statistic[4];

    res.render('admin/home', {
      doctor,
      user,
      clinicsss,
      transacsion,
      revenue,
      Transactions: detailTransaction,
    });
  }

  //[POST]
  async PickStatisticsPage(req, res, next) {
    let statistics = await statisticByDate(req.body.start_date, req.body.end_date);
    let transacsion = statistics[5];
    res.send(transacsion);
    res.render('admin/home', transacsion);
  }

  async accountPage(req, res, next) {
    let accountsAndClinics = await getListAccounts();
    let accounts = accountsAndClinics[0];
    let clinics = accountsAndClinics[1];
    res.render('admin/account_view', { accounts, clinics });
  }

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
