const express = require('express');
var router = express.Router();
const controller = require('../controllers/cntr_routes');
var bodyParser = require('body-parser');
var app = express();
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: true }))
 
// parse application/json
router.use(bodyParser.json())

router.get('/',(req,res,next)=>{
    res.render("index.ejs");
});

router.get('/login', (req, res, next) => {
    res.render('login.ejs');
});

router.get('/registro', (req, res, next) => {
    res.render('registro.ejs');
});


router.post('/login',controller.loguearse );

router.get('/notas', (req, res, next) => {
    res.send("HOLAHOLAHOLA");
});

router.get('/agregar_nota', (req, res, next) => {
    res.send("HOLAHOLAHOLA");
})

router.get('/ver_nota', (req, res) => {
res.send("ver_nota")
});


module.exports = router;