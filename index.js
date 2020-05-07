const express = require('express');
const app = express();

const mongoose = require('./db');
const entryRoute = require('./entry/add-coy')


const port = 3400;

app.use('/', entryRoute)


app.listen(port, () => {
    console.log(`Project is running on port ${port}`)
})