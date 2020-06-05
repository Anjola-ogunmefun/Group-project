const companyController = require('../controller/index');
const AuthController = require('../controller/auth');
const bodyParser = require('body-parser');
const mongoose = require('../db');
// const express = require('express');

const route = require('express').Router();

route.use(bodyParser.json());
route.post('/add-company', (req, res) => {
    return new companyController().inviteCompany(req, res);
});

route.post('/login', (req, res) => {
    return new AuthController().login(req, res);
})

route.post('/update', (req, res) => {
    return new companyController().updateCompany(req, res)
})

route.get('/validate', (req, res) => {
    return new companyController().validateToken(req, res)
})

module.exports = route;