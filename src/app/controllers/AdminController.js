const express = require("express");
const router = express.Router();

import { getListAccounts } from "../service/AccountService";
import {
  findAllClinicAnDoctorWithClinic,
  getListClinics,
} from "../service/ClinicService";

class AdminController {
  async index(req, res, next) {
    res.render("admin/home");
  }

  async accountPage(req, res, next) {
    let accounts = await getListAccounts();
    res.render("admin/account_view", { accounts });
  }

  async clinicPage(req, res, next) {
    try {
      let clinics = await getListClinics();
      let doctorsWithClinicName = [];
      for (let e of clinics) {
        e.firsName = e["User.firstName"];
        e.lastName = e["User.lastName"];
        doctorsWithClinicName.push(e);
      }
      res.render("admin/clinic_view", {
        clinics: doctorsWithClinicName,
      });
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = new AdminController();
