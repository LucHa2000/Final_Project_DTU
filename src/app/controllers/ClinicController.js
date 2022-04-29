const express = require('express');
const router = express.Router();

import {
  createNewClinic,
  updateClinic,
  getClinicById,
  deleteClinic,
} from '../service/ClinicService';

class ClinicController {
  //[GET];
  async pageUpdateClinic(req, res, next) {
    let clinic = await getClinicById(req.params.id);

    if (clinic) return res.render('admin/clinic_update', { clinic });

    return res.redirect('/back');
  }

  //[POST]
  async storeClinic(req, res, next) {
    if (!req.file) {
      req.body.image = '';
    } else {
      req.body.image = req.file.path.split('\\').slice(3).join();
    }
    let formData = req.body;
    if (formData === null) return res.redirect('back');
    let newClinic = await createNewClinic(formData);
    if (!newClinic) return res.redirect('/error');
    res.redirect('/admin/clinic');
  }

  //[POST] UPDATE
  async changeClinic(req, res, next) {
    req.body.id = req.params.id;

    if (!req.file) {
      req.body.image = '';
    } else {
      req.body.image = req.file.path.split('\\').slice(3).join();
    }

    let clinic = await updateClinic(req.body);

    if (clinic) return res.redirect('/admin/clinic');

    return console.log('update fail');
  }

  async deleteClinic(req, res, next) {
    let clinic = await deleteClinic(req.params.id);

    if (clinic) return res.redirect('back');

    return console.log('delete fail');
  }

  async pageInfoClinic(req, res, next) {
    // try {
    //   let clinics = await getListClinicsDoctor();
    //   let doctorsWithClinicName = [];
    //   for (let e of clinics) {
    //     e.firsName = e['User.firstName'];
    //     e.lastName = e['User.lastName'];
    //     doctorsWithClinicName.push(e);
    //   }
    //   res.render('admin/clinic_info', {
    //     clinics: doctorsWithClinicName,
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
    res.render('admin/clinic_info');
  }
}

module.exports = new ClinicController();
