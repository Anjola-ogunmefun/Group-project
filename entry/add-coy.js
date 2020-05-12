const express = require('express');
const CompanyModel = require('../models/company');
const bodyParser = require('body-parser');
const sendEmail = require('./mail')


// const port = 3400;

const entryRoute = express.Router();

entryRoute.use(bodyParser.json());

entryRoute.get('/', (req, res) => {
     res.send('Welcome to our app!')
});


entryRoute.post('/add-company', (req, res) => {

    const input = req.body;
    const name = input.name;
    const email = input.email;

    console.log('new company', input)

    if(Object.keys(input).length === 0) {
        return res.status(400).send(`We are not here to joke!,  
                                    Field cannot be empty`)
    }
    if(!name){
        return res.send('input company name')
    }
    if(!email){
        return res.send('email is a required field')
    }
   

    const newCompany = {
        name,
        email
    }


    CompanyModel.create(newCompany)
    .then((data) => {
        sendEmail(email, name)
        console.log('A new company was added', data)
        return res.status(201).send({
            code: 201,
            error: false,
            message: `${name} has been added successfully`,
            data: newCompany
        });
    })
    .catch((error) => {
        console.log('There was an error saving the data', error)
        return res.status(500).send({
            code: 500,
            error: true,
            message: "Could not save record!"
        });
    })

    

})



module.exports = entryRoute;