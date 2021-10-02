const express = require('express');
const indexRouter = require('./routes/index')
const sequelize = require('./database/db')
const app = express();
const PORT = process.env.PORT || '4000';

app.use("/",indexRouter);


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);

        sequelize.sync({force: false}).then(() => {
            console.log("siiii")
        }).catch((err) => {
            console.log("error",err);
        })
       
});
