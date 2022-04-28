const express = require('express');
const router = express.Router();

import { getListAccounts } from '../service/AccountService';
import { getListClinics } from '../service/ClinicService';

class AdminController {
  async index(req, res, next) {
    res.render('admin/home');
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
