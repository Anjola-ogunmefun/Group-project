const mongoose = require('mongoose');

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
    }
}, {
  timestamps: true,
}
);

const CompanyModel = mongoose.model('new company', CompanySchema);

module.exports = CompanyModel;
