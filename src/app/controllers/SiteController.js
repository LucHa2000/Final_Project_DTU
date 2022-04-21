const express = require("express");
const router = express.Router();
import { findAllClinicAnDoctorWithClinic } from "../service/ClinicService";
import {
  getDoctorByClinicId,
  getDoctorAndResumeById,
} from "../service/DoctorService";
class SiteController {
  async index(req, res, next) {
    try {
      let data = await findAllClinicAnDoctorWithClinic();
      let clinics = data[0];
      let doctors = data[1];
      let doctorsWithClinicName = [];
      for (let e of doctors) {
        e.clinicName = e["Clinic.name"];
        doctorsWithClinicName.push(e);
      }
      res.render("user/home", {
        clinics: clinics,
        doctors: doctorsWithClinicName,
      });
    } catch (err) {
      console.log(err);
    }
  }
  async displayDoctors(req, res, next) {
    const clinicId = req.params.clinicId;
    let doctors = await getDoctorByClinicId(clinicId);
    let listDoctorsRender = [];
    for (let e of doctors) {
      e.clinicName = e["Clinic.name"];
      listDoctorsRender.push(e);
    }
    //res.send(doctors);
    res.render("user/doctorFollowClinic", { doctors: listDoctorsRender });
  }
  async doctorDetail(req, res, next) {
    const doctorId = req.params.doctorId;
    let doctor = await getDoctorAndResumeById(doctorId);

    doctor.resumeTitle = doctor["Resume.title"];
    doctor.resumeDescription = doctor["Resume.description"];
    doctor.resumeStarNo = doctor["Resume.starNo"];
    //res.send(doctor);
    res.render("user/detailDoctor", { doctor: doctor });
  }
}
module.exports = new SiteController();
