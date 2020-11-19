var express = require('express');
var router = express.Router();

/* GET Google Auth listing. */
router.get('/', function(req, res, next) {
  res.send('Help me');
});

module.exports = router;
