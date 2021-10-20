const express = require('express');
var router = express.Router();
const controlPost = require('../controllers/controlPost');
const controlGet = require('../controllers/controlGet');
const bodyParser = require('body-parser');
const { constants } = require('crypto');
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
router.use(bodyParser.json())

router.get('/', (req, res, next) => {
    res.render("index.ejs");
});

router.get('/login', controlGet.login);
router.get('/ver_nota/:id', controlGet.getNota);
router.get('/cerrarSesion', controlGet.destroySession);
router.get('/registro', controlGet.register);

router.get('/noLog', (req, res, next) => {
    res.render("notLogger.ejs");
});

router.get('/notas', (req, res, next) => {
    res.send("HOLAHOLAHOLA");
});


router.post('/agregar_nota', controlPost.setNote);
router.post('/deleteNote/:id', controlPost.deleteNote);
router.post('/deleteNote/:id', controlPost.changePassword);
router.post('/editNote', controlPost.editNote);
router.post('/login', controlPost.loguearse);
router.post('/registrarse', controlPost.registrarse);

module.exports = router;