require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// RUTAS DE MIS CONTROLADORES
app.use( require('./controllers/usuario') );

app.listen(process.env.PORT, () => {
    console.log(`Escuchando en puerto ${ process.env.PORT }`)
});

const mongoConnect = async() => {
    try {
        await mongoose.connect(process.env.URLDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log('Base de datos online')
    } catch (error) {
        console.log("Error: ",error);
    }
}

mongoConnect();