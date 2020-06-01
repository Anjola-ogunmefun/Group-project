// const config = require('config');
// const jwt = require('jsonwebtoken');
// const Joi = require('joi');
const mongoose = require('mongoose');
//const token = require('./token')
const { Schema } = mongoose;

const CompanySchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
      },
      email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    token: {
     type: String,
      required: true,
      unique: true
     },
     expired:{
      type: Boolean,
      default: false,
      required: true
     },
     createdAt:{
      type: Date,
      required: true,
      default: Date.now()
  },
    //give different access rights if admin or not 
    isAdmin: Boolean
 },
 //{
//   timestamps: true,
// }
);

 const CompanyModel = mongoose.model('new company', CompanySchema);



// //custom method to generate authToken 
// CompanySchema.methods.generateAuthToken = function() { 
//   const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('myprivatekey')); //get the private key from the config file -> environment variable
//   return token;
// }


// //function to validate user 
// function validateUser(user) {
//   const schema = {
//     name: Joi.string().min(1).max(50).required(),
//     email: Joi.string().min(5).max(255).required().email(),
//     token: Joi.string()
   
//   };

//   return Joi.validate(user, schema);
// }


//   const time = Date.now()
//     const timeNow = time - CompanySchema.createdAt

//     if( ` ${Math.floor(timeNow / 1000)} >= 180 ` ){
//       CompanySchema.expired === true
//     }

exports.Company = CompanyModel; 
//exports.validate = validateUser;

