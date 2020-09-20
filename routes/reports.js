const express = require('express');
const router = express.Router();
const reports = require('../models/reports.js');
const auth = require('../models/auth.js');

router.get('/week/:id', function(req, res, next) {
    reports.get(res, req.params.id)
});

router.get('/', function(req, res, next) {
    reports.getAll(res);
});

router.post('/',
    function(req, res, next) {
        auth.verify(req, res, next)
    },
    function(req, res, next) {
    reports.add(res, req.body.week, req.body.content)
});

module.exports = router;
