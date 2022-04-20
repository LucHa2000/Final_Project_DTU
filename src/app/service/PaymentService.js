const paypal = require('paypal-rest-sdk');
const db = require('../models/index');
const UserService = require('./UserService');
const sampleService = require("./SampleService")

const checkAccountBalance = (id) => {
    return new Promise(async (resolve, reject) => {
        try{
            let userBalance = await db.User.findOne({
                attributes: [balance],
                where: {
                    id: id
                }
            })
            resolve(userBalance)
        } catch(e){
            reject(e)
        }
    })
}

// const updateAccountBalance = (id, amount) => {
//     return new Promise(async (resolve, reject) => {
//         try{
//             let user = await db.User.findOne(
//                 {
//                     where: {id: id},
//                     raw: true,
//                 })
//             if(user){
//                 console.log(user);
//                 const balance = user.balance + amount;
//                 await user.update({balance: balance});
//                 console.log("updated: " + user);
//                 resolve()
//             }
//         } catch(e) {
//             reject(e)
//         }
//     })
// }

let updateAccountBalance = (id, amount) => {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await db.User.findOne({
          where: { id: id },
        });
        if (user) {
          user.balance = user.balance + amount;
          await user.save();
          resolve(); //return
        } else {
          resolve(); //return
        }
      } catch (e) {
        reject(e);
      }
    });
  };

module.exports = {
    checkAccountBalance,
    updateAccountBalance
}