const tableUsers = require('../models/users');
const tableNotes = require('../models/notas');
const { findOne, findAll } = require('../models/users');
const { Op } = require("sequelize");


const controller = {};


controller.loguearse = async (req, res, next) => {
  const usuario = req.body.usuario;
  const calave = req.body.password;
  const data = await tableUsers.findOne({
    attributes: ['id', 'name_user', 'clave_user'],
    where: {
      [Op.or]: [
        { name_user: `${usuario}` },
        { clave_user: `${calave} ` }
      ]
    }
  });
  if (data) {
    req.session.loggedin = true;
    req.session.nombre = data["dataValues"].name_user;
    req.session.id_user = data["dataValues"].id;
    const usuario1 = req.session.nombre;
    const id = req.session.id_user;
    return res.send({ id, usuario1 });
  }

  return res.send("contraseña o usuario incorrectos ");

}

controller.registrarse = async (req, res, next) => {
  const usuario = req.body.usuario;
  const calave = req.body.password;
  const data = await tableUsers.findOne({
    attributes: ['id', 'name_user', 'clave_user'],
    where: {
      [Op.or]: [
        { name_user: `${usuario}` },
      ]
    }
  });
  if (data) {
    return res.send("Este nombre de usuario ya existe");
  }
  const newUser = await tableUsers.create({
    name_user: usuario,
    clave_user: calave,
  });
  req.session.loggedin = true;
  req.session.nombre = newUser.name_user;
  req.session.id_user = newUser.id;
  const usuario1 = req.session.nombre;
  const id = req.session.id_user;
  return res.send({ id, usuario1 });
}

controller.setNote = async(req,res,next)=>{
  if(req.session.loggedin==true){
    return res.send("Primero debe logearse")
  }
  const titulo = req.body.titulo;
  const cuerpo = req.body.cuerpo;
  const important = req.body.import;
  const id = req.session.id_user;
  const exist = await tableNotes.findOne({
    where:{
      text:`${cuerpo}`,
    }
  })
  if(exist){
    return res.send("Ya existe una nota con el mismo cuerpo");
  }
  await tableNotes.create({
    title:titulo,
    userId:id,
    text:cuerpo,
    importantance:important,
  })
  return res.send("nota añadida");
}

module.exports = controller;