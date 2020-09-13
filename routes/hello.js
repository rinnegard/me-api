const express = require('express');
const router = express.Router();

router.get('/:msg', function(req, res, next) {
    const data = {
        data: {
            msg: req.params.msg
        }
    };

    res.json(data);
});

module.exports = router;
