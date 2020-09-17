const express = require('express');
const router = express.Router();
const reports = require('../models/reports.js');

router.get('week/:id', function(req, res, next) {
    const data = {
        data: {
            msg: req.params.id
        }
    };

    res.json(data);
});

router.post('/', function(req, res, next) {
    const data = {
        data: {
            msg: req.params.id
        }
    };

    res.json(data);
});

module.exports = router;
