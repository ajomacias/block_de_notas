const express = require('express');
const indexRouter = require('./routes/index')
const sequelize = require('./database/db')
const app = express();
const path = require('path');
const PORT = process.env.PORT || '4000';
const bodyParser = require("body-parser");
var session = require('express-session')

app.use(session({
  secret: "notas_anma",
  resave: false,
  saveUninitialized: false
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use("/", indexRouter);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);

  sequelize.sync({ force: false }).then(() => {
    console.log("siiii")
  }).catch((err) => {
    console.log("error", err);
  })

});