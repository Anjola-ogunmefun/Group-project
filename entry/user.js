const express = require('express');
const {Company, validate } = require("../models/company");
const auth = require("../middleware/auth");
//const bcrypt = require("bcrypt");
const bodyParser = require('body-parser')
 
const userRoute = express.Router();
// parse application/x-www-form-urlencoded
userRoute.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
userRoute.use(bodyParser.json())


userRoute.get('/check', (req, res) => {
    res.send('Logged in!')
})

userRoute.post("/login", auth, async (req, res) => {
    
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    //find an existing user
    let user = await Company.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered.");
  
    user = new Company({
      name: req.body.name,
      email: req.body.email
      
     
    });

    
    const token = user.generateAuthToken();
    console.log(token)
    res.header("x-auth-token", token).send({
      _id: user._id,
      name: user.name,
      email: user.email, 
      token: user.token
    });
    module.exports = token;
  });



module.exports = userRoute;