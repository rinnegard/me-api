const express = require('express');
const auth = require('../models/auth.js');
const router = express.Router();


router.post('/', function(req, res, next) {
    auth.register(res, req.body.email, req.body.password)
    res.json(data);
});

module.exports = router;
