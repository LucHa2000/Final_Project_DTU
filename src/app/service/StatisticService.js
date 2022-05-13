const db = require('../models/index');
import { Op } from 'sequelize';
let getCountDoctos = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let countDoctor = await db.User.count({
        col: 'id',
        where: { roleID: '2' },
        raw: true,
      });
      let countUser = await db.User.count({
        col: 'id',
        where: { roleID: '3' },
        raw: true,
      });
      let countClinic = await db.Clinic.count({
        col: 'id',
        raw: true,
      });
      let dateTran = await db.TransactionHistory.findAll({
        raw: true,
      });
      let countTransaction = await db.TransactionHistory.count({
        col: 'id',
        raw: true,
      });
      let revenue = await db.TransactionHistory.sum('balance', {
        raw: true,
      });
      console.log(countTransaction);
      resolve([countDoctor, countUser, countClinic, countTransaction, revenue, dateTran]);
    } catch (e) {
      reject(e);
    }
  });
};

let getTransaction = (startDate, endDate) => {
  return new Promise(async (resolve, reject) => {
    try {
      let transacsionDetail = await db.Appointment.findAll({
        raw: true,
        where: {
          isCanceled: 2,
          date: {
            [Op.gte]: startDate,
          },
          date: {
            [Op.lte]: endDate,
          },
        },
        include: [
          {
            model: db.TransactionHistory,
            attributes: ['balance'],
          },
        ],
      });
      if (transacsionDetail) {
        resolve(transacsionDetail);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};

//[appoinment]
// let getAppointment = () => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let appointment = await db.Appointment.findAll({
//         raw: true,
//       });
//       if (appointment) {
//         resolve(appointment);
//       } else {
//         resolve();
//       }
//     } catch (e) {
//       reject(e);
//     }
//   });
// };
let statisticByDate = (startDate, endDate) => {
  return new Promise(async (resolve, reject) => {
    try {
      let countDoctor = await db.User.count({
        col: 'id',
        where: {
          roleID: '2',
        },
        raw: true,
      });
      let countUser = await db.User.count({
        col: 'id',
        where: { roleID: '3' },
        raw: true,
      });
      let countClinic = await db.Clinic.count({
        col: 'id',
        raw: true,
      });
      let countTransaction = await db.TransactionHistory.count({
        col: 'id',
        raw: true,
      });
      let revenue = await db.TransactionHistory.sum('balance', {
        raw: true,
      });

      // let transacsionDetail = await db.Appointment.findAll({
      //   raw: true,
      //   where: {
      //     isCanceled: 2,
      //     date: {
      //       [Op.gte]: startDate,
      //     },
      //     date: {
      //       [Op.lte]: endDate,
      //     },
      //   },
      //   include: [
      //     {
      //       model: db.TransactionHistory,
      //       attributes: ['balance'],
      //     },
      //   ],
      // });
      resolve([countDoctor, countUser, countClinic, countTransaction, revenue]);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getCountDoctos,
  statisticByDate,
  getTransaction,
};
