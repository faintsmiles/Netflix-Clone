const express = require('express');
const router = express.Router();

const logout_controller = require('../controllers/logoutController')


router.get('/', logout_controller.logoutAccount);

module.exports = router;