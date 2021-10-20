const tablaUsers = require('../models/users');
const tablaNotes = require('../models/notas');
const { Oq } = require('sequelize');

const controller = {};

controller.login = (req, res, next) => {
    res.render('login.ejs');
}

controller.register = (req, res, next) => {
    res.render('registro.ejs');
}

controller.getNota = async(req, res, next)=>{
    if(!req.session?.loggedin){
        return  res.redirect('/noLog');
    }
    const idNote = req.params.id;
    const nota = await tablaNotes.findOne({
        where:{
            id:`${idNote}`
        }
    })
    console.log(nota);
    res.send(nota);
}

controller.destroySession = async(req,res,next)=>{
    await req.session.destroy();
     res.redirect('/');
}


module.exports = controller;