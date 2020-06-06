const companyServices = require('../services/index');
const AuthServices = require('../services/auth');

const  { Resend, validate } = require("../models/resend");
const sendEmail = require('../entry/mail');

const UpdateModel = require('../models/update');
const countryList = require('country-list');

class companyController {
    inviteCompany(req, res){
        const { email, name, token } = req.body;

        if(Object.keys(req.body).length === 0) {
            return res.status(400).send(`We are not here to joke!,  
                                        Field cannot be empty`)
    
        }
        if(!name || !email || !token){
            return res.send('kindly add name, token to body')
        }
            
        const newCompany = {
            name,
            email,
            token
        }
    
    
        return new companyServices().createCompany(newCompany)
            .then((data) => {
               sendEmail(email, name, token)
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
            });
    };


    validateToken(req, res){
            const { email, token } = req.query
            if(!email || !token){
                return res.status(400).send({
                    error: true,
                    code: 400,
                    message: "token and email must be passed to the query parameter"
                })
            }
            return this.checkIfTokenExpired(email, token, res)
        }
    
        async checkIfTokenExpired(email, token, res){
            const companyRecord = await new companyServices().findOne(email);
            if(!companyRecord){
                return res.send({
                    error: true,
                    code: 404,
                    message: "Company not registered"
                })
            }
            if(companyRecord.token !== token){
                return res.send({
                    error: true,
                    code: 401,
                    message: "Token does not match the required token"
                })
            }

            console.log('companyRecord', companyRecord)
            const creationTime = companyRecord.createdAt;
            console.log('creationTime', creationTime);
            console.log('creation time', creationTime.getTime())
            console.log('new time', new Date().getTime())
            
            let difference = new Date().getTime() - creationTime.getTime() 
    
            let daysDifference = Math.floor(difference/1000/60/60/24);
            difference = difference - daysDifference*1000*60*60*24
            if(daysDifference > 2){
                companyRecord.status = 'expired';
                companyRecord.inviteTokenExpired = true;
                companyRecord.save()
                return res.status(401).send({
                    error: true,
                    code: 401,
                    message: "Invite token has expired"
                })
                
            } else {
                companyRecord.status = 'active';
                companyRecord.inviteTokenExpired = false;
                companyRecord.save()
                return res.status(200).send({
                    error:false,
                    code: 200,
                    message: "Invite accepted successfully"
                })
            }
            // console.log('days diff', daysDifference)
            // let hoursDifference = Math.floor(difference/1000/60/60);
            // difference -= hoursDifference*1000*60*60
    
            // let minutesDifference = Math.floor(difference/1000/60);
            // difference = difference - minutesDifference*1000*60
    
            // let secondsDifference = Math.floor(difference/1000);
    
            // console.log('difference = ' + 
            // daysDifference + ' day/s ' + 
            // hoursDifference + ' hour/s ' + 
            // minutesDifference + ' minute/s ' + 
            // secondsDifference + ' second/s ');
    };
       

    resendEmail(req, res){
            const { error } = validate(req.body);
            const { email, name} = req.body;

            if (error) return res.status(400).send(error.details[0].message);
            
            let user = new Resend({
            name: req.body.name,
            email: req.body.email
            });
            user.save()
    
       
            const token = new AuthServices().login(user)
            console.log('token:', token)
            res.header("x-auth-token", token).send({
            _id: user._id,
            name: user.name,
            email: user.email, 
            token
            });

            return sendEmail(email, name, token)
      
        };
    
 

            
            
    
            
        

       
    
                
        
    



    updateCompany(req, res){

        const { sector, staffSize, country, state, address, description, department, phoneNumber} = req.body;
        

        //logs the entered update to the console
        console.log('company update:', info)


        //SECTOR
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


        //COUNTRY
        //console.log(countryList.getNames());
        
        if(country === ''){ // should show list of countries
            return res.send(countryList.getNames())
        };

        if(country === countryList['']){ // should return selected country
            return res.send(country)
        }

        //ADDRESS
        

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

        return new companyServices().updateCompany(update)
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


    }

    


};


module.exports = companyController;