const {Company} = require("../models/company");

class companyServices {
    createCompany(param){
        return Company.create(param);
    };
};


module.exports = companyServices;