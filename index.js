const express = require('express');
const app = express();

const nodemailer = require('nodemailer');
const mongoose = require('./db');
const entryRoute = require('./entry/add-coy');
const infoRoute = require('./entry/info');

// const transport = require('./entry/mail')

const port = 3400;

app.use('/', entryRoute)
app.use('/', infoRoute)




app.listen(port, () => {
    console.log(`Project is running on port ${port}`)
})