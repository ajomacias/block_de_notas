const tableUsers = require('../models/users');
const tableNotes = require('../models/notas');
const { Op } = require("sequelize");
const controller = {};

/*_________________________________________________________________________*/

controller.loguearse = async (req, res, next) => {    //LOGUEARSE
  const usuario = req.body.usuario;
  const calave = req.body.password;
  const data = await tableUsers.findOne({
    attributes: ['id', 'name_user', 'clave_user'],
    where: {
      [Op.or]: [{ name_user: `${usuario}` },
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

/*_________________________________________________________________________*/

controller.registrarse = async (req, res, next) => {   //REGISTRARSE
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

/*_________________________________________________________________________*/

controller.setNote = async (req, res, next) => {    //INGRESAR NOTA
  if (!req.session?.loggedin) {
    return  res.redirect('/noLog');
  }
  const titulo = req.body.titulo;
  const cuerpo = req.body.cuerpo;
  const important = req.body.import;
  const id = req.session.id_user;
  const exist = await tableNotes.findOne({
    where: { text: `${cuerpo}` }
  })
  if (exist) {
    return res.send("Ya existe una nota con el mismo cuerpo");
  }
  await tableNotes.create({
    title: titulo,
    userId: id,
    text: cuerpo,
    importance: important,
  })
  return res.send("nota añadida");
}

/*_________________________________________________________________________*/

controller.deleteNote = async (req, res, next) => {  //ELIMINAR NOTA
  if (!req.session?.loggedin) {
    return  res.redirect('/noLog');
  }
  const id = req.params.id;
  await tableNotes.destroy({
    where: { id: `${id}` }
  })
  return res.send("Se a eliminado la nota");
}

/*_________________________________________________________________________*/

controller.editNote = async (req, res, next) => {  //EDITAR NOTA
  if (!req.session?.loggedin) {
    return  res.redirect('/noLog');
  }
  const idUser = req.session.id_user;
  const idNote = req.body.id;
  const titleForm = req.body.titulo;
  const textForm = req.body.cuerpo;
  const important = req.body.import;

  await tableNotes.updateNote({
    title: titleForm,
    text: textForm,
    importance: important
  }, {
    where: {
      id: `${idNote}`
    }
  })
  res.send("paso");
}

/*_________________________________________________________________________*/

controller.changePassword = async (req, res, next) => {      //CAMBIAR CONTRASEÑA
  if (!req.session?.loggedin) {
    return  res.redirect('/noLog');
  }
  const id = req.session.id_user;
  const newPassword = req.body.password;
  await tableUsers.update(
    { clave_user: newPassword }, {
    where: {
      id: `${id}`
    }
  })
  res.send("se a cambiado la contraseña");

}

module.exports = controller;