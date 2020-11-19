var express = require('express');
var router = express.Router();

/* GET Users listing. */
router.get('/', function(req, res, next) {
  res.send('Help me');
});

module.exports = router;
