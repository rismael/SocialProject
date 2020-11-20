var express = require('express');
const igAuth = require('../public/javascripts/insta_auth_link');
var bodyParser = require('body-parser');
const { response } = require('../app');
var jsonParser = bodyParser.json()
// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var router = express.Router();


/* GET igAuth listing. */
router.get('/', function(req, res, next) {
    var link = igAuth.makeLink();
    res.send(link);
});

router.post('/', function(req, res, next){
        if(!req.body) {
            console.log('failed');
            return res.sendStatus(400);
        }
        if(req.body.code){
            console.log('runing');
            igAuth.getToken(req.body.code);
        }
        res.sendStatus(200);
})

module.exports = router;