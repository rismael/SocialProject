var express = require('express');
const igAuth = require('../public/javascripts/insta_auth_link');
var router = express.Router();

/* GET igAuth listing. */
router.get('/', function(req, res, next) {
    var link = igAuth.makeLink();
    res.send(link);
});

module.exports = router;