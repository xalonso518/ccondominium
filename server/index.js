const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const path = require('path');
const { mongoose } = require('./config/database');

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

app.use(cors({origin: 'http://localhost:4200'}));

//Routes
app.use('/api/auth/', require('./routes/auth.routes'));
app.use('/api/usuario/', require('./routes/usuario.routes'));
app.use('/api/config/', require('./routes/config.routes'));
app.use('/api/tipoCuota/', require('./routes/tipoCuota.routes'));
app.use('/public', express.static('public'))


//Starting server
app.listen(app.get('port'), () => {
    console.log("Server on port", app.get('port'));
});