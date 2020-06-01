const {User} = require("../models/user_model");
class AuthServices {
    login(user){ 
        return user.generateAuthToken();
    };

    findOne(email){
        return User.findOne({ email });
    }

};

module.exports = AuthServices;