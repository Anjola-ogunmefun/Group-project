const companyController = require('../controller/index');
const bodyParser = require('body-parser');
// const express = require('express');

const route = require('express').Router();

route.use(bodyParser.json());
route.post('/add-company', (req, res) => {
    new companyController().inviteCompany(req, res);
});

module.exports = route;