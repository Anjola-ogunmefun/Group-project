const companyServices = require('../services/index')

class AuthController {
    login(req, res){
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
    
        //find an existing user
        let user = await new companyServices().findOne(email)
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
    };
};

module.exports = AuthController;