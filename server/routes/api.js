const express = require('express');
const router = express.Router();

const api_controller = require('../controllers/apiController');


router.get('/', api_controller.sendData);

router.get('/:id', api_controller.getSpecificMovie);


module.exports = router;