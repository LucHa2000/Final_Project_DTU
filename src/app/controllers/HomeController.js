const express = require("express");
const router = express.Router();

import { getDoctorsClinics, getClinics } from "../service/HomepageService";

class HomeController {
  async index(req, res, next) {
    let doctors = await getDoctorsClinics();
    let clinics = await getClinics();
    res.render("user/doctor-list", { doctors, clinics });
    res.send({ doctors, clinics });
  }
}

module.exports = new HomeController();
