const express = require('express');
const CompanyModel = require('../models/company');

const port = 3400;

const entryRoute = express.Router();

entryRoute.get('/', (req, res) => {
     res.send('Welcome to our app!')
});


entryRoute.post('/add-company', (req, res) => {
    console.log('Testing input')

    const input = req.body;
    const name = input.name;
    const email = input.email;
    console.log('company', input);


    if(!name){
        return res.send({
            message: 'company name is required'
        })
    }

    if(!email) {
       return  res.send({
            messgae: 'email is required'
        })
    }
    
    if(!input){
        return res.send({
            message: 'Field cannot be empty'
        })
    }



    const newCompany = {
        name,
        email
    }
    
    CompanyModel.create(newCompany)
    .then((data) => {
        console.log('New company is created', data)
        return res.send({
            message:data
        })
})
.catch((error) => {
    console.log('There was an error saving the data', error)
    return res.status(500).send({
        code: 500,
        error: true,
        message: "Internal server error",
    });

});



app.listen(port, () => {
    console.log(`Project is running on port ${port}`)
})
})

module.exports = entryRoute;