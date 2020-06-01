const {Company} = require("../models/company");

class companyServices {
    createCompany(param){
        return Company.create(param);
    };

    findOne(email){
        return Company.findOne({ email });
    };

    updateCompany(param){
        return companyServices.create(param)
    }
};


module.exports = companyServices;