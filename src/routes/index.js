const express = require('express');
const router = express.Router();
const controller = require('../controllers/cntr_routes');

router.get('/', controller.inicio);

router.get('/login', (req, res, next) => {
    res.send("HOLAHOLAHOLA");
});

router.get('/buscar', (req, res, next) => {
    res.send("HOLAHOLAHOLA");
});

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