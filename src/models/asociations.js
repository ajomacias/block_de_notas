const tableUsers = require("./users");
const tableNotes = require("./notas");

tableNotes.hasMany(tableUsers);