const tableUsers = require('../models/users');
const tableNotes = require('../models/notas');

const controller = {};

controller.inicio = (req, res,next) => {
   tableUsers.create({
      name_user:"manuel",
      clave_user:"123"
   }
   ).then((users) => {
       res.json(users);
   })

   
}


module.exports = controller;