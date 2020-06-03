const express = require('express');
const app = express();

const route = require('./route/index');
const port = 3400;

const nodemailer = require('nodemailer');
const mongoose = require('./db');
// const entryRoute = require('./entry/add-coy');
// const infoRoute = require('./entry/info');
// const userRoute = require('./entry/user')


app.use('/', route)



//
// app.use('/', entryRoute)
// app.use('/', infoRoute)
// app.use('/', userRoute)




app.listen(port, () => {
    console.log(`Project is running on port ${port}`)
})