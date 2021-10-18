const tableUsers = require('../models/users');
const tableNotes = require('../models/notas');
const { findOne, findAll } = require('../models/users');
const { Op } = require("sequelize");


const controller = {};


controller.loguearse = async (req, res, next) => {
  const usuario = req.body.usuario;
  const calave = req.body.password;
  const data = await tableUsers.findOne({
    attributes: ['name_user', 'clave_user'],
    where: {
      [Op.or]: [
        { name_user: `${usuario}` },
        { clave_user: `${calave} ` }
      ]
    }
  });
  if (data) {
    return res.send("logueado");
  }
  return res.send("contraseña o usuario incorrectos ");

}



module.exports = controller;