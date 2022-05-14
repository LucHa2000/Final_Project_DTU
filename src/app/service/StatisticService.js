const db = require('../models/index');
import { Op } from 'sequelize';

//Thống kê tổng
let statisticalCalculation = () => {
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
      if (countDoctor || countUser || countClinic || countTransaction || revenue || dateTran) {
        resolve([countDoctor, countUser, countClinic, countTransaction, revenue, dateTran]);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};
//Thống kê 5 giao dịch gần nhất
let statisticsAppointment = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let transacsionDetail = await db.Appointment.findAll({
        raw: true,
        where: {
          isCanceled: 2,
        },
        include: [
          {
            model: db.TransactionHistory,
            attributes: ['balance'],
          },
        ],
        order: [['date', 'DESC']],

        limit: 5,
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

//[Thống kê giaod dịch theo ngày
let statisticsByDay = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let transacsionDetail = await db.Appointment.findAll({
        raw: true,
        where: {
          isCanceled: 2,
          date: {
            [Op.gte]: data.startDate,
            [Op.lte]: data.endDate,
          },
        },
        include: [
          {
            model: db.TransactionHistory,
            attributes: ['balance'],
          },
        ],
        order: [['date', 'DESC']],
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

module.exports = {
  statisticalCalculation,
  statisticsByDay,
  statisticsAppointment,
};
