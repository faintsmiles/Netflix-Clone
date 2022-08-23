const express = require('express');
const router = express.Router();

router.get('/', (req,res,next) => {
    res.json({Message: 'Currently in root directory.', Route: '/' })
})

module.exports = router;