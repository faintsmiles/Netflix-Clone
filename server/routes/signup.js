const express = require('express');
const router = express.Router();

const signup_controller = require('../controllers/signupController')

router.post('/', signup_controller.createAccount);


module.exports = router;