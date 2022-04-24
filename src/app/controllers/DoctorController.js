const express = require("express");
const router = express.Router();
import { getAppointmentsByUserID } from "../service/AppoinmentService";
import { getUserById, updateUser } from "../service/UserService";
import { getResumeById, updateResume } from "../service/DoctorService";

class DoctorController {
  async index(req, res, next) {
    const userId = req.session.userID;
    let account = await getUserById(userId);
    res.render("doctor/edit_profile", { account: account });
  }
  async changeAccountDoctor(req, res, next) {
    if (!req.file) {
      req.body.image = "";
    } else {
      req.body.image = req.file.path.split("\\").slice(3).join();
    }
    let accountChanged = await updateUser(req.body);
    if (accountChanged) {
      res.redirect("back");
    } else {
      console.log("Change failed !");
    }
  }
  //render workHistory Page
  async workHistory(req, res) {
    let appointments = await getAppointmentsByUserID(req.session.userID, 2);
    console.log(appointments);
    res.render("doctor/workHistory", { appointments: appointments });
  }
  async doctorResume(req, res) {
    let resume = await getResumeById(req.session.resumeID);
    res.render("doctor/resumeDoctor", { resume: resume });
  }
  async changeResume(req, res) {
    console.log(req.body.description.trim());
    let resumeUpdated = await updateResume(req.body);

    if (resumeUpdated) {
      res.redirect("back");
    } else {
      console.log("update failed !");
      return;
    }
  }
}
module.exports = new DoctorController();
