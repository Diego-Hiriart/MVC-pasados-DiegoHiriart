var express = require('express');
const port = process.env.PORT || 4000;
var cors = require('cors');//Cross origin resource sharing

require('../database/mongo')

const user = require('../routes/user');
const borrowing = require('../routes/borrowing');

const app = express();//Creates the app (I think)

app.use(cors())

app.use(express.json())

//Routes for this backend
app.use('/user', user)
app.use('/borrowing', borrowing)

module.exports = app