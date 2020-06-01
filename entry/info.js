const express = require('express');
const bodyParser = require('body-parser');
const UpdateModel = require('../models/update');
const countryList = require('country-list');


const infoRoute = express.Router();

infoRoute.use(bodyParser.json());



// A base route
infoRoute.get('/home', (req, res) =>{
     res.send('This is another entry to our app!')
})

//This route is called when the client wants to update their database
infoRoute.post('/update', (req, res) => {

const info = req.body;
const sector = info.sector;
const staffSize = info.staffSize;
const country = info.country;
const state = info.state;
const address = info.address;
const description = info.description;
const department = info.department;
const phoneNumber = info.phoneNumber;

//logs the entered update to the console
console.log('company update:', info)

//array of sector lists to be picked from 
const sectorList = ["Finance","Aviation","Agriculture", "Real estate", " Education & Training", "Fashion", "Health care", "ICT", 
                "Oil & Gas", "Manufacturing", "Media & Entertainment", "Transport" ]

 
// in case company sector does not match any of the listed items, call this function to add the inputed sector to the array and also return the value
  function otherSector(){
     sectorList.push(sector)  
    }

otherSector()
console.log(sectorList)


//takes care of an empty field
if(Object.keys(info).length === 0){
    return res.send('Please add field')
}

//takes care of sector call
if(sector === sectorList['']){
    return res.send(sector)
 }
 else{
     otherSector;
 };


 //takes care of country call
 //console.log(countryList.getNames());
 
if(country === ''){ // should show list of countries
     return res.send(countryList.getNames())
 };

if(country === countryList['']){ // should return selected country
    return res.send(country)
}


const update = {
    sector,
    staffSize,
    country,
    state,
    address,
    description,
    department,
    phoneNumber
}


UpdateModel.create(update)
.then((data) => {
    console.log('company has added update:', update)
    return res.status(200).send({
        message:'Update successful',
        data: update
    })

})
.catch((error) => {
    console.log('An error occured while trying to save update', error)
    return res.status(500).send({
        code: 500,
        error: true,
        message: 'Couldnt save update'
    })
})


})





module.exports = infoRoute