var express = require('express');
var router = express.Router();
let multer = require('multer');
const upload = multer({
  dest: 'src/public/uploads/',
});

const adminController = require('../app/controllers/AdminController');

router.get('/account', adminController.accountPage);
router.get('/clinic', adminController.clinicPage);
router.post('/statisticsByDay', adminController.PickStatisticsPage);
router.use('/', adminController.index);
module.exports = router;
