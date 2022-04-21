const express = require("express");
const router = express.Router();
import { getAppandMessage } from "../service/AppoinmentsService";
class DoctorController {
  index(req, res, next) {
    res.send(req.params.doctorId);
  }
}
module.exports = new DoctorController();
